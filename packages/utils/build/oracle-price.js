"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryPriceFromOracle = void 0;
const sdk_core_1 = require("@acala-network/sdk-core");
const get_liquid_crowdloan_token_price_1 = require("@acala-network/sdk/wallet/utils/get-liquid-crowdloan-token-price");
const tokens_1 = require("./tokens");
const cache_date_1 = require("./cache-date");
const cache = new cache_date_1.CacheDate();
// query price via oracle feed
const queryFeedPriceFromOracle = async (api, token) => {
    var _a, _b, _c;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (await api.rpc.oracle.getValue('Aggregated', (0, sdk_core_1.forceToCurrencyId)(api, token)));
    return sdk_core_1.FixedPointNumber.fromInner(((_b = (_a = result === null || result === void 0 ? void 0 : result.value) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.toString()) || ((_c = result === null || result === void 0 ? void 0 : result.value) === null || _c === void 0 ? void 0 : _c.toString()) || 0, 18);
};
// query liquid token price via homa lite
const queryLiquidTokenPriceFormHomaLite = async (api, stakingPrice) => {
    var _a;
    const stakingToken = (0, tokens_1.getStakingCurrency)(api);
    const stakingTokenDecimals = (0, tokens_1.getTokenDecimals)(api, stakingToken);
    const liquidToken = (0, tokens_1.getLiquidCurrency)(api);
    const liquidTokenDecimals = (0, tokens_1.getTokenDecimals)(api, liquidToken);
    const totalStaking = await ((_a = api.query.homaLite) === null || _a === void 0 ? void 0 : _a.totalStakingCurrency());
    const liquidTokenIssuance = await api.query.tokens.totalIssuance(liquidToken);
    const exchangeRate = sdk_core_1.FixedPointNumber.fromInner((totalStaking === null || totalStaking === void 0 ? void 0 : totalStaking.toString()) || 0, stakingTokenDecimals).div(sdk_core_1.FixedPointNumber.fromInner((liquidTokenIssuance === null || liquidTokenIssuance === void 0 ? void 0 : liquidTokenIssuance.toString()) || 0, liquidTokenDecimals));
    const price = exchangeRate.mul(stakingPrice);
    price.setPrecision(18);
    return price;
};
// query liquid token price via homa
const queryLiquidTokenPriceFromHoma = async (api, stakingPrice) => {
    // if homa lite existed and homa is not existed, we query price form homa lite
    if (api.query.homaLite && !api.query.homa)
        return queryLiquidTokenPriceFormHomaLite(api, stakingPrice);
    const stakingToken = (0, tokens_1.getStakingCurrency)(api);
    const stakingTokenDecimals = (0, tokens_1.getTokenDecimals)(api, stakingToken);
    const liquidToken = (0, tokens_1.getLiquidCurrency)(api);
    const liquidTokenDecimals = (0, tokens_1.getTokenDecimals)(api, liquidToken);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stakingLedgers = (await api.query.homa.stakingLedgers.entries());
    const bonds = await api.query.homa.toBondPool();
    const liquidTokenIssuance = await api.query.tokens.totalIssuance(liquidToken);
    const totalInSubAccount = stakingLedgers.reduce((acc, cur) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const item = cur[1].toJSON().bonded.toString();
        return acc.add(sdk_core_1.FixedPointNumber.fromInner(item, stakingTokenDecimals));
    }, new sdk_core_1.FixedPointNumber(0, stakingTokenDecimals));
    const totalStaking = totalInSubAccount.add(sdk_core_1.FixedPointNumber.fromInner(bonds.toString(), stakingTokenDecimals));
    const exchangeRate = totalStaking.div(sdk_core_1.FixedPointNumber.fromInner((liquidTokenIssuance === null || liquidTokenIssuance === void 0 ? void 0 : liquidTokenIssuance.toString()) || 0, liquidTokenDecimals));
    const price = exchangeRate.mul(stakingPrice);
    price.setPrecision(18);
    return price;
};
const queryLiquidCrowdloanTokenPrice = (api, block, stakingPrice) => {
    return (0, get_liquid_crowdloan_token_price_1.getAllLiquidCrowdloanTokenPrice)(api, block, stakingPrice);
};
const queryPriceFromOracle = async (api, block, token) => {
    const name = (0, sdk_core_1.forceToCurrencyName)(token);
    const blockNumber = block.block.header.number.toNumber();
    const liquidToken = (0, tokens_1.getLiquidCurrency)(api);
    const stakingToken = (0, tokens_1.getStakingCurrency)(api);
    const liquidTokenName = (0, sdk_core_1.forceToCurrencyName)(liquidToken);
    // return cached value when hit cache
    if (cache.get(blockNumber, name))
        return cache.get(blockNumber, name);
    // handle liquid token
    if (name === liquidTokenName) {
        const stakingPrice = await (0, exports.queryPriceFromOracle)(api, block, stakingToken);
        const price = await queryLiquidTokenPriceFromHoma(api, stakingPrice);
        // insert price to cache
        cache.set(blockNumber, name, price);
        return price;
    }
    // handle liquid croadloan token
    if ((0, sdk_core_1.isLiquidCrowdloanName)(name)) {
        const stakingPrice = await (0, exports.queryPriceFromOracle)(api, block, stakingToken);
        const prices = queryLiquidCrowdloanTokenPrice(api, block, stakingPrice);
        // inser all liquid croadloan token price into cache
        Object.entries(prices).forEach(([name, price]) => {
            price.setPrecision(18);
            cache.set(blockNumber, name, price);
        });
        return prices[name];
    }
    return queryFeedPriceFromOracle(api, name);
};
exports.queryPriceFromOracle = queryPriceFromOracle;
