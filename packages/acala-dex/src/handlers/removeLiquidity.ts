import { FixedPointNumber as FN } from "@acala-network/sdk-core";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { ensureBlock, ensureExtrinsic } from ".";
import { getAccount, getDailyDex, getDailyPool, getDex, getHourDex, getHourlyPool, getPool, getRemoveLiquidity, getStartOfDay, getStartOfHour, getToken, getTokenDailyData, queryPrice } from "../utils";
import { getPoolId } from "../utils/getPoolId";
import { getTokenName } from '../utils/getTokenName';
import { getTotalTVL } from "../utils/getTotalTVL";

export const removeLiquidity = async (event: SubstrateEvent) => {
	// [who, currency_id_0, pool_0_decrement, currency_id_1, pool_1_decrement, share_decrement\]
	const [_, currency0, pool0Decrement, currency1, pool1Decrement] = event.event.data as unknown as [AccountId, CurrencyId, Balance, CurrencyId, Balance];
	const blockData = await ensureBlock(event);

	const [poolId, token0Name, token1Name] = getPoolId(currency0, currency1);
	const token0Decrement = (token0Name === getTokenName(currency0) ? pool0Decrement : pool1Decrement).toString();
  const token1Decrement = (token1Name === getTokenName(currency0) ? pool0Decrement : pool1Decrement).toString();
	const oldPrice0 = await queryPrice(token0Name);
	const oldPrice1 = await queryPrice(token1Name);
	const hourTime = getStartOfHour(blockData.timestamp);
	const dailyTime = getStartOfDay(blockData.timestamp);

	const token0 = await getToken(token0Name);
	const token1 = await getToken(token1Name);
	const Dailytoken0 = await getTokenDailyData(`${token0Name}-${dailyTime.getTime()}`);
	const Dailytoken1 = await getTokenDailyData(`${token1Name}-${dailyTime.getTime()}`);
	await getToken(poolId);

	const token0Changed = BigInt(token0Decrement) > 0 ? BigInt(token0Decrement) : -BigInt(token0Decrement)
	const token1Changed = BigInt(token1Decrement) > 0 ? BigInt(token1Decrement) : -BigInt(token1Decrement)

	const token0ChangedUSD = oldPrice0.times(FN.fromInner(token0Decrement, token0.decimals));
	const token1ChangedUSD = oldPrice1.times(FN.fromInner(token1Decrement, token1.decimals));
	token0ChangedUSD.setPrecision(18);
	token1ChangedUSD.setPrecision(18);

	const pool = await getPool(token0Name, token1Name, poolId);
	const oldTotalTVL = pool.totalTVL;

	pool.token0Amount = pool.token0Amount - BigInt(token0Changed);
	pool.token1Amount = pool.token1Amount - BigInt(token1Changed);
	pool.token0Price = BigInt(oldPrice0.toChainData())
	pool.token1Price = BigInt(oldPrice1.toChainData())
	pool.token0TradeVolume = pool.token0TradeVolume + BigInt(token0Changed);
	pool.token1TradeVolume = pool.token1TradeVolume + BigInt(token1Changed);
	pool.tradeVolumeUSD = pool.tradeVolumeUSD + BigInt(token0ChangedUSD.toChainData()) + BigInt(token1ChangedUSD.toChainData());
	pool.txCount = pool.txCount + BigInt(1);
	await pool.save();

	const newPrice0 = await queryPrice(token0Name);
	const newPrice1 = await queryPrice(token1Name);

	const newPool = await getPool(token0Name, token1Name, poolId);
	newPool.token0TVL = BigInt(newPrice0.times(FN.fromInner(newPool.token0Amount.toString(), token0.decimals)).toChainData());
	newPool.token1TVL = BigInt(newPrice1.times(FN.fromInner(newPool.token1Amount.toString(), token1.decimals)).toChainData());
	newPool.token0Price = BigInt(newPrice0.toChainData());
	newPool.token1Price = BigInt(newPrice1.toChainData());
	newPool.totalTVL = getTotalTVL(newPool.token0TVL, newPool.token1TVL);
	await newPool.save();

	const hourPoolId = `${poolId}-${hourTime.getTime()}`;
	const hourPool = await getHourlyPool(hourPoolId);
	hourPool.poolId = poolId;
	hourPool.timestamp = hourTime;
	hourPool.token0Id = token0Name;
	hourPool.token1Id = token1Name;
	hourPool.token0Amount = pool.token0Amount;
	hourPool.token1Amount = pool.token1Amount;
	hourPool.token0Price = BigInt(newPrice0.toChainData())
	hourPool.token1Price = BigInt(newPrice1.toChainData())
	hourPool.hourlyToken0TradeVolume = hourPool.hourlyToken0TradeVolume + token0Changed;
	hourPool.hourlyToken1TradeVolume = hourPool.hourlyToken1TradeVolume + token1Changed;
	hourPool.hourlyTradeVolumeUSD = hourPool.hourlyTradeVolumeUSD + BigInt(token0ChangedUSD.toChainData()) + BigInt(token1ChangedUSD.toChainData());
	hourPool.token0TradeVolume = BigInt(token0Decrement);
	hourPool.token1TradeVolume = BigInt(token1Decrement);
	hourPool.token0TVL = newPool.token0TVL;
	hourPool.token1TVL = newPool.token1TVL;
	hourPool.totalTVL = getTotalTVL(hourPool.token0TVL, hourPool.token1TVL);
	hourPool.txCount = hourPool.txCount + BigInt(1);
	hourPool.token0High = hourPool.token0High > BigInt(newPrice0.toChainData()) ? hourPool.token0High : BigInt(newPrice0.toChainData());
	hourPool.token0Low = hourPool.token0Low === BigInt(0) ? BigInt(newPrice0.toChainData()) : (hourPool.token0Low < BigInt(newPrice0.toChainData()) ? hourPool.token0Low : BigInt(newPrice0.toChainData()));
	hourPool.token0Close = BigInt(newPrice0.toChainData());
	hourPool.token1High = hourPool.token1High > BigInt(newPrice1.toChainData()) ? hourPool.token1High : BigInt(newPrice1.toChainData());
	hourPool.token1Low = hourPool.token1Low === BigInt(0) ? BigInt(newPrice1.toChainData()) : (hourPool.token1Low < BigInt(newPrice1.toChainData()) ? hourPool.token1Low : BigInt(newPrice1.toChainData()));
	hourPool.token1Close = BigInt(newPrice1.toChainData());
	hourPool.updateAtBlockId = blockData.id;
	await hourPool.save();

	const dailyPoolId = `${poolId}-${dailyTime.getTime()}`;
	const dailyPool = await getDailyPool(dailyPoolId);
	dailyPool.poolId = poolId;
	dailyPool.timestamp = dailyTime;
	dailyPool.token0Id = token0Name;
	dailyPool.token1Id = token1Name;
	dailyPool.token0Amount = newPool.token0Amount;
	dailyPool.token1Amount = newPool.token1Amount;
	dailyPool.token0Price = BigInt(newPrice0.toChainData())
	dailyPool.token1Price = BigInt(newPrice1.toChainData())
	dailyPool.dailyToken0TradeVolume = dailyPool.dailyToken0TradeVolume + token0Changed;
	dailyPool.dailyToken1TradeVolume = dailyPool.dailyToken1TradeVolume + token1Changed;
	dailyPool.dailyTradeVolumeUSD = dailyPool.dailyTradeVolumeUSD + BigInt(token0ChangedUSD.toChainData()) + BigInt(token1ChangedUSD.toChainData());
	dailyPool.token0TradeVolume = BigInt(token0Decrement);
	dailyPool.token1TradeVolume = BigInt(token1Decrement);
	dailyPool.token0TVL = newPool.token0TVL;
	dailyPool.token1TVL = newPool.token1TVL;
	dailyPool.totalTVL = getTotalTVL(dailyPool.token0TVL, dailyPool.token1TVL);
	dailyPool.txCount = dailyPool.txCount + BigInt(1);
	dailyPool.token0High = dailyPool.token0High > BigInt(oldPrice0.toChainData()) ? dailyPool.token0High : BigInt(oldPrice0.toChainData());
	dailyPool.token0Low = dailyPool.token0Low === BigInt(0) ? BigInt(newPrice0.toChainData()) : (dailyPool.token0Low < BigInt(newPrice0.toChainData()) ? dailyPool.token0Low : BigInt(newPrice0.toChainData()));
	dailyPool.token0Close = BigInt(oldPrice0.toChainData());
	dailyPool.token1High = dailyPool.token1High > BigInt(newPrice1.toChainData()) ? dailyPool.token1High : BigInt(newPrice1.toChainData());
	dailyPool.token1Low = dailyPool.token1Low === BigInt(0) ? BigInt(newPrice1.toChainData()) : (dailyPool.token1Low < BigInt(newPrice1.toChainData()) ? dailyPool.token1Low : BigInt(newPrice1.toChainData()));
	dailyPool.token1Close = BigInt(newPrice1.toChainData());
	dailyPool.updateAtBlockId = blockData.id;
	await dailyPool.save();

	const dex = await getDex("dex");
	dex.tradeVolumeUSD = dex.tradeVolumeUSD + BigInt(token0ChangedUSD.toChainData()) + BigInt(token1ChangedUSD.toChainData());;
	dex.totalTVL = dex.totalTVL + newPool.totalTVL - oldTotalTVL;
	await dex.save();

	const hourDex = await getHourDex(hourTime.getTime().toString());
	hourDex.hourlyTradeVolumeUSD = hourDex.hourlyTradeVolumeUSD + BigInt(token0ChangedUSD.toChainData()) + BigInt(token1ChangedUSD.toChainData());;
	hourDex.tradeVolumeUSD = dex.tradeVolumeUSD;
	hourDex.totalTVL = dex.totalTVL;
	hourDex.timestamp = hourTime;
	hourDex.updateAtBlockId = blockData.id;
	await hourDex.save();

	const dailyDex = await getDailyDex(dailyTime.getTime().toString());
	dailyDex.dailyTradeVolumeUSD = dailyDex.dailyTradeVolumeUSD + BigInt(token0ChangedUSD.toChainData()) + BigInt(token1ChangedUSD.toChainData());;
	dailyDex.tradeVolumeUSD = dex.tradeVolumeUSD;
	dailyDex.totalTVL = dex.totalTVL;
	dailyDex.timestamp = dailyTime;
	dailyDex.updateAtBlockId = blockData.id;
	await dailyDex.save();

	token0.amount = token0.amount - token0Changed;
	token0.tvl = BigInt(newPrice0.times(FN.fromInner(token0.amount.toString(), token0.decimals)).toChainData());
	token0.tradeVolume = token0.tradeVolume + token0Changed;
	token0.tradeVolumeUSD = token0.tradeVolumeUSD + BigInt(token0ChangedUSD.toChainData())
	token0.txCount = token0.txCount + BigInt(1);
	token0.price = BigInt(newPrice0.toChainData())
	token1.amount = token1.amount - token1Changed;
	token1.tvl = BigInt(newPrice1.times(FN.fromInner(token1.amount.toString(), token1.decimals)).toChainData());
	token1.tradeVolume = token1.tradeVolume + token1Changed
	token1.tradeVolumeUSD = token1.tradeVolumeUSD + BigInt(token1ChangedUSD.toChainData());
	token1.txCount = token1.txCount + BigInt(1);
	token1.price = BigInt(newPrice1.toChainData())

	Dailytoken0.tokenId = token0Name;
	Dailytoken0.amount = token0.amount;
	Dailytoken0.tvl = token0.tvl;
	Dailytoken0.dailyTradeVolume = Dailytoken0.dailyTradeVolume + token0Changed;
	Dailytoken0.dailyTradeVolumeUSD = Dailytoken0.dailyTradeVolumeUSD + BigInt(token0ChangedUSD.toChainData());
	Dailytoken0.dailyTxCount = Dailytoken0.dailyTxCount + BigInt(1);
	Dailytoken0.timestamp = dailyTime;
	Dailytoken0.updateAtBlockId = event.block.block.header.number.toString();
	Dailytoken0.price = BigInt(newPrice0.toChainData());
	Dailytoken1.tokenId = token1Name;
	Dailytoken1.amount = token1.amount;
	Dailytoken1.tvl = token1.tvl;
	Dailytoken1.dailyTradeVolume = Dailytoken1.dailyTradeVolume + token1Changed;
	Dailytoken1.dailyTradeVolumeUSD = Dailytoken1.dailyTradeVolumeUSD + BigInt(token1ChangedUSD.toChainData());
	Dailytoken1.dailyTxCount = Dailytoken1.dailyTxCount + BigInt(1);
	Dailytoken1.timestamp = dailyTime;
	Dailytoken1.updateAtBlockId = event.block.block.header.number.toString();
	Dailytoken1.price = BigInt(newPrice1.toChainData());

	await token0.save();
	await token1.save();
	await Dailytoken0.save();
	await Dailytoken1.save();
	await createRemoveLiquidyHistory(event, oldPrice0, oldPrice1);
};

export const createRemoveLiquidyHistory = async (event: SubstrateEvent, price0: FN, price1: FN) => {
	// [who, currency_id_0, pool_0_increment, currency_id_1, pool_1_increment, share_increment\]
	const [owner, currency0, pool0Decrement, currency1, pool1Decrement, shareAmount] = event.event.data as unknown as [AccountId, CurrencyId, Balance, CurrencyId, Balance, Balance];
	const blockData = await ensureBlock(event);

	const [poolId, token0Name, token1Name] = getPoolId(currency0, currency1);
	const token0Decrement = (token0Name === getTokenName(currency0) ? pool0Decrement : pool1Decrement).toString();
	const token1Decrement = (token1Name === getTokenName(currency0) ? pool0Decrement : pool1Decrement).toString();

	const historyId = `${blockData.hash}-${event.idx}`;
	const history = await getRemoveLiquidity(historyId);
	history.addressId = owner.toString();
	history.poolId = poolId;
	history.token0Id = token0Name;
	history.token1Id = token1Name;
	history.token0Amount = BigInt(token0Decrement.toString());
	history.token1Amount = BigInt(token1Decrement.toString());
	history.shareAmount = BigInt(shareAmount.toString());
	history.price0 = BigInt(price0.toChainData())
	history.price1 = BigInt(price1.toChainData())
	history.blockId = blockData.id;
	history.timestamp = blockData.timestamp;

	if (event.extrinsic) {
		const extrinsicData = await ensureExtrinsic(event);
		history.extrinsicId = extrinsicData.id;
		await getAccount(event.extrinsic.extrinsic.signer.toString());

		extrinsicData.section = event.event.section;
		extrinsicData.method = event.event.method;
		extrinsicData.addressId = event.extrinsic.extrinsic.signer.toString();

		await extrinsicData.save();
	}
	await history.save();
};