import { forceToCurrencyName } from "@acala-network/sdk-core";
import { getPool, getToken, queryPrice } from "../utils";
import { FixedPointNumber as FN } from "@acala-network/sdk-core";
import { getTotalTVL } from "../utils/getTotalTVL";

export async function forceUpdatePositions() {
  const pools = await api.query.dex.liquidityPool.entries();
  const poolRecords = [];

  for (const item of pools) {
    const [key, value] = item;
    const [token0, token1] = key.args;
    const [pool0, pool1] = value as any as any[];

    const pool = await getPool(forceToCurrencyName(token0), forceToCurrencyName(token1));

    pool.token0Amount = pool0;
    pool.token1Amount = pool1;
    poolRecords.push(pool);
  }

  // try to update TVL
  for (const pool of poolRecords) {
    const price0 = await queryPrice(pool.token0);
    const price1 = await queryPrice(pool.token1);
    const token0 = await getToken(pool.token0);
    const token1 = await getToken(pool.token1);

    pool.token0TVL = BigInt(price0.times(FN.fromInner(pool.token0Amount.toString(), token0.decimals)).toChainData());
    pool.token1TVL = BigInt(price1.times(FN.fromInner(pool.token1Amount.toString(), token1.decimals)).toChainData());
    pool.token0Price = BigInt(price0.toChainData());
    pool.token1Price = BigInt(price1.toChainData());
    pool.totalTVL = getTotalTVL(pool.token0TVL, pool.token1TVL);

    await pool.save();
  }
}