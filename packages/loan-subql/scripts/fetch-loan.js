
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { options } = require('@acala-network/api');
const fs = require('fs');
const path = require('path');
const { forceToCurrencyName } = require('@acala-network/sdk-core');

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

async function fetchLoan(chain, height) {
  const api = await createApi(chain);
  const hash = await api.rpc.chain.getBlockHash(height);
  const apiAt = await api.at(hash);

  const positions = await apiAt.query.loans.positions.entries();

  const formated = positions.map(([k, v]) => {
    const token = forceToCurrencyName(k.args[0]);
    const collateral = v['collateral'].toString();
    const debit = v['debit'].toString();

    return { address: k.args[1].toString(), token, collateral, debit }
  });

  fs.writeFileSync(
    getDataFilePath(`${chain}-${height}.json`),
    JSON.stringify(formated, undefined, 2), { encoding: 'utf-8' }
  );
}

(async () => {
  await fetchLoan('acala', 3070000);
  await fetchLoan('karura', 3827500);
})();