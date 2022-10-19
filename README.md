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
|||

## 2. Loan

- 2.1 Github page: https://github.com/AcalaNetwork/acala-loan-subql

- 2.2 Graphql workground:

| Chain  | Link                                              |
| ------ | ------------------------------------------------- |
| Acala  | https://api.polkawallet.io/acala-loan-subql       |
| Karura | https://api.polkawallet.io/karura-loan-subql      |

- 2.3 includes:

| Extrinsic  | events                                                                                                                                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|||

## 3. Dex

- 3.1 Github page: https://github.com/AcalaNetwork/acala-dex-subql

- 3.2 Graphql workground:

| Chain  | Link                                             |
| ------ | ------------------------------------------------ |
| Acala  | https://api.polkawallet.io/acala-dex-subql       |
| Karura | https://api.polkawallet.io/karura-dex-subql      |

- 3.3 includes:

| Extrinsic  | events                                                                                                                                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|||

## 4. EVM

- 4.1 Github page: https://github.com/AcalaNetwork/bodhi.js/tree/master/evm-subql

- 4.2 Graphql workground:

| Chain          | Link                                                       |
| -------------- | ---------------------------------------------------------- |
| Acala          | https://subql-query-acala.aca-api.network                  |
| Karura         | https://subql-query-karura.aca-api.network                 |
| Mandala        | https://subql-query-mandala.aca-dev.network                |
| Acala testnet  | https://subql-query-acala-testnet.aca-staging.network      |
| Karura testnet | https://subql-query-karura-testnet.aca-staging.network     |

- 4.3 includes:

| Extrinsic  | events                                                                                                                                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|||


## 5. Stats

- 5.1 Github page: https://github.com/AcalaNetwork/acala-subql-services/tree/master/packages/chain-stats-subql

- 5.2 Graphql workground:

| Chain  | Link                                               |
| ------ | -------------------------------------------------- |
| Acala  | https://api.polkawallet.io/acala-stats-subql       |
| Karura | https://api.polkawallet.io/karura-stats-subql      |

- 5.3 includes:

| Extrinsic  | events                                                                                                                                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|||

-- Below are outdated --

## 1. Acala-subql(Deprecated and may be removed at any time)

-   1.1 Github page:

    > https://github.com/AcalaNetwork/acala-subql

-   1.2 Graphql workground:

| Chain  | Link                                                           |
| ------ | -------------------------------------------------------------- |
| Acala  | https://explorer.subquery.network/subquery/AcalaNetwork/acala  |
| Karura | https://explorer.subquery.network/subquery/AcalaNetwork/karura |

-   1.3 includes:

| Extrinsic  | events                                                                                                                                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| currencies | Transferred                                                                                                                                                                                                           |
| nft        | TransferredToken、BurnedToken、BurnedTokenWithRemark                                                                                                                                                                  |
| loans      | PositionUpdated、PositionUpdated、ConfiscateCollateralAndDebit、transferLoan                                                                                                                                          |
| cdpEngine  | InterestRatePerSecUpdated、LiquidationRatioUpdated、LiquidationPenaltyUpdated、RequiredCollateralRatioUpdated、MaximumTotalDebitValueUpdated、GlobalInterestRatePerSecUpdated、LiquidateUnsafeCDP、LiquidateUnsafeCDP |
| dex        | ProvisioningToEnabled、AddLiquidity、RemoveLiquidity、Swap、ListProvision、ProvisioningToEnabled、AddProvision                                                                                                        |
| incentives | DepositDexShare、WithdrawDexShare、PayoutRewards、ClaimRewards                                                                                                                                                        |
| homaLite   | Minted、RedeemRequestCancelled、RedeemRequested、Redeemed                                                                                                                                                             |
| homa       | Minted、RequestedRedeem、RedeemRequestCancelled、RedeemedByFastMatch、RedeemedByUnbond                                                                                                                                |

## 2. Acala-tokens

-   1.1 Github page:

    > https://github.com/AcalaNetwork/acala-tokens-subql

-   1.2 Graphql workground:

| Chain  | Link                                                                  |
| ------ | --------------------------------------------------------------------- |
| Acala  | https://project.subquery.network/project/AcalaNetwork/acala-tokens-ipfs  |
| Karura | https://project.subquery.network/project/AcalaNetwork/karura-tokens-ipfs |

-   1.3 includes:

| Extrinsic  | events                                                                        |
| ---------- | ----------------------------------------------------------------------------- |
| balances   | DustLost、Transfer、Reserved、Unreserved、ReserveRepatriated、Deposit、Withdraw |
| tokens | Transfer、 Reserved、 Unreserved、ReserveRepatriated、Deposited、Withdrawn、Slashed |

## 3. Acala-loans

-   1.1 Github page:

    > https://github.com/AcalaNetwork/acala-loan-subql

-   1.2 Graphql workground:

| Chain  | Link                                                                |
| ------ | ------------------------------------------------------------------- |
| Acala  | https://project.subquery.network/project/AcalaNetwork/acala-loans   |
| Karura | https://explorer.subquery.network/subquery/AcalaNetwork/karura-loan |

-   1.3 includes:

| Extrinsic | events                                                               |
| --------- | ---------------------------------------------------------------------|
| cdpEngine | InterestRatePerSecUpdated、LiquidationRatioUpdated、LiquidationPenaltyUpdated、RequiredCollateralRatioUpdated、MaximumTotalDebitValueUpdated、LiquidateUnsafeCDP、CloseCDPInDebitByDEX |
| loans     | PositionUpdated、ConfiscateCollateralAndDebit、TransferLoan          ｜


## 4. Acala-homa

-   1.1 Github page:

    > https://github.com/AcalaNetwork/acala-homa-subql

-   1.2 Graphql workground:

| Chain  | Link |
| ------ | ---- |
| Acala  | https://project.subquery.network/project/AcalaNetwork/acala-homa    |
| Karura | https://explorer.subquery.network/subquery/AcalaNetwork/karura-homa |

-   1.3 includes:

| Extrinsic | events                                                                                                 |
| --------- | ----------------|
| homa      | Minted、RequestedCancelled、RedeemedByFastMatch、RedeemedByUnbond |
| homaLite      | Minted、RequestedRedeem、RequestedCancelled、RedeemRequested、Redeemed、 |

## 5. Acala-dex

-   1.1 Github page:

    > https://github.com/AcalaNetwork/acala-dex-subql

-   1.2 Graphql workground:

| Chain  | Link |
| ------ | ---- |
| Acala  | https://explorer.subquery.network/subquery/AcalaNetwork/acala-dex |
| Karura | https://explorer.subquery.network/subquery/AcalaNetwork/karura-dex |

-   1.3 includes:

| Extrinsic | events     |
| --------- | --------------------------------------------------------------------- |
| dex      | ProvisioningToEnabled、AddLiquidity、RemoveLiquidity、Swap、ListProvisioning、AddProvision |

## 6. Acala-incentives

-   1.1 Github page:

    > https://github.com/AcalaNetwork/acala-incentives-subql

-   1.2 Graphql workground:

| Chain  | Link |
| ------ | ---- |
| Acala  | https://api.subquery.network/sq/AcalaNetwork/acala-incentives |
| Karura | https://api.subquery.network/sq/AcalaNetwork/karura-incentives |

-   1.3 includes:

| Extrinsic | events                                       |
| --------- | ----------------------------------------- |
| incentives      | DepositDexShare、WithdrawDexShare、PayoutRewards、ClaimRewards |

## 7. Acala-transfer

-   1.1 Github page:

    > https://github.com/AcalaNetwork/acala-transfer-subql

-   1.2 Graphql workground:

| Chain  | Link |
| ------ | ---- |
| Acala  | https://api.subquery.network/sq/AcalaNetwork/acala-transfer |
| Karura | https://api.subquery.network/sq/AcalaNetwork/karura-transfer |

-   1.3 includes:

| Extrinsic | events                                       |
| --------- | ----------------------------------------- |
| balances  | Transfer、Transferred |
