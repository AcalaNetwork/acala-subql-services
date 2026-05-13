import { AnyApi, FixedPointNumber as FN, MaybeCurrency, Token, forceToCurrencyId } from "@acala-network/sdk-core";
import { SubstrateBlock } from '@subql/types/dist/interfaces';
import { getBlock, getPool, getToken } from "./record";
import { getTokenName } from './getTokenName';
import { PriceBundle } from "../types";

const warnInvalidPrice = (message: string) => {
	const logger = (globalThis as any).logger;

	if (typeof logger?.warn === 'function') {
		logger.warn(message);
	}
};

const isUnsignedIntegerString = (value: string) => {
	return value.length > 0 && [...value].every((char) => char >= '0' && char <= '9');
};

const fromOracleInner = (value: unknown) => {
	const inner = (value as any)?.value?.value?.toString?.() || (value as any)?.value?.toString?.() || "0";

	if (!isUnsignedIntegerString(inner)) {
		warnInvalidPrice(`Invalid oracle price value ${inner}; defaulting to zero`);
		return FN.ZERO;
	}

	return FN.fromInner(inner, 18);
};

export const toSafePriceChainData = (price: FN | undefined | null, context: string) => {
	if (!price) return BigInt(0);

	const chainData = price.toChainData()?.toString() || "0";

	if (!isUnsignedIntegerString(chainData)) {
		warnInvalidPrice(`Invalid ${context} price ${chainData}; defaulting to zero`);
		return BigInt(0);
	}

	return BigInt(chainData);
};

const divideOrZero = (numerator: FN, denominator: FN) => {
	return denominator.isZero() ? FN.ZERO : numerator.div(denominator);
};

const getOracleValue = async (api: AnyApi, token: MaybeCurrency) => {
	const currencyId = forceToCurrencyId(api as any, token);
	const query = (api as any)?.query?.acalaOracle?.values || (api as any)?.query?.oracle?.values;

	if (query) {
		return query(currencyId);
	}

	const getValue = (api as any)?.rpc?.oracle?.getValue;

	if (typeof getValue === 'function') {
		return getValue('Aggregated', currencyId);
	}

	throw new Error(`Oracle price source is unavailable for ${getTokenName(token)}`);
}

const queryPriceFromOracle = async (api: AnyApi, token: MaybeCurrency) => {
	const result = await getOracleValue(api, token);
	const value = result?.unwrapOrDefault?.() || result;

	return fromOracleInner(value);
}

export const ensurePriceBundleBlock = async (block: SubstrateBlock) => {
	const blockId = block.block.header.number.toString();
	const blockRecord = await getBlock(blockId);

	blockRecord.hash = block.block.hash.toString();
	blockRecord.number = BigInt(blockId);
	blockRecord.timestamp = block.timestamp;

	await blockRecord.save();

	return blockRecord;
}

const getOtherPrice = async (api: AnyApi, block: SubstrateBlock, token: string, stakingCurrency: string, StableCurrency: string) => {
	const { rate: rateA, amount: _amountA } = await getPriceFromDexPool(token, stakingCurrency);
	const { rate: rateB, amount: _amountB } = await getPriceFromDexPool(token, StableCurrency);

	if (rateA.isZero() && rateB.isZero()) return FN.ZERO;
	const amountA = FN.fromInner(_amountA.toString(), 18);
	const amountB = FN.fromInner(_amountB.toString(), 18);
	const StakingPrice = stakingCurrency === 'DOT' ? await getDotMarketPrice(api, block) : await getKsmMarketPrice(api, block);
	const StablePrice =  stakingCurrency === 'DOT' ? await getAusdMarketPrice(api, block) : await getKusdMarketPrice(api, block);
	const totalAmount = amountA.add(amountB);
	
	if (totalAmount.isZero()) return FN.ZERO;

	const partA = divideOrZero(rateA.mul(StakingPrice).times(amountA), totalAmount);
	const partB = divideOrZero(rateB.mul(StablePrice).times(amountB), totalAmount);

	return partA.add(partB);
}

const getPriceFromDexPool = async (tokenA: string, tokenB: string) => {
	const [_t0, _t1] = Token.sortTokenNames(tokenA, tokenB);
	const token0 = await getToken(_t0);
	const token1 = await getToken(_t1);
	const pool = await getPool(token0.name, token1.name);

	if (!pool || pool.txCount == BigInt(0)) {
		return {
			rate: FN.ZERO,
			amount: BigInt(1)
		};
	} 

	
	const token0Amount = pool.token0Amount || BigInt(0);
	const token1Amount = pool.token1Amount || BigInt(0);
	const amount0 = FN.fromInner(token0Amount.toString(), token0.decimals || 18);
	const amount1 = FN.fromInner(token1Amount.toString(), token1.decimals || 18);

	if (amount0.isZero() || amount1.isZero()) return {
		rate: FN.ZERO,
		amount: BigInt(1)
	};

	return {
		rate: pool.token0Id === tokenA ? amount1.div(amount0) : amount0.div(amount1),
		amount: token0Amount + token1Amount
	}
}

const getKusdMarketPrice = async (api: AnyApi, block: SubstrateBlock) => {
	const stakingCurrencyMarketPrice = await getKsmMarketPrice(api, block)
	
	const stakingCurrency = api.consts.prices.getStakingCurrencyId;

	const stableCurrency = api.consts.prices.getStableCurrencyId;
	const stakingCurrencyName = getTokenName(stakingCurrency as any);
	const stableCurrencyName = getTokenName(stableCurrency as any);

	const pool = await getPool(stableCurrencyName, stakingCurrencyName)
	
	const token0 = await getToken(pool.token0Id);
	const token1 = await getToken(pool.token1Id);

	const stableAmount = FN.fromInner((pool.token0Amount || BigInt(0)).toString(), token0.decimals || 18);
	const stakingAmount = FN.fromInner((pool.token1Amount || BigInt(0)).toString(), token1.decimals || 18);

	return stableAmount.isZero() ? FN.ZERO : stakingCurrencyMarketPrice.mul(stakingAmount.div(stableAmount));
}

const getAusdMarketPrice = async (api: AnyApi, block: SubstrateBlock) => {
	const acaPrice = await queryPriceFromOracle(api, 'ACA')
	
	const pool = await getPool('ACA', 'AUSD')
	
	const token0 = await getToken(pool.token0Id); // ACA
	const token1 = await getToken(pool.token1Id); // AUSD

	
	const amount0 = FN.fromInner((pool.token0Amount || BigInt(0)).toString(), token0.decimals || 18); // ACA
	const amount1 = FN.fromInner((pool.token1Amount || BigInt(0)).toString(), token1.decimals || 18); // AUSD

	return !amount0.isZero() && !amount1.isZero() ? acaPrice.mul(amount0.div(amount1)) : FN.ZERO;
}

const getKsmMarketPrice = (api: AnyApi, block: SubstrateBlock) => {
	const stakingCurrency = api.consts.prices.getStakingCurrencyId;
	const stakingCurrencyName = getTokenName(stakingCurrency as any);

	return queryPriceFromOracle(api, stakingCurrencyName)
}

const getDotMarketPrice = async (api: AnyApi, block: SubstrateBlock) => {
	const ausdPrice = await getAusdMarketPrice(api, block)
	const lc13Price = await getPriceFromDexPool('lc://13', 'AUSD');
	const dotPrice = await getPriceFromDexPool('DOT', 'lc://13');
	return dotPrice.rate.mul(lc13Price.rate).mul(ausdPrice);
}

const getTaiMarketPrice = async (api: AnyApi, block: SubstrateBlock) => {
	// Use KSM price for taiKSM
	const ksmPrice = await getKsmMarketPrice(api, block);
	const taiPrice = await getPriceFromDexPool('TAI', 'sa://0');

	return taiPrice.rate.mul(ksmPrice);
}

export const circulatePrice = async (api: AnyApi, block: SubstrateBlock, name: MaybeCurrency) => {
	const _name = getTokenName(name);

	const stakingCurrency = api.consts.prices.getStakingCurrencyId;
	const stableCurrency = api.consts.prices.getStableCurrencyId;
	const stakingCurrencyName = getTokenName(stakingCurrency as any);
	const stableCurrencyName = getTokenName(stableCurrency as any);

	if (_name === "KUSD") return getStablePriceBundle(api, block, 'KUSD');

	else if (_name === "AUSD") return getStablePriceBundle(api, block, 'AUSD');

	else if (_name === 'KSM') return getKsmMarketPrice(api, block);
	
	else if (_name === 'DOT') return getDotMarketPrice(api, block);

	else if (_name === "TAI") return getTaiMarketPrice(api, block);

	else return getOtherPrice(api, block, _name, stakingCurrencyName, stableCurrencyName);
}

export const queryPrice = async (api: any, block: SubstrateBlock, token: string) => {
	const queryToken = token == 'sa://0' ? 'KSM' : token;
	const price = await circulatePrice(api as any, block, queryToken);

	price.setPrecision(18);

	const tokenData = await getToken(token);
	const chainData = toSafePriceChainData(price, `${token} block ${block.block.header.number.toString()}`);
	tokenData.price = chainData;

	if(queryToken != token) {
		const queryTokenData = await getToken(queryToken);
		queryTokenData.price = chainData;
		await queryTokenData.save();
	}

	await tokenData.save();
	return price
};


export const getStablePriceBundle = async (api: AnyApi, block: SubstrateBlock, token: 'KUSD' | 'AUSD') => {
	const id = `${block.block.header.number.toString()}-${token}`

	let record = await PriceBundle.get(id);

	if (!record) {
		const price = token === 'KUSD' ? await getKusdMarketPrice(api, block) : await getAusdMarketPrice(api, block);
		const blockRecord = await ensurePriceBundleBlock(block);

		record = new PriceBundle(id);

		record.TokenId = token;
		record.blockId = blockRecord.id;
		record.price = toSafePriceChainData(price || FN.ZERO, `${token} price bundle ${block.block.header.number.toString()}`)

		await record.save();
	}

	return FN.fromInner(record.price?.toString() || "0", 12) 
}
