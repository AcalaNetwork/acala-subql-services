const config = require('@open-web3/dev-config/config/jest.cjs');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@acala-network/subql-utils(.*)$': '<rootDir>/packages/utils/src/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/utils/dist',
  ],
  transformIgnorePatterns: ['/node_modules/(?!@polkadot|@babel/runtime/helpers/esm/)']
});
