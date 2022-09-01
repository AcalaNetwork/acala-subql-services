import { FixedPointNumber } from "@acala-network/sdk-core";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRate } from "../utils/record";
import { getBlockNumber, getExtrinsicHash } from "./event";
import {
  getLiquidCurrency,
  getStakingCurrency,
  getStartOfDay,
  getTokenDecimals,
} from "@acala-network/subql-utils";

export const getTotalStaking = async (decimals: number) => {
  const toBond = await api.query.homa.toBondPool();
  const stakingLedgers = await api.query.homa.stakingLedgers.entries();
  let totalInSubAccount = FixedPointNumber.ZERO;

  stakingLedgers.map((item) => {
    const ledge = (item[1] as any).unwrapOrDefault();
    totalInSubAccount = totalInSubAccount.add(
      FixedPointNumber.fromInner(ledge.bonded.unwrap().toString(), decimals)
    );
  });

  const total = FixedPointNumber.fromInner(toBond.toString(), decimals).add(
    totalInSubAccount
  );

  return total;
};

export const currentEraBumped = async (event: SubstrateEvent) => {
  const timestamp = event.block.timestamp;
  const blockNumber = getBlockNumber(event);
  const dayHour = getStartOfDay(timestamp);

  const stakingToken = getStakingCurrency(api as any);
  const liquidToken = getLiquidCurrency(api as any);
  const stakingTokenDecimals = await getTokenDecimals(api as any, stakingToken);
  const liquidTokenDecimals = await getTokenDecimals(api as any, liquidToken);
  const liquidTokenIssuance = await api.query.tokens.totalIssuance(liquidToken);

  const totalStaking = await getTotalStaking(stakingTokenDecimals);
  const totalLiquid = FixedPointNumber.fromInner(
    liquidTokenIssuance.toString(),
    liquidTokenDecimals
  );
  const totalVoidliquid = await api.query.homa.totalVoidLiquid();
  const totalVoidliquidFN = FixedPointNumber.fromInner(
    totalVoidliquid.toString(),
    liquidTokenDecimals
  );
  const exchangeRate = totalStaking.div(totalLiquid.add(totalVoidliquidFN));
  exchangeRate.setPrecision(18);

  const rate = await getRate(`${dayHour.getTime()}`);
  rate.totalLiquidity = BigInt(totalLiquid.toChainData());
  rate.totalStaking = BigInt(totalStaking.toChainData());
  rate.totalVoidLiquid = BigInt(totalVoidliquidFN.toChainData());
  rate.exchangeRate = BigInt(exchangeRate.toChainData());
  rate.blockNumber = blockNumber;
  rate.timestamp = timestamp;

  if (event.extrinsic) {
    rate.extrinsicHash = getExtrinsicHash(event);
    await getAccount(event.extrinsic.extrinsic.signer.toString());
  }

  await rate.save();
};
