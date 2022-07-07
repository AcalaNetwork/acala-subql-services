# Acala Subql

a collection of acala/karura sub-query services.

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
