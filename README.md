# Acala Subql

a collection of acala/karura sub-query services.

# Update Log
3. 2022-10-19: update readme.md with new subql names and links
2. 2022-07-14: update subql-utils version in `acala transfer subql ipfs`
1. 2022-07-04: Fix code error in `loan subql`, which will effects `loans.transferLoan`

## 1. History

- 1.1 Github page: https://github.com/AcalaNetwork/acala-subql-services/tree/master/packages/histories-subql

- 1.2 Graphql workground:

| Chain  | Link                                                 |
| ------ | ---------------------------------------------------- |
| Acala  | https://api.polkawallet.io/acala-history-subql       |
| Karura | https://api.polkawallet.io/karura-history-subql      |

- 1.3 includes:

| Extrinsic  | events                                                                                                                                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| homa      | Minted、RequestedCancelled、RedeemedByFastMatch、RedeemedByUnbond |
| homaLite      | Minted、RequestedRedeem、RequestedCancelled、RedeemRequested、Redeemed、 |
| balances  | Transfer、Transferred |
| incentives      | DepositDexShare、WithdrawDexShare、PayoutRewards、ClaimRewards |

## 2. Loan

- 2.1 Github page: https://github.com/AcalaNetwork/acala-subql-services/tree/master/packages/loan-subql

- 2.2 Graphql workground:

| Chain  | Link                                              |
| ------ | ------------------------------------------------- |
| Acala  | https://api.polkawallet.io/acala-loan-subql       |
| Karura | https://api.polkawallet.io/karura-loan-subql      |

- 2.3 includes:

| Extrinsic | events                                                               |
| --------- | ---------------------------------------------------------------------|
| cdpEngine | InterestRatePerSecUpdated、LiquidationRatioUpdated、LiquidationPenaltyUpdated、RequiredCollateralRatioUpdated、MaximumTotalDebitValueUpdated、LiquidateUnsafeCDP、CloseCDPInDebitByDEX |
| loans     | PositionUpdated、ConfiscateCollateralAndDebit、TransferLoan          ｜

## 3. Dex

- 3.1 Github page: https://github.com/AcalaNetwork/acala-subql-services/tree/master/packages/dex-subql

- 3.2 Graphql workground:

| Chain  | Link                                             |
| ------ | ------------------------------------------------ |
| Acala  | https://api.polkawallet.io/acala-dex-subql       |
| Karura | https://api.polkawallet.io/karura-dex-subql      |

- 3.3 includes:

| Extrinsic | events     |
| --------- | --------------------------------------------------------------------- |
| dex      | ProvisioningToEnabled、AddLiquidity、RemoveLiquidity、Swap、ListProvisioning、AddProvision |

## 4. EVM

- 4.1 Github page: https://github.com/AcalaNetwork/bodhi.js/tree/master/evm-subql

- 4.2 Graphql workground:

| Chain          | Link                                                       |
| -------------- | ---------------------------------------------------------- |
| Acala          | https://subql-query-acala.aca-api.network                  |
| Karura         | https://subql-query-karura.aca-api.network                 |
| Mandala        | https://subql-query-mandala.aca-staging.network                |
| Acala testnet  | https://subql-query-acala-testnet.aca-staging.network      |
| Karura testnet | https://subql-query-karura-testnet.aca-staging.network     |

- 4.3 includes:

| Extrinsic  | events                                                                        |
| ---------- | ----------------------------------------------------------------------------- |
| evm   | Created, Executed, CreatedFailed, ExecutedFailed |

## 5. Stats

- 5.1 Github page: https://github.com/AcalaNetwork/acala-subql-services/tree/master/packages/chain-stats-subql

- 5.2 Graphql workground:

| Chain  | Link                                               |
| ------ | -------------------------------------------------- |
| Acala  | https://api.polkawallet.io/acala-stats-subql       |
| Karura | https://api.polkawallet.io/karura-stats-subql      |

- 5.3 includes:

| Extrinsic  | events                                                                        |
| ---------- | ----------------------------------------------------------------------------- |
| balances   | DustLost、Transfer、Reserved、Unreserved、ReserveRepatriated、Deposit、Withdraw |
| tokens | Transfer、 Reserved、 Unreserved、ReserveRepatriated、Deposited、Withdrawn、Slashed |
