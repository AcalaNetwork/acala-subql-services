import { options } from '@acala-network/api'
import { FixedPointNumber } from '@acala-network/sdk-core'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { queryPriceFromOracle } from './oracle-price'

describe('all tokens helper should be ok', () => {
    // connect to acala
    const getApi = async () => {
        return ApiPromise.create(options({ provider: new WsProvider('wss://karura.api.onfinality.io/public-ws') }))
    }

    // set timeout to 60s
    jest.setTimeout(60000)

    test('get feed token price should be ok', async () => {
        const api = await getApi()
        const apiAt = (await api.at('0x78ae7848e2ad75a328f7970acf44fb2c330a46f9d22d4c4707efd512d381b771')) as any

        const block = await api.rpc.chain.getBlock()
        
        console.log(Object.keys(apiAt));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lksm = await queryPriceFromOracle(apiAt as any, block, 'LKSM')

        console.log(lksm.toString())

        expect(lksm).not.toBe(FixedPointNumber.ZERO)
    })
})
