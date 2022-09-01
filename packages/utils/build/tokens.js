"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNativeCurrency = exports.getStableCoinCurrency = exports.getLiquidCurrency = exports.getStakingCurrency = exports.getTokenDecimals = exports.getTokenName = exports.isTokenEqual = void 0;
const sdk_core_1 = require("@acala-network/sdk-core");
const lodash_1 = require("lodash");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isTokenEqual(t1, t2) {
    return (0, sdk_core_1.forceToCurrencyName)(t1) === (0, sdk_core_1.forceToCurrencyName)(t2);
}
exports.isTokenEqual = isTokenEqual;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTokenName(token) {
    return (0, sdk_core_1.forceToCurrencyName)(token);
}
exports.getTokenName = getTokenName;
let tokensDecimals = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getTokenDecimals(api, token) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if ((0, lodash_1.isEmpty)(tokensDecimals)) {
        tokensDecimals = Object.fromEntries((0, lodash_1.zip)(api.registry.chainTokens, api.registry.chainDecimals));
    }
    const name = getTokenName(token);
    const stakingTokenName = getTokenName(((_b = (_a = api.consts) === null || _a === void 0 ? void 0 : _a.homaLite) === null || _b === void 0 ? void 0 : _b.stakingCurrencyId) || ((_d = (_c = api.consts) === null || _c === void 0 ? void 0 : _c.homa) === null || _d === void 0 ? void 0 : _d.stakingCurrencyId) || ((_f = (_e = api.consts) === null || _e === void 0 ? void 0 : _e.prices) === null || _f === void 0 ? void 0 : _f.getStakingCurrencyId));
    if ((0, sdk_core_1.isDexShareName)(name)) {
        const [token0] = (0, sdk_core_1.unzipDexShareName)(name);
        return getTokenDecimals(api, token0);
    }
    if ((0, sdk_core_1.isLiquidCrowdloanName)(name)) {
        return tokensDecimals[stakingTokenName];
    }
    if ((0, sdk_core_1.isForeignAssetName)(name) && api.query.assetRegistry && !tokensDecimals[name]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const metadata = (await api.query.assetRegistry.assetMetadatas({ ForeignAssetId: (0, sdk_core_1.getForeignAssetIdFromName)(name) }));
        tokensDecimals[name] = (_h = (_g = metadata.unwrapOrDefault()) === null || _g === void 0 ? void 0 : _g.decimals) === null || _h === void 0 ? void 0 : _h.toNumber();
    }
    if ((0, sdk_core_1.isStableAssetName)(name) && api.query.assetRegistry && !tokensDecimals[name]) {
        const metadata = (await api.query.assetRegistry.assetMetadatas({ StableAssetId: (0, sdk_core_1.getStableAssetPoolIdFromName)(name) }));
        tokensDecimals[name] = (_k = (_j = metadata.unwrapOrDefault()) === null || _j === void 0 ? void 0 : _j.decimals) === null || _k === void 0 ? void 0 : _k.toNumber();
    }
    return tokensDecimals[name];
}
exports.getTokenDecimals = getTokenDecimals;
function getStakingCurrency(api) {
    var _a, _b;
    return ((_a = api.consts) === null || _a === void 0 ? void 0 : _a.homa.stakingCurrencyId) || ((_b = api.consts) === null || _b === void 0 ? void 0 : _b.homaLite.stakingCurrencyId) || api.consts.prices.getStakingCurrencyId;
}
exports.getStakingCurrency = getStakingCurrency;
function getLiquidCurrency(api) {
    var _a, _b;
    return ((_a = api.consts) === null || _a === void 0 ? void 0 : _a.homa.liquidCurrencyId) || ((_b = api.consts) === null || _b === void 0 ? void 0 : _b.homaLite.liquidCurrencyId) || api.consts.prices.getLiquidCurrencyId;
}
exports.getLiquidCurrency = getLiquidCurrency;
function getStableCoinCurrency(api) {
    var _a;
    return (_a = api.consts) === null || _a === void 0 ? void 0 : _a.cdpEngine.getStableCurrencyId;
}
exports.getStableCoinCurrency = getStableCoinCurrency;
function getNativeCurrency(api) {
    var _a, _b;
    return (_b = (_a = api.consts) === null || _a === void 0 ? void 0 : _a.currencies) === null || _b === void 0 ? void 0 : _b.getNativeCurrencyId;
}
exports.getNativeCurrency = getNativeCurrency;
