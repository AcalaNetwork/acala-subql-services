import { AnyApi, forceToCurrencyName, getERC20TokenAddressFromName, getForeignAssetIdFromName, getStableAssetPoolIdFromName, isDexShareName, isERC20Name, isForeignAssetName, isLiquidCrowdloanName, isStableAssetName, unzipDexShareName } from '@acala-network/sdk-core'
import { ApiPromise, ApiRx } from '@polkadot/api'
import { zip, isEmpty } from 'lodash'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTokenEqual(t1: any, t2: any) {
    return forceToCurrencyName(t1) === forceToCurrencyName(t2)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTokenName(token: any) {
    return forceToCurrencyName(token)
}

let tokensDecimals: Record<string, number> = {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getTokenDecimals(api: ApiPromise | ApiRx, token: any) {
    if (isEmpty(tokensDecimals)) {
        tokensDecimals = Object.fromEntries(zip(api.registry.chainTokens, api.registry.chainDecimals))
    }

    const name = getTokenName(token)
    const stakingTokenName = getTokenName(api.consts?.homaLite?.stakingCurrencyId || api.consts?.homa?.stakingCurrencyId || api.consts?.prices?.getStakingCurrencyId)

    if (isDexShareName(name)) {
        const [token0] = unzipDexShareName(name)

        return getTokenDecimals(api, token0)
    }

    if (isLiquidCrowdloanName(name)) {
        return tokensDecimals[stakingTokenName]
    }

    if (isForeignAssetName(name) && api.query.assetRegistry && !tokensDecimals[name]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const metadata = (await api.query.assetRegistry.assetMetadatas({ ForeignAssetId: getForeignAssetIdFromName(name) })) as any

        tokensDecimals[name] = metadata.unwrapOrDefault()?.decimals?.toNumber()
    }

    if (isStableAssetName(name) && api.query.assetRegistry && !tokensDecimals[name]) {
        const metadata = (await api.query.assetRegistry.assetMetadatas({ StableAssetId: getStableAssetPoolIdFromName(name) })) as any

        tokensDecimals[name] = metadata.unwrapOrDefault()?.decimals?.toNumber()
    }

    if (isERC20Name(name) && api.query.assetRegistry && !tokensDecimals[name]) {
        const metadata = (await api.query.assetRegistry.assetMetadatas({ Erc20: getERC20TokenAddressFromName(name) })) as any

        tokensDecimals[name] = metadata.unwrapOrDefault()?.decimals?.toNumber()
    }

    return tokensDecimals[name] || 12
}

export function getStakingCurrency(api: AnyApi) {
    return api.consts?.homa?.stakingCurrencyId || api.consts?.homaLite?.stakingCurrencyId || api.consts.prices.getStakingCurrencyId

}

export function getLiquidCurrency(api: AnyApi) {
    return api.consts?.homa?.liquidCurrencyId || api.consts?.homaLite?.liquidCurrencyId || api.consts.prices.getLiquidCurrencyId
}

export function getStableCoinCurrency(api: AnyApi) {
    return api.consts?.cdpEngine.getStableCurrencyId
}

export function getNativeCurrency(api: AnyApi) {
    return api.consts?.currencies?.getNativeCurrencyId
}
