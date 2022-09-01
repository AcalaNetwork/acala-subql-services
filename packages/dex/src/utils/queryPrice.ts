import { FixedPointNumber as FN, MaybeCurrency, Token } from "@acala-network/sdk-core";
import { getPool, getToken } from ".";
import { getTokenName } from './getTokenName';

const getOtherPrice = async (token: string, stakingCurrency: string, StableCurrency: string) => {
	const { rate: rateA, amount: _amountA } = await getPriceFromDexPool(token, stakingCurrency);
	const { rate: rateB, amount: _amountB } = await getPriceFromDexPool(token, StableCurrency);

	if (rateA.isZero() && rateB.isZero()) return FN.ZERO;

	const amountA = FN.fromInner(_amountA.toString(), 18);
	const amountB = FN.fromInner(_amountB.toString(), 18);
	const StakingPrice = await getStakingCurrencyPrice(stakingCurrency, StableCurrency);
	const StablePrice = await getStableCurrencyPrice();

	const partA = rateA.mul(StakingPrice).times(amountA).div(amountA.add(amountB));
	const partB = rateB.mul(StablePrice).times(amountB).div(amountA.add(amountB));

	return partA.add(partB);
}

const getPriceFromDexPool = async (tokenA: string, tokenB: string) => {
	const [_t0, _t1] = Token.sortTokenNames(tokenA, tokenB);
	const token0 = await getToken(_t0);
	const token1 = await getToken(_t1);
	const pool = await getPool(token0.name, token1.name);

	if (!pool || pool.txCount == BigInt(0)) return {
		rate: FN.ZERO,
		amount: BigInt(1)
	};

	const amount0 = FN.fromInner(pool.token0Amount.toString() || "0", token0.decimals);
	const amount1 = FN.fromInner(pool.token1Amount.toString() || "0", token1.decimals);

	if (amount0.isZero() || amount1.isZero()) return {
		rate: FN.ZERO,
		amount: BigInt(1)
	};

	return {
		rate: pool.token0Id === tokenA ? amount1.div(amount0) : amount0.div(amount1),
		amount: pool.token0Amount + pool.token1Amount
	}
}

const getStableCurrencyPrice = () => {
	return new FN(1, 18);
}

const getStakingCurrencyPrice = async (stakingCurrency: string, StableCurrency: string) => {
	const result = await getPriceFromDexPool(stakingCurrency, StableCurrency);
	return result.rate;
}

const getDOTPrice = async () => {
	const lc13Price = await getPriceFromDexPool('lc://13', 'AUSD');
	const dotPrice = await getPriceFromDexPool('DOT', 'lc://13');
	return dotPrice.rate.mul(lc13Price.rate);
}

const getTAIPrice = async (stakingCurrency: string, stableCurrency: string) => {
	// Use KSM price for taiKSM
	const ksmPrice = await getStakingCurrencyPrice(stakingCurrency, stableCurrency);
	const taiPrice = await getPriceFromDexPool('TAI', 'sa://0');

	return taiPrice.rate.mul(ksmPrice);
}

export const circulatePrice = async (name: MaybeCurrency) => {
	const _name = getTokenName(name);

	const stakingCurrency = api.consts.prices.getStakingCurrencyId;
	const stableCurrency = api.consts.prices.getStableCurrencyId;
	const stakingCurrencyName = getTokenName(stakingCurrency as any);
	const stableCurrencyName = getTokenName(stableCurrency as any);

	if (_name === "KUSD" || _name === "AUSD") return getStableCurrencyPrice();

	else if (_name === 'KSM') return getStakingCurrencyPrice(stakingCurrencyName, stableCurrencyName);

	else if (_name === 'DOT') return getDOTPrice();

	else if (_name === "TAI") return getTAIPrice(stakingCurrencyName, stableCurrencyName);

	else return getOtherPrice(_name, stakingCurrencyName, stableCurrencyName);
}

export const queryPrice = async (token: string) => {
	const queryToken = token == 'sa://0' ? 'KSM' : token;
	const price = await circulatePrice(queryToken);
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
