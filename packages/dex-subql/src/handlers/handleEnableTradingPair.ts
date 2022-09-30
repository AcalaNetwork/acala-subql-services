import { forceToCurrencyName } from "@acala-network/sdk-core";
import { getPool, getToken, queryPrice } from "../utils";
import { FixedPointNumber as FN } from "@acala-network/sdk-core";
import { getTotalTVL } from "../utils/getTotalTVL";
import { SubstrateEvent } from "@subql/types";

export async function handleEnableTradingPair(event: SubstrateEvent) {
  const [pair] = event.event.data;
  const rawData = await api.query.dex.liquidityPool(pair);
  const pool = await getPool(forceToCurrencyName(pair[0]), forceToCurrencyName(pair[1]));

  pool.token0Amount = rawData[0].toString();
  pool.token1Amount = rawData[1].toString()

  const price0 = await queryPrice(pool.token0Id);
  const price1 = await queryPrice(pool.token1Id);
  const token0 = await getToken(pool.token0Id);
  const token1 = await getToken(pool.token1Id);

  pool.token0TVL = BigInt(price0.times(FN.fromInner(pool.token0Amount.toString(), token0.decimals)).toChainData());
  pool.token1TVL = BigInt(price1.times(FN.fromInner(pool.token1Amount.toString(), token1.decimals)).toChainData());
  pool.token0Price = BigInt(price0.toChainData());
  pool.token1Price = BigInt(price1.toChainData());
  pool.totalTVL = getTotalTVL(pool.token0TVL, pool.token1TVL);

  await pool.save();
}