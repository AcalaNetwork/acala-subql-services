import { AnyApi, FixedPointNumber, forceToCurrencyId, forceToCurrencyName, isLiquidCrowdloanName, MaybeCurrency } from '@acala-network/sdk-core'
import { SubstrateBlock } from '@subql/types/dist/interfaces'
import { getAllLiquidCrowdloanTokenPrice } from '@acala-network/sdk/wallet/utils/get-liquid-crowdloan-token-price'
import { getLiquidCurrency, getStakingCurrency, getTokenDecimals } from './tokens'
import { CacheDate } from './cache-date'

const cache = new CacheDate<FixedPointNumber>()

// query price via oracle feed
const queryFeedPriceFromOracle = async (api: AnyApi, token: MaybeCurrency) => {
    if(api?.query?.acalaOracle?.values) {
        const result = await api.query.acalaOracle.values(forceToCurrencyId(api as any, token));

        return FixedPointNumber.fromInner(result?.value?.value?.toString() || result?.value?.toString() || 0, 18)
    } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = (await (api.rpc as any).oracle.getValue('Aggregated', forceToCurrencyId(api, token))) as any
    
        return FixedPointNumber.fromInner(result?.value?.value?.toString() || result?.value?.toString() || 0, 18)
    }
}

// query liquid token price via homa lite
const queryLiquidTokenPriceFormHomaLite = async (api: AnyApi, stakingPrice: FixedPointNumber) => {
    const stakingToken = getStakingCurrency(api)
    const stakingTokenDecimals = await getTokenDecimals(api, stakingToken)
    const liquidToken = getLiquidCurrency(api)
    const liquidTokenDecimals = await getTokenDecimals(api, liquidToken)

    const totalStaking = await api.query.homaLite?.totalStakingCurrency()
    const liquidTokenIssuance = await api.query.tokens.totalIssuance(liquidToken)

    const exchangeRate = FixedPointNumber.fromInner(totalStaking?.toString() || 0, stakingTokenDecimals).div(FixedPointNumber.fromInner(liquidTokenIssuance?.toString() || 0, liquidTokenDecimals))
    const price = exchangeRate.mul(stakingPrice)

    price.setPrecision(18)

    return price
}

// query liquid token price via homa
const queryLiquidTokenPriceFromHoma = async (api: AnyApi, stakingPrice: FixedPointNumber) => {
    // if homa lite existed and homa is not existed, we query price form homa lite
    if (api.query.homaLite && !api.query.homa) return queryLiquidTokenPriceFormHomaLite(api, stakingPrice)

    const stakingToken = getStakingCurrency(api)
    const stakingTokenDecimals = await getTokenDecimals(api, stakingToken)
    const liquidToken = getLiquidCurrency(api)
    const liquidTokenDecimals = await getTokenDecimals(api, liquidToken)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stakingLedgers = (await api.query.homa.stakingLedgers.entries()) as any[]
    const bonds = await api.query.homa.toBondPool()
    const liquidTokenIssuance = await api.query.tokens.totalIssuance(liquidToken)

    const totalInSubAccount = stakingLedgers.reduce((acc, cur) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const item = (cur[1].toJSON() as any).bonded.toString()

        return acc.add(FixedPointNumber.fromInner(item, stakingTokenDecimals))
    }, new FixedPointNumber(0, stakingTokenDecimals))

    const totalStaking = totalInSubAccount.add(FixedPointNumber.fromInner(bonds.toString(), stakingTokenDecimals))
    const exchangeRate = totalStaking.div(FixedPointNumber.fromInner(liquidTokenIssuance?.toString() || 0, liquidTokenDecimals))
    const price = exchangeRate.mul(stakingPrice)

    price.setPrecision(18)

    return price
}

const queryLiquidCrowdloanTokenPrice = (api: AnyApi, block: SubstrateBlock, stakingPrice: FixedPointNumber) => {
    return getAllLiquidCrowdloanTokenPrice(api, block, stakingPrice)
}

export const queryPriceFromOracle = async (api: AnyApi, block: SubstrateBlock, token: MaybeCurrency): Promise<FixedPointNumber> => {
    const name = forceToCurrencyName(token)
    const blockNumber = block.block.header.number.toNumber()
    const liquidToken = getLiquidCurrency(api)
    const stakingToken = getStakingCurrency(api)
    const liquidTokenName = forceToCurrencyName(liquidToken)

    // return cached value when hit cache
    if (cache.get(blockNumber, name)) return cache.get(blockNumber, name)

    // handle liquid token
    if (name === liquidTokenName) {
        const stakingPrice = await queryPriceFromOracle(api, block, stakingToken)
        const price = await queryLiquidTokenPriceFromHoma(api, stakingPrice)

        // insert price to cache
        cache.set(blockNumber, name, price)

        return price
    }

    // handle liquid croadloan token
    if (isLiquidCrowdloanName(name)) {
        const stakingPrice = await queryPriceFromOracle(api, block, stakingToken)
        const prices = queryLiquidCrowdloanTokenPrice(api, block, stakingPrice)

        // inser all liquid croadloan token price into cache
        Object.entries(prices).forEach(([name, price]) => {
          price.setPrecision(18)
          cache.set(blockNumber, name, price)
        })

        return prices[name]
    }

    return queryFeedPriceFromOracle(api, name)
}
