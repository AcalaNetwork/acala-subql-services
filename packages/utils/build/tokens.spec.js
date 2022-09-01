"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@acala-network/api");
const api_2 = require("@polkadot/api");
const tokens_1 = require("./tokens");
describe('all tokens helper should be ok', () => {
    const getApi = async () => {
        return api_2.ApiPromise.create((0, api_1.options)({ provider: new api_2.WsProvider('wss://karura.api.onfinality.io/public-ws') }));
    };
    // set timeout to 60s
    jest.setTimeout(60000);
    test('getTokenDecimals should be ok', async () => {
        const api = await getApi();
        const karDecimals = await (0, tokens_1.getTokenDecimals)(api, 'KAR');
        const kbtcDecimals = await (0, tokens_1.getTokenDecimals)(api, 'KBTC');
        const rmrkDecimals = await (0, tokens_1.getTokenDecimals)(api, 'fa://0');
        expect(karDecimals).toBe(12);
        expect(kbtcDecimals).toBe(8);
        expect(rmrkDecimals).toBe(10);
    });
});
