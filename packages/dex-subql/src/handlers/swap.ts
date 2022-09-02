import { FixedPointNumber as FN } from "@acala-network/sdk-core";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { ensureBlock, ensureExtrinsic } from ".";
import { getAccount, getDailyDex, getDailyPool, getDex, getHourDex, getHourlyPool, getPool, getStartOfDay, getStartOfHour, getSwap, getToken, getTokenDailyData, queryPrice } from "../utils";
import { getPoolId } from "../utils/getPoolId";
import { getTokenName } from '../utils/getTokenName';
import { getTotalTVL } from "../utils/getTotalTVL";

export const swap = async (event: SubstrateEvent) => {
	const dataLength = event.event.data.length;
	if (dataLength === 3) {
		await swapByRuntimeGt1008(event);
	} else {
		await swapByRuntimeLt1008(event);
	}
};

const swapByRuntimeLt1008 = async (event: SubstrateEvent) => {
	const [owner, tradingPath, supplyAmount, targetAmount] = event.event.data as unknown as [AccountId, CurrencyId[], Balance, Balance];
	let nextSupplyAmount = FN.ZERO;
	const blockData = await ensureBlock(event);
	const hourTime = getStartOfHour(blockData.timestamp);
	const dailyTime = getStartOfDay(blockData.timestamp);
	let tokenSwapAmountPath = '';

	for (let i = 0; i < tradingPath.length - 1; i++) {
		const currency0 = tradingPath[i];
		const currency1 = tradingPath[i + 1];

		const supplyTokenName = getTokenName(currency0);
		const targetTokenName = getTokenName(currency1);

		const [poolId, token0Name, token1Name] = getPoolId(currency0, currency1);
		const token0 = await getToken(token0Name);
		const token1 = await getToken(token1Name);
		await getToken(poolId);
		const dailyToken0 = await getTokenDailyData(`${token0Name}-${dailyTime.getTime()}`);
		const dailyToken1 = await getTokenDailyData(`${token1Name}-${dailyTime.getTime()}`);
		const pool = await getPool(token0Name, token1Name, poolId);
		const oldTotalTVL = pool.totalTVL;

		let token0Amount = BigInt(0);
		let token1Amount = BigInt(0);

		if (tradingPath.length === 2) {
			token0Amount = token0Name === supplyTokenName ? BigInt(supplyAmount.toString()) : - BigInt(targetAmount.toString());
			token1Amount = token1Name === supplyTokenName ? BigInt(supplyAmount.toString()) : - BigInt(targetAmount.toString());
			tokenSwapAmountPath = `${supplyAmount.toString()},${targetAmount.toString()}`
		} else {
			// calculate
			const supplyPool = token0Name === supplyTokenName ? FN.fromInner(pool.token0Amount.toString()) : FN.fromInner(pool.token1Amount.toString());
			const targetPool = token0Name === targetTokenName ? FN.fromInner(pool.token0Amount.toString()) : FN.fromInner(pool.token1Amount.toString());

			const _supplyAmount = i === 0 ? FN.fromInner(supplyAmount.toString()) : nextSupplyAmount;

			const targetAmount = targetPool.minus(
				supplyPool.times(targetPool)
					.div(supplyPool.add((_supplyAmount.times(FN.ONE.minus(FN.fromInner(pool.feeRate.toString(), 18))))))
			)

			// update next supply amount
			nextSupplyAmount = targetAmount;

			token0Amount = pool.token0Id === supplyTokenName ? BigInt(_supplyAmount.toChainData()) : BigInt('-' + targetAmount.toChainData());
			token1Amount = pool.token1Id === supplyTokenName ? BigInt(_supplyAmount.toChainData()) : BigInt('-' + targetAmount.toChainData());

			if(i === 0) {
				tokenSwapAmountPath = token0Amount > 0 ? `${token0Amount.toString()},${token1Amount.toString()}` : `${token1Amount.toString()},${token0Amount.toString()}`;
			} else {
				tokenSwapAmountPath += token0Amount > 0 ? `,${token1Amount.toString()}` : `,${token0Amount.toString()}`;
			}
		}
		const oldPrice0 = await queryPrice(token0Name);
		const oldPrice1 = await queryPrice(token1Name);

		const token0Changed = BigInt(token0Amount) > 0 ? BigInt(token0Amount) : -BigInt(token0Amount);
		const token1Changed = BigInt(token1Amount) > 0 ? BigInt(token1Amount) : -BigInt(token1Amount);
		const token0ChangedUSD = oldPrice0.times(FN.fromInner(token0Changed.toString(), token0.decimals))
		const token1ChangedUSD = oldPrice1.times(FN.fromInner(token1Changed.toString(), token1.decimals))
		const totoalChangedUSD = token0ChangedUSD.add(token1ChangedUSD).times(new FN(0.5));
		token0ChangedUSD.setPrecision(18)
		token1ChangedUSD.setPrecision(18)
		totoalChangedUSD.setPrecision(18);

		const suppluTokenAmount = supplyTokenName === token0Name ? token0Changed : token1Changed
		const suppluTokenDecimals = supplyTokenName === token0Name ? token0.decimals : token1.decimals;

		const fee = BigInt(FN.fromInner(pool.feeRate.toString(), 18).times(FN.fromInner(suppluTokenAmount.toString(), suppluTokenDecimals)).toChainData());

		pool.token0Amount = pool.token0Amount + BigInt(token0Amount);
		pool.token1Amount = pool.token1Amount + BigInt(token1Amount);
		pool.token0Price = BigInt(oldPrice0.toChainData())
		pool.token1Price = BigInt(oldPrice1.toChainData())
		pool.feeToken0Amount = pool.feeToken0Amount + (supplyTokenName === token0Name ? fee : BigInt(0));
		pool.feeToken1Amount = pool.feeToken1Amount + (supplyTokenName === token1Name ? fee : BigInt(0));
		pool.token0TradeVolume = pool.token0TradeVolume + token0Changed;
		pool.token1TradeVolume = pool.token1TradeVolume + token1Changed;
		pool.tradeVolumeUSD = pool.tradeVolumeUSD + BigInt(totoalChangedUSD.toChainData());
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
		hourPool.token0Amount = newPool.token0Amount;
		hourPool.token1Amount = newPool.token1Amount;
		hourPool.token0Price = BigInt(newPrice0.toChainData())
		hourPool.token1Price = BigInt(newPrice1.toChainData())
		hourPool.feeRateUSD = hourPool.feeRateUSD + fee;
		hourPool.feeToken0Amount = newPool.feeToken0Amount;
		hourPool.feeToken1Amount = newPool.feeToken1Amount;
		hourPool.hourlyToken0TradeVolume = hourPool.hourlyToken0TradeVolume + token0Changed;
		hourPool.hourlyToken1TradeVolume = hourPool.hourlyToken1TradeVolume + token1Changed;
		hourPool.hourlyTradeVolumeUSD = hourPool.hourlyTradeVolumeUSD + BigInt(totoalChangedUSD.toChainData());
		hourPool.token0TradeVolume = token0Changed;
		hourPool.token1TradeVolume = token1Changed;
		hourPool.token0TVL = newPool.token0TVL;
		hourPool.token1TVL = newPool.token1TVL;
		hourPool.totalTVL = getTotalTVL(hourPool.token0TVL, hourPool.token1TVL)
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
		dailyPool.feeRateUSD = dailyPool.feeRateUSD + fee;
		dailyPool.feeToken0Amount = newPool.feeToken0Amount;
		dailyPool.feeToken1Amount = newPool.feeToken1Amount;
		dailyPool.dailyToken0TradeVolume = dailyPool.dailyToken0TradeVolume + token0Changed;
		dailyPool.dailyToken1TradeVolume = dailyPool.dailyToken1TradeVolume + token1Changed;
		dailyPool.dailyTradeVolumeUSD = dailyPool.dailyTradeVolumeUSD + BigInt(totoalChangedUSD.toChainData());
		dailyPool.token0TradeVolume = token0Changed;
		dailyPool.token1TradeVolume = token1Changed;
		dailyPool.token0TVL = newPool.token0TVL;
		dailyPool.token1TVL = newPool.token1TVL;
		dailyPool.totalTVL = getTotalTVL(dailyPool.token0TVL, dailyPool.token1TVL);
		dailyPool.txCount = dailyPool.txCount + BigInt(1);
		dailyPool.token0High = dailyPool.token0High > BigInt(newPrice0.toChainData()) ? dailyPool.token0High : BigInt(newPrice0.toChainData());
		dailyPool.token0Low = dailyPool.token0Low === BigInt(0) ? BigInt(newPrice0.toChainData()) : (dailyPool.token0Low < BigInt(newPrice0.toChainData()) ? dailyPool.token0Low : BigInt(newPrice0.toChainData()));
		dailyPool.token0Close = BigInt(newPrice0.toChainData());
		dailyPool.token1High = dailyPool.token1High > BigInt(newPrice1.toChainData()) ? dailyPool.token1High : BigInt(newPrice1.toChainData());
		dailyPool.token1Low = dailyPool.token1Low === BigInt(0) ? BigInt(newPrice1.toChainData()) : (dailyPool.token1Low < BigInt(newPrice1.toChainData()) ? dailyPool.token1Low : BigInt(newPrice1.toChainData()));
		dailyPool.token1Close = BigInt(newPrice1.toChainData());
		dailyPool.updateAtBlockId = blockData.id;
		await dailyPool.save();

		const dex = await getDex("dex");
		dex.tradeVolumeUSD = dex.tradeVolumeUSD + BigInt(totoalChangedUSD.toChainData());
		dex.totalTVL = dex.totalTVL + newPool.totalTVL - oldTotalTVL;
		await dex.save();

		const hourDex = await getHourDex(hourTime.getTime().toString());
		hourDex.hourlyTradeVolumeUSD = hourDex.hourlyTradeVolumeUSD + BigInt(totoalChangedUSD.toChainData());
		hourDex.tradeVolumeUSD = dex.tradeVolumeUSD;
		hourDex.totalTVL = dex.totalTVL;
		hourDex.timestamp = hourTime;
		hourDex.updateAtBlockId = blockData.id;
		await hourDex.save();

		const dailyDex = await getDailyDex(dailyTime.getTime().toString());
		dailyDex.dailyTradeVolumeUSD = dailyDex.dailyTradeVolumeUSD + BigInt(totoalChangedUSD.toChainData());
		dailyDex.tradeVolumeUSD = dex.tradeVolumeUSD;
		dailyDex.totalTVL = dex.totalTVL;
		dailyDex.timestamp = dailyTime;
		dailyDex.updateAtBlockId = blockData.id;
		await dailyDex.save();

		// update token data
		token0.amount = token0.amount + token0Amount;
		token0.tvl = BigInt(newPrice0.times(FN.fromInner(token0.amount.toString(), token0.decimals)).toChainData());
		token0.tradeVolume = token0.tradeVolume + token0Changed;
		token0.tradeVolumeUSD = token0.tradeVolumeUSD + BigInt(token0ChangedUSD.toChainData());
		token0.txCount = token0.txCount + BigInt(1);
		token0.price = BigInt(newPrice0.toChainData());
		token1.amount = token1.amount + token1Amount;
		token1.tvl = BigInt(newPrice1.times(FN.fromInner(token1.amount.toString(), token1.decimals)).toChainData());
		token1.tradeVolume = token1.tradeVolume + token1Changed;
		token1.tradeVolumeUSD = token1.tradeVolumeUSD + BigInt(token1ChangedUSD.toChainData());
		token1.txCount = token1.txCount + BigInt(1);
		token1.price = BigInt(newPrice1.toChainData());

		dailyToken0.tokenId = token0Name;
		dailyToken0.amount = token0.amount;
		dailyToken0.tvl = token0.tvl;
		dailyToken0.dailyTradeVolume = dailyToken0.dailyTradeVolume + token0Changed;
		dailyToken0.dailyTradeVolumeUSD = dailyToken0.dailyTradeVolumeUSD + BigInt(token0ChangedUSD.toChainData());
		dailyToken0.dailyTxCount = dailyToken0.dailyTxCount + BigInt(1);
		dailyToken0.timestamp = dailyTime;
		dailyToken0.updateAtBlockId = blockData.id;
		dailyToken1.tokenId = token1Name;
		dailyToken1.amount = token1.amount;
		dailyToken1.tvl = token1.tvl;
		dailyToken1.dailyTradeVolume = dailyToken1.dailyTradeVolume + token1Changed;
		dailyToken1.dailyTradeVolumeUSD = dailyToken1.dailyTradeVolumeUSD + BigInt(token1ChangedUSD.toChainData())
		dailyToken1.dailyTxCount = dailyToken1.dailyTxCount + BigInt(1);
		dailyToken1.timestamp = dailyTime;
		dailyToken1.updateAtBlockId = blockData.id;

		await token0.save();
		await token1.save();
		await dailyToken0.save();
		await dailyToken1.save();
	}

	await createSwapHistory(event, tokenSwapAmountPath);
};

const swapByRuntimeGt1008 = async (event: SubstrateEvent) => {
	// [trader, trading_path, supply_currency_amount, target_currency_amount\]
	const [who, tradingPath, resultPath] = event.event.data as unknown as [AccountId, CurrencyId[], Balance[]];
	const blockData = await ensureBlock(event);
	const hourTime = getStartOfHour(blockData.timestamp);
	const dailyTime = getStartOfDay(blockData.timestamp);
	let tokenSwapAmountPath = '';

	for (let i = 0; i < tradingPath.length - 1; i++) {
		const currency0 = tradingPath[i];
		const currency1 = tradingPath[i + 1];
		const result0 = resultPath[i];
		const result1 = resultPath[i + 1];

		const supplyTokenName = getTokenName(currency0);

		const [poolId, token0Name, token1Name] = getPoolId(currency0, currency1);
		const token0 = await getToken(token0Name);
		const token1 = await getToken(token1Name);
		await getToken(poolId);
		const dailyToken0 = await getTokenDailyData(`${token0Name}-${dailyTime.getTime()}`);
		const dailyToken1 = await getTokenDailyData(`${token1Name}-${dailyTime.getTime()}`);
		const pool = await getPool(token0Name, token1Name, poolId);
		const dex = await getDex();

		const oldPrice0 = await queryPrice(token0Name);
		const oldPrice1 = await queryPrice(token1Name);

		const token0Amount = token0Name === supplyTokenName ? result0.toString() : `-${result1.toString()}`;
		const token1Amount = token1Name === supplyTokenName ? result0.toString() : `-${result1.toString()}`;

		const token0Changed = BigInt(token0Amount) > 0 ? BigInt(token0Amount) : -BigInt(token0Amount);
		const token1Changed = BigInt(token1Amount) > 0 ? BigInt(token1Amount) : -BigInt(token1Amount);
		const token0ChangedUSD = oldPrice0.times(FN.fromInner(token0Changed.toString(), token0.decimals))
		const token1ChangedUSD = oldPrice1.times(FN.fromInner(token1Changed.toString(), token1.decimals))
		const totoalChangedUSD = token0ChangedUSD.add(token1ChangedUSD).times(new FN(0.5));
		token0ChangedUSD.setPrecision(18)
		token1ChangedUSD.setPrecision(18)
		totoalChangedUSD.setPrecision(18);

		if (i === 0) {
			tokenSwapAmountPath = token0Amount.startsWith('-') ? `${token1Changed.toString()},${token0Changed.toString()}` : `${token0Changed.toString()},${token1Changed.toString()}`;
		} else {
			tokenSwapAmountPath += token0Amount.startsWith('-') ? `,${token0Changed.toString()}` : `,${token1Changed.toString()}`
		}

		const suppluTokenAmount = supplyTokenName === token0Name ? token0Changed : token1Changed
		const suppluTokenDecimals = supplyTokenName === token0Name ? token0.decimals : token1.decimals;

		const fee = BigInt(FN.fromInner(pool.feeRate.toString(), 18).times(FN.fromInner(suppluTokenAmount.toString(), suppluTokenDecimals)).toChainData());
		const oldTotalTVL = pool.totalTVL;

		pool.token0Amount = pool.token0Amount + BigInt(token0Amount);
		pool.token1Amount = pool.token1Amount + BigInt(token1Amount);
		pool.token0Price = BigInt(oldPrice0.toChainData())
		pool.token1Price = BigInt(oldPrice1.toChainData())
		pool.feeToken0Amount = pool.feeToken0Amount + (supplyTokenName === token0Name ? fee : BigInt(0));
		pool.feeToken1Amount = pool.feeToken1Amount + (supplyTokenName === token1Name ? fee : BigInt(0));
		pool.token0TradeVolume = pool.token0TradeVolume + token0Changed;
		pool.token1TradeVolume = pool.token1TradeVolume + token1Changed;
		pool.tradeVolumeUSD = pool.tradeVolumeUSD + BigInt(totoalChangedUSD.toChainData())
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
		hourPool.token0Amount = newPool.token0Amount;
		hourPool.token1Amount = newPool.token1Amount;
		hourPool.token0Price = BigInt(newPrice0.toChainData())
		hourPool.token1Price = BigInt(newPrice1.toChainData())
		hourPool.feeRateUSD = hourPool.feeRateUSD + fee;
		hourPool.feeToken0Amount = newPool.feeToken0Amount;
		hourPool.feeToken1Amount = newPool.feeToken1Amount;
		hourPool.hourlyToken0TradeVolume = hourPool.hourlyToken0TradeVolume + token0Changed;
		hourPool.hourlyToken1TradeVolume = hourPool.hourlyToken1TradeVolume + token1Changed;
		hourPool.hourlyTradeVolumeUSD = hourPool.hourlyTradeVolumeUSD + BigInt(totoalChangedUSD.toChainData())
		hourPool.token0TradeVolume = BigInt(token0Amount);
		hourPool.token1TradeVolume = BigInt(token1Amount);
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
		dailyPool.token1Price = BigInt(newPrice1.toChainData());
		dailyPool.feeRateUSD = dailyPool.feeRateUSD + fee;
		dailyPool.feeToken0Amount = newPool.feeToken0Amount;
		dailyPool.feeToken1Amount = newPool.feeToken1Amount;
		dailyPool.dailyToken0TradeVolume = dailyPool.dailyToken0TradeVolume + token0Changed;
		dailyPool.dailyToken1TradeVolume = dailyPool.dailyToken1TradeVolume + token1Changed;
		dailyPool.dailyTradeVolumeUSD = dailyPool.dailyTradeVolumeUSD + BigInt(totoalChangedUSD.toChainData())
		dailyPool.token0TradeVolume = BigInt(token0Amount);
		dailyPool.token1TradeVolume = BigInt(token1Amount);
		dailyPool.token0TVL = newPool.token0TVL;
		dailyPool.token1TVL = newPool.token1TVL;
		dailyPool.totalTVL = getTotalTVL(dailyPool.token0TVL, dailyPool.token1TVL);
		dailyPool.txCount = dailyPool.txCount + BigInt(1);
		dailyPool.token0High = dailyPool.token0High > BigInt(newPrice0.toChainData()) ? dailyPool.token0High : BigInt(newPrice0.toChainData());
		dailyPool.token0Low = dailyPool.token0Low === BigInt(0) ? BigInt(newPrice0.toChainData()) : (dailyPool.token0Low < BigInt(newPrice0.toChainData()) ? dailyPool.token0Low : BigInt(newPrice0.toChainData()));
		dailyPool.token0Close = BigInt(newPrice0.toChainData());
		dailyPool.token1High = dailyPool.token1High > BigInt(newPrice1.toChainData()) ? dailyPool.token1High : BigInt(newPrice1.toChainData());
		dailyPool.token1Low = dailyPool.token1Low === BigInt(0) ? BigInt(newPrice1.toChainData()) : (dailyPool.token1Low < BigInt(newPrice1.toChainData()) ? dailyPool.token1Low : BigInt(newPrice1.toChainData()));
		dailyPool.token1Close = BigInt(newPrice1.toChainData());
		dailyPool.updateAtBlockId = blockData.id;
		await dailyPool.save();

		dex.tradeVolumeUSD = dex.tradeVolumeUSD + BigInt(totoalChangedUSD.toChainData())
		dex.totalTVL = dex.totalTVL + newPool.totalTVL - oldTotalTVL;
		await dex.save();

		const hourDex = await getHourDex(hourTime.getTime().toString());
		hourDex.hourlyTradeVolumeUSD = hourDex.hourlyTradeVolumeUSD + BigInt(totoalChangedUSD.toChainData())
		hourDex.tradeVolumeUSD = dex.tradeVolumeUSD;
		hourDex.totalTVL = dex.totalTVL;
		hourDex.timestamp = hourTime;
		hourDex.updateAtBlockId = blockData.id;
		await hourDex.save();

		const dailyDex = await getDailyDex(dailyTime.getTime().toString());
		dailyDex.dailyTradeVolumeUSD = dailyDex.dailyTradeVolumeUSD + BigInt(totoalChangedUSD.toChainData())
		dailyDex.tradeVolumeUSD = dex.tradeVolumeUSD;
		dailyDex.totalTVL = dex.totalTVL;
		dailyDex.timestamp = dailyTime;
		dailyDex.updateAtBlockId = blockData.id;
		await dailyDex.save();

		// update token data
		token0.amount = token0.amount + BigInt(token0Amount);
		token0.tvl = BigInt(newPrice0.times(FN.fromInner(token0.amount.toString(), token0.decimals)).toChainData());
		token0.tradeVolume = token0.tradeVolume + token0Changed;
		token0.tradeVolumeUSD = token0.tradeVolumeUSD + BigInt(totoalChangedUSD.toChainData())
		token0.txCount = token0.txCount + BigInt(1);
		token0.price = BigInt(newPrice0.toChainData());
		token1.amount = token1.amount + BigInt(token1Amount);
		token1.tvl = BigInt(newPrice1.times(FN.fromInner(token1.amount.toString(), token1.decimals)).toChainData());
		token1.tradeVolume = token1.tradeVolume + token1Changed;
		token1.tradeVolumeUSD = token1.tradeVolumeUSD + BigInt(token1ChangedUSD.toChainData());
		token1.txCount = token1.txCount + BigInt(1);
		token1.price = BigInt(newPrice1.toChainData());

		dailyToken0.tokenId = token0Name;
		dailyToken0.amount = token0.amount;
		dailyToken0.tvl = token0.tvl;
		dailyToken0.dailyTradeVolume = dailyToken0.dailyTradeVolume + token0Changed;
		dailyToken0.dailyTradeVolumeUSD = dailyToken0.dailyTradeVolumeUSD + BigInt(token0ChangedUSD.toChainData());
		dailyToken0.dailyTxCount = dailyToken0.dailyTxCount + BigInt(1);
		dailyToken0.timestamp = dailyTime;
		dailyToken0.updateAtBlockId = blockData.id;
		dailyToken0.price = BigInt(newPrice0.toChainData());
		dailyToken1.tokenId = token1Name;
		dailyToken1.amount = token1.amount;
		dailyToken1.tvl = token1.tvl;
		dailyToken1.dailyTradeVolume = dailyToken1.dailyTradeVolume + token1Changed;
		dailyToken1.dailyTradeVolumeUSD = dailyToken1.dailyTradeVolumeUSD + BigInt(token1ChangedUSD.toChainData());
		dailyToken1.dailyTxCount = dailyToken1.dailyTxCount + BigInt(1);
		dailyToken1.timestamp = dailyTime;
		dailyToken1.updateAtBlockId = blockData.id;
		dailyToken1.price = BigInt(newPrice1.toChainData());

		await token0.save();
		await token1.save();
		await dailyToken0.save();
		await dailyToken1.save();
	}

	await createSwapHistory(event, tokenSwapAmountPath);
};

const createSwapHistory = async (event: SubstrateEvent, amounts: string) => {
	let who: AccountId;
	let supplyAmount: Balance
	let targetAmount: Balance
	let token0: CurrencyId;
	let token1: CurrencyId;
	let tradingPath: CurrencyId[];
	if (event.event.data.length === 3) {
		const [_who, _tradingPath, resultPath] = event.event
			.data as unknown as [AccountId, CurrencyId[], Balance[]]

		who = _who
		token0 = _tradingPath[0]
		token1 = _tradingPath[_tradingPath.length - 1]
		supplyAmount = resultPath[0]
		targetAmount = resultPath[resultPath.length - 1]
		tradingPath = _tradingPath
	} else {
		const [_who, _tradingPath, _supplyAmount, _targetAmount] = event.event
			.data as unknown as [AccountId, CurrencyId[], Balance, Balance]

		who = _who
		token0 = _tradingPath[0]
		token1 = _tradingPath[_tradingPath.length - 1]
		supplyAmount = _supplyAmount
		targetAmount = _targetAmount
		tradingPath = _tradingPath
	}
	const blockData = await ensureBlock(event);
	await getAccount(who.toString());

	const historyId = `${blockData.id}-${event.idx}`;
	const history = await getSwap(historyId);

	const [poolId] = getPoolId(token0, token1);

	await getToken(poolId)

	const price0 = await queryPrice(getTokenName(token0))
	const price1 = await queryPrice(getTokenName(token1))

	history.addressId = who.toString();
	history.poolId = poolId;
	history.token0Id = getTokenName(token0);
	history.token1Id = getTokenName(token1);
	history.token0InAmount = BigInt(supplyAmount.toString());
	history.token1OutAmount = BigInt(targetAmount.toString());
	history.tradePath = tradingPath.map(token => getTokenName(token)).join(',');
	history.amounts = amounts;
	history.price0 = BigInt(price0.toChainData())
	history.price1 = BigInt(price1.toChainData())
	history.timestamp = blockData.timestamp;
	history.blockId = blockData.id;

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