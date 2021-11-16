## Acala Subql

a collection of acala/karura sub-query services.

#### 1. acala-transfers
  1. build all the user transfer records.
  2. statistics of daily transfer volumn.

### How To Add A Service

+ install @subql/cli
  ```bash
    yarn global add @subql/cli
  ```

+ create a service
  ```bash
  cd packages && npx subql init --starter PROJECT_NAME
  ```

+ patch types of acala/karura
  ```bash
  cd SERVICE_DIRECTION && node ../../scripts/patch-acala-types.js
  ```

### Use Acala/Karura Dictionary

edit project.yaml in target service folder

```yaml
...
network:
  endpoint: wss://polkadot.api.onfinality.io/public-ws
  dictionary: https://api.subquery.network/sq/AcalaNetwork/karura-dictionary
...
```