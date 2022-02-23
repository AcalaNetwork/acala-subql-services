# Acala Subql

a collection of acala/karura sub-query services.

## Services

1. Acala-subql: [link](https://github.com/AcalaNetwork/acala-subql)
2. Acala-tokens: [link](https://github.com/AcalaNetwork/acala-tokens-subql)
3. Acala-loans: [link](https://github.com/AcalaNetwork/acala-loan-subql)
4. Acala-Vesting: [link](https://github.com/AcalaNetwork/acala-vesting-subql)
5. Acala-homa: [link](https://github.com/AcalaNetwork/acala-homa-subql)
6. Subql-dictionary: [link](https://github.com/AcalaNetwork/subql-dictionary)


## How To Add A Service

-   install @subql/cli

    ```bash
      yarn global add @subql/cli
    ```

-   create a service

    ```bash
    cd packages && npx subql init --starter PROJECT_NAME
    ```

-   patch types of acala/karura
    ```bash
    cd SERVICE_DIR && node ../../scripts/patch-acala-types.js
    ```

## Use Acala/Karura Dictionary

edit project.yaml in target service folder

```yaml
---
network:
    endpoint: wss://polkadot.api.onfinality.io/public-ws
    dictionary: https://api.subquery.network/sq/AcalaNetwork/karura-dictionary
```

## Start Local Test Service

-   install @subql/node service

```bash
cd SERVICE_DIR && yarn add @subql/node
```

-   edit package.json

```json
...
scripts: {
  "start": "./node_modules/.bin/subql-node -f . --local --timeout=512 --batch-size=100 --port=3123"
}
...
```

-   start dev server
    > please ensure that postgres db is connectable.

```bash
yarn run start
```
