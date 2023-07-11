import { getStartOfDay, getStartOfHour } from "../utils/date";
import { Summary } from "../types";
import { getDailySummary } from "../utils/get-daily-summary";
import { getHourlySummary } from "../utils/get-hourly-summary";
import { getSummary } from "../utils/get-summary";
import { getLiquidTokenDecimals } from "../utils/get-liquid-token-decimals";
import { getExchangeRate } from "../utils/get-exchange-rate";
import { SubstrateEvent } from "@subql/types/dist/interfaces";

const tracker: Map<bigint, boolean> = new Map();

export const sync = async (event: SubstrateEvent) => {
  const decimals = getLiquidTokenDecimals();
  const blockNumber = event.block.block.header.number.toBigInt();
  const timestamp = event.block.timestamp;

  let summary = await getSummary();

  if (!summary) {
    summary = new Summary('liquid-staking',
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
    );
  }

  // that means we have already processed this block
  if (tracker.get(blockNumber)) return;

  tracker.set(blockNumber, true);

  const liquidToken = await api.consts.homa.liquidCurrencyId;
  const rawBonded = await api.query.homa.totalStakingBonded();
  const rawTotalVoidLiquid = await api.query.homa.totalVoidLiquid();
  const rawToBondPool = await api.query.homa.toBondPool();
  const rawLiquidIssuance = await api.query.tokens.totalIssuance(liquidToken);

  const bonded = BigInt(rawBonded.toString());
  const toBindPool = BigInt(rawToBondPool.toString());
  const liquidIssuance = BigInt(rawLiquidIssuance.toString());
  const totalVoidLiquid = BigInt(rawTotalVoidLiquid.toString());
  const exchangeRate = getExchangeRate(toBindPool, bonded, liquidIssuance, totalVoidLiquid, decimals);


  summary.toBondPool = toBindPool;
  summary.bonded = bonded;
  summary.liquidIssuance = liquidIssuance;
  summary.totalVoidLiquid =totalVoidLiquid; 
  summary.forceUpdateAt = blockNumber;
  summary.updateAt = blockNumber;
  summary.timestamp = timestamp;
  summary.exchangeRate = exchangeRate;

  const dailyTimestamp = getStartOfDay(timestamp);
  const hourlyTimestamp = getStartOfHour(timestamp);

  const dailySummary = await getDailySummary(dailyTimestamp);
  const hourlySummary = await getHourlySummary(hourlyTimestamp);

  dailySummary.bonded = summary.bonded;
  dailySummary.toBondPool = summary.toBondPool;
  dailySummary.liquidIssuance = summary.liquidIssuance;
  dailySummary.totalVoidLiquid = summary.totalVoidLiquid;
  dailySummary.exchangeRate = summary.exchangeRate;
  dailySummary.updateAt = blockNumber;

  hourlySummary.bonded = summary.bonded;
  hourlySummary.toBondPool = summary.toBondPool;
  hourlySummary.liquidIssuance = summary.liquidIssuance;
  hourlySummary.totalVoidLiquid = summary.totalVoidLiquid;
  hourlySummary.exchangeRate = summary.exchangeRate;
  hourlySummary.updateAt = blockNumber;

  await summary.save();
  await dailySummary.save();
  await hourlySummary.save();
}