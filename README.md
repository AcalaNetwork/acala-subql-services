# Acala Subql

a collection of acala/karura sub-query services.

## 1. Acala-subql

  - 1.1 Github page: 
    > https://github.com/AcalaNetwork/acala-subql

  - 1.2 Graphql workground:

  |  Chain   | Link  |
  |  ----  | ----  |
  | Acala | https://explorer.subquery.network/subquery/AcalaNetwork/acala |
  | Karura | https://explorer.subquery.network/subquery/AcalaNetwork/karura |
  
  - 1.3 includes: 

  |  Extrinsic   | events  |
  |  ----  | ----  |
  | currencies  | Transferred |
  | nft  | TransferredToken、BurnedToken、BurnedTokenWithRemark |
  | loans | PositionUpdated、PositionUpdated、ConfiscateCollateralAndDebit、transferLoan |
  |cdpEngine| InterestRatePerSecUpdated、LiquidationRatioUpdated、LiquidationPenaltyUpdated、RequiredCollateralRatioUpdated、MaximumTotalDebitValueUpdated、GlobalInterestRatePerSecUpdated、LiquidateUnsafeCDP、LiquidateUnsafeCDP|
  |dex|ProvisioningToEnabled、AddLiquidity、RemoveLiquidity、Swap、ListProvision、ProvisioningToEnabled、AddProvision|
  |incentives|DepositDexShare、WithdrawDexShare、PayoutRewards、ClaimRewards|
  |homaLite|Minted、RedeemRequestCancelled、RedeemRequested、Redeemed|
  |homa|Minted、RequestedRedeem、RedeemRequestCancelled、RedeemedByFastMatch、RedeemedByUnbond|


## 2. Acala-tokens
  - 1.1 Github page: 
    > https://github.com/AcalaNetwork/acala-tokens-subql

  - 1.2 Graphql workground:

  |  Chain   | Link  |
  |  ----  | ----  |
  | Acala | https://explorer.subquery.network/subquery/AcalaNetwork/acala-tokens |
  | Karura | https://explorer.subquery.network/subquery/AcalaNetwork/karura-tokens |
  
  - 1.3 includes: 

  |  Extrinsic   | events  |
  |  ----  | ----  |
  | treasury | Deposit |
  | balances  | Transfer、Reserved、Unreserved、ReserveRepatriated |
  | currencies | Transferred、 Deposited、 Withdrawn、DustSwept、BalanceUpdated ｜


## 3. Acala-loans

  - 1.1 Github page: 
    > https://github.com/AcalaNetwork/acala-loan-subql
  
  - 1.2 Graphql workground:

  |  Chain   | Link  |
  |  ----  | ----  |
  | Acala | ---- |
  | Karura | https://explorer.subquery.network/subquery/AcalaNetwork/karura-loan |
  
  - 1.3 includes: 

  |  Extrinsic   | events  |
  |  ----  | ----  |
  | cdpEngine | InterestRatePerSecUpdated、LiquidationRatioUpdated、LiquidationPenaltyUpdated、RequiredCollateralRatioUpdated、MaximumTotalDebitValueUpdated、LiquidateUnsafeCDP、CloseCDPInDebitByDEX |
  | loans | PositionUpdated、ConfiscateCollateralAndDebit、TransferLoan ｜

## 4. Acala-vesting

  - 1.1 Github page: 
    > https://github.com/AcalaNetwork/acala-vesting-subql
  
  - 1.2 Graphql workground:

  |  Chain   | Link  |
  |  ----  | ----  |
  | Acala | ---- |
  | Karura | https://explorer.subquery.network/subquery/AcalaNetwork/acala-vesting |
  
  - 1.3 includes: 

  |  Extrinsic   | events  |
  |  ----  | ----  |
  | vesting | VestingSchedulesUpdated、Claimed、VestingScheduleAdded |


## 5. Acala-homa

  - 1.1 Github page: 
    > https://github.com/AcalaNetwork/acala-vesting-subql
  
  - 1.2 Graphql workground:

  |  Chain   | Link  |
  |  ----  | ----  |
  | Acala | ---- |
  | Karura | ---- |
  
  - 1.3 includes: 

  |  Extrinsic   | events  |
  |  ----  | ----  |
  | homa | Minted、RequestedRedeem、RequestedCancelled、RedeemedByFastMatch、RedeemedByUnbond、WithdrawRedemption |
