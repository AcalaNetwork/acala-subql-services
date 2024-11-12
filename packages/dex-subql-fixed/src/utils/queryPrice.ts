import { AnyApi, FixedPointNumber as FN, MaybeCurrency, Token, forceToCurrencyId } from "@acala-network/sdk-core";
import { SubstrateBlock } from '@subql/types/dist/interfaces';
import { getPool, getToken } from ".";
import { getTokenName } from './getTokenName';
import { PriceBundle } from "../types";
import { queryPriceFromOracle } from "@acala-network/subql-utils";

const getOtherPrice = async (api: AnyApi, block: SubstrateBlock, token: string, stakingCurrency: string, StableCurrency: string) => {
	const { rate: rateA, amount: _amountA } = await getPriceFromDexPool(token, stakingCurrency);
	const { rate: rateB, amount: _amountB } = await getPriceFromDexPool(token, StableCurrency);

	if (rateA.isZero() && rateB.isZero()) return FN.ZERO;
	const amountA = FN.fromInner(_amountA.toString(), 18);
	const amountB = FN.fromInner(_amountB.toString(), 18);
	const StakingPrice = stakingCurrency === 'DOT' ? await getDotMarketPrice(api, block) : await getKsmMarketPrice(api, block);
	const StablePrice =  stakingCurrency === 'DOT' ? await getAusdMarketPrice(api, block) : await getKusdMarketPrice(api, block);
	
	const partA = rateA.mul(StakingPrice).times(amountA).div(amountA.add(amountB));
	const partB = rateB.mul(StablePrice).times(amountB).div(amountA.add(amountB));

	return partA.add(partB);
}

const getPriceFromDexPool = async (tokenA: string, tokenB: string) => {
	const [_t0, _t1] = Token.sortTokenNames(tokenA, tokenB);
	const token0 = await getToken(_t0);
	const token1 = await getToken(_t1);
	const pool = await getPool(token0.name!, token1.name!);

	if (!pool || pool.txCount == BigInt(0)) {
		return {
			rate: FN.ZERO,
			amount: BigInt(1)
		};
	} 

	
	const amount0 = FN.fromInner(pool.token0Amount!.toString() || "0", token0.decimals);
	const amount1 = FN.fromInner(pool.token1Amount!.toString() || "0", token1.decimals);

	if (amount0.isZero() || amount1.isZero()) return {
		rate: FN.ZERO,
		amount: BigInt(1)
	};

	return {
		rate: pool.token0Id === tokenA ? amount1.div(amount0) : amount0.div(amount1),
		amount: pool.token0Amount! + pool.token1Amount!
	}
}

const getKusdMarketPrice = async (api: AnyApi, block: SubstrateBlock) => {
	const stakingCurrencyMarketPrice = await getKsmMarketPrice(api, block)
	
	const stakingCurrency = api.consts.prices.getStakingCurrencyId;

	const stableCurrency = api.consts.prices.getStableCurrencyId;
	const stakingCurrencyName = getTokenName(stakingCurrency as any);
	const stableCurrencyName = getTokenName(stableCurrency as any);

	const pool = await getPool(stableCurrencyName, stakingCurrencyName)
	
	const token0 = await getToken(pool.token0Id!);
	const token1 = await getToken(pool.token1Id!);

	const stableAmount = FN.fromInner(pool.token0Amount!.toString() || "0", token0.decimals);
	const stakingAmount = FN.fromInner(pool.token1Amount!.toString() || "0", token1.decimals);

	return stakingCurrencyMarketPrice.mul(stakingAmount.div(stableAmount));
}

const getAusdMarketPrice = async (api: AnyApi, block: SubstrateBlock) => {
	const acaPrice = await queryPriceFromOracle(api, block as any, 'ACA')
	
	const pool = await getPool('ACA', 'AUSD')
	
	const token0 = await getToken(pool.token0Id!); // ACA
	const token1 = await getToken(pool.token1Id!); // AUSD

	
	const amount0 = FN.fromInner(pool.token0Amount!.toString() || "0", token0.decimals); // ACA
	const amount1 = FN.fromInner(pool.token1Amount!.toString() || "0", token1.decimals); // AUSD

	return !amount0.isZero() ? acaPrice.mul(amount0.div(amount1)) : FN.ZERO;
}

const getKsmMarketPrice = (api: AnyApi, block: SubstrateBlock) => {
	const stakingCurrency = api.consts.prices.getStakingCurrencyId;
	const stakingCurrencyName = getTokenName(stakingCurrency as any);

	return queryPriceFromOracle(api, block as any, stakingCurrencyName)
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
	tokenData.price = BigInt(price.toChainData());

	if(queryToken != token) {
		const queryTokenData = await getToken(queryToken);
		queryTokenData.price = BigInt(price.toChainData());
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

		record = new PriceBundle(id);

		record.tokenId = token
		record.blockId = block.block.header.number.toString();
		record.price = BigInt((price || FN.ZERO).toChainData())

		await record.save();
	}

	return FN.fromInner(record.price?.toString() || "0", 12) 
}
