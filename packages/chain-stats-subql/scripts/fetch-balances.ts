import { ApiPromise, WsProvider } from '@polkadot/api';
import { options } from '@acala-network/api';
import { fetchEntriesToArray } from '@open-web3/util';
import fs from 'fs';
import path from 'path';
import { forceToCurrencyName } from '@acala-network/sdk-core';

async function createApi(chain ) {
  const endpoint = chain === 'acala' ? 'wss://acala.polkawallet.io' : 'wss://karura.polkawallet.io';
  const provider = new WsProvider(endpoint)

  const api = await ApiPromise.create(options({ provider }))

  await api.isConnected;

  return api;
}

function getDataFilePath (name) {
  const dataFolderPath = path.resolve(__dirname, '../src/data');

  if (!fs.existsSync(dataFolderPath)) {
    fs.mkdirSync(dataFolderPath);
  }

  return path.resolve(dataFolderPath, name);
}

async function getNonNativeToken(chain, height) {
  const api = await createApi(chain);
  const hash = await api.rpc.chain.getBlockHash(height);
  const apiAt = await api.at(hash);

  const accs = await fetchEntriesToArray((startKey): any => {
    console.log(`fetch non-nativeToken start at ${startKey}`);

    return apiAt.query.tokens.accounts.entriesPaged({
      args: [],
      pageSize: 500,
      startKey,
    })
  })

  console.log(`get ${accs.length} non-native tokens`);

  const data = accs.map((item: any) => {
    return {
      account: item[0].args[0].toString(),
      token: forceToCurrencyName(item[0].args[1]),
      free: item[1].free.toString(),
      reserved: item[1].reserved.toString(),
      frozen: item[1].frozen.toString()
    }
  })

  fs.writeFileSync(
    getDataFilePath(`${chain}-${height}-non-native.json`),
    JSON.stringify(data, undefined, 2), { encoding: 'utf-8' }
  );
}

async function getNativeToken(chain, height) {
  const api = await createApi(chain);
  const hash = await api.rpc.chain.getBlockHash(height);
  const apiAt = await api.at(hash);

  const accs = await fetchEntriesToArray((startKey): any => {
    console.log(`fetch nativeToken start at ${startKey}`);

    return apiAt.query.system.account.entriesPaged({
      args: [],
      pageSize: 500,
      startKey,
    })
  })

  console.log(`get ${accs.length} native tokens records`);

  const data = accs.map((item: any) => {
    const feeFrozen = item[1].data.feeFrozen.toBigInt();
    const miscFrozen = item[1].data.miscFrozen.toBigInt();

    return {
      account: item[0].args[0].toString(),
      token: chain === 'acala' ? 'ACA' : 'KAR',
      free: item[1].data.free.toString(),
      reserved: item[1].data.reserved.toString(),
      frozen: (feeFrozen > miscFrozen ? feeFrozen : miscFrozen).toString()
    }
  })

  fs.writeFileSync(
    getDataFilePath(`${chain}-${height}-native.json`),
    JSON.stringify(data, undefined, 2), { encoding: 'utf-8' }
  );
}

(async () => {
  // await getNonNativeToken('acala', 1870000);
  await getNativeToken('acala', 1870000);
  // await getNonNativeToken('karura', 2650000);
  // await getNativeToken('karura', 2650000);
})();