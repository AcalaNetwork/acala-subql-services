const { ApiPromise, WsProvider } = require('@polkadot/api');
const { options } = require('@acala-network/api');
const { fetchEntriesToArray } = require('@open-web3/util');
const fs = require('fs');
const { forceToCurrencyName } = require('@acala-network/sdk-core');

async function createApi() {
  const endpoint = 'wss://acala.polkawallet.io';
  const provider = new WsProvider(endpoint)

  const api = await ApiPromise.create(options({ provider }))

  await api.isConnected;

  return api;
}

async function getUnnativeToken() {
  const api = await createApi();

  const apiAt = await api.at('0x754d100adf4764b24263402bef4ffa9537cab6d15e275d958292e5a31fd4ffd5');

  console.log(Object.keys(apiAt.query.tokens.accounts));

  const accs = await fetchEntriesToArray((startKey) => {
    console.log(`fetch unnativeToken start at ${startKey}`);

    return apiAt.query.tokens.accounts.entriesPaged({
      args: [],
      pageSize: 500,
      startKey,
    })
  }
  )

  console.log(accs.length);

  const data = accs.map((item) => {
    return {
      account: item[0].args[0].toString(),
      token: forceToCurrencyName(item[0].args[1]),
      free: item[1].free.toString(),
      reserved: item[1].reserved.toString(),
      frozen: item[1].frozen.toString()
    }
  })

  fs.writeFileSync('./unNativeTokenbBalance.json', JSON.stringify(data, undefined, 2), { encoding: 'utf-8' });
}

async function getNativeToken() {
  const api = await createApi();

  const apiAt = await api.at('0x754d100adf4764b24263402bef4ffa9537cab6d15e275d958292e5a31fd4ffd5');

  console.log(Object.keys(apiAt.query.system.account));

  const accs = await fetchEntriesToArray((startKey) => {
    console.log(`fetch nativeToken start at ${startKey}`);

    return apiAt.query.system.account.entriesPaged({
      args: [],
      pageSize: 500,
      startKey,
    })
  })

  console.log(accs.length);

  const data = accs.map((item) => {
    return {
      account: item[0].args[0].toString(),
      token: 'ACA',
      free: item[1].data.free.toString(),
      reserved: item[1].data.reserved.toString(),
      frozen: item[1].data.feeFrozen.toString()
    }
  })

  fs.writeFileSync('./nativeTokenBalance.json', JSON.stringify(data, undefined, 2), { encoding: 'utf-8' });
}

getUnnativeToken();
getNativeToken();