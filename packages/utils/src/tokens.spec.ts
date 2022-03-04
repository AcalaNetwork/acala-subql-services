import { options } from '@acala-network/api'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { getTokenDecimals } from './tokens'

describe('all tokens helper should be ok', () => {
    const getApi = async () => {
        return ApiPromise.create(options({ provider: new WsProvider('wss://karura.api.onfinality.io/public-ws') }))
    }

    // set timeout to 60s
    jest.setTimeout(60000)

    test('getTokenDecimals should be ok', async () => {
        const api = await getApi()
        const karDecimals = await getTokenDecimals(api, 'KAR')
        const kbtcDecimals = await getTokenDecimals(api, 'KBTC')
        const rmrkDecimals = await getTokenDecimals(api, 'fa://0')

        expect(karDecimals).toBe(12)
        expect(kbtcDecimals).toBe(8)
        expect(rmrkDecimals).toBe(10)
    })
})
