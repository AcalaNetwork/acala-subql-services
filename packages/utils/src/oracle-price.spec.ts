import { options } from '@acala-network/api'
import { FixedPointNumber } from '@acala-network/sdk-core'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { queryPriceFromOracle } from './oracle-price'

describe('all tokens helper should be ok', () => {
    // connect to acala
    const getApi = async () => {
        return ApiPromise.create(options({ provider: new WsProvider('wss://acala-polkadot.api.onfinality.io/public-ws') }))
    }

    // set timeout to 60s
    jest.setTimeout(60000)

    test('get feed token price should be ok', async () => {
        const api = await getApi()
        const apiAt = (await api.at('0x8175b43fd14e5a998098b330f856e895a5b247c977bd0af5d0b6a973a690a1bd')) as any

        const block = await apiAt.rpc.chain.getBlock()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dotPrice = await queryPriceFromOracle(apiAt as any, block, 'DOT')

        console.log(dotPrice.toString())

        expect(dotPrice).not.toBe(FixedPointNumber.ZERO)
    })
})
