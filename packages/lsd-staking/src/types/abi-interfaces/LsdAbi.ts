// SPDX-License-Identifier: Apache-2.0

// Auto-generated , DO NOT EDIT
import {EthereumLog, EthereumTransaction} from "@subql/types-ethereum";

import {

  ClaimRewardEvent,

  InitializedEvent,

  LSTPoolConvertedEvent,

  NewPoolEvent,

  OperationPauseStatusSetEvent,

  OwnershipTransferredEvent,

  PausedEvent,

  RewardRuleUpdateEvent,

  RewardsDeductionRateSetEvent,

  StakeEvent,

  UnpausedEvent,

  UnstakeEvent,

  LsdAbi
} from '../contracts/LsdAbi'


  export type ClaimRewardLog = EthereumLog<ClaimRewardEvent["args"]>

  export type InitializedLog = EthereumLog<InitializedEvent["args"]>

  export type LSTPoolConvertedLog = EthereumLog<LSTPoolConvertedEvent["args"]>

  export type NewPoolLog = EthereumLog<NewPoolEvent["args"]>

  export type OperationPauseStatusSetLog = EthereumLog<OperationPauseStatusSetEvent["args"]>

  export type OwnershipTransferredLog = EthereumLog<OwnershipTransferredEvent["args"]>

  export type PausedLog = EthereumLog<PausedEvent["args"]>

  export type RewardRuleUpdateLog = EthereumLog<RewardRuleUpdateEvent["args"]>

  export type RewardsDeductionRateSetLog = EthereumLog<RewardsDeductionRateSetEvent["args"]>

  export type StakeLog = EthereumLog<StakeEvent["args"]>

  export type UnpausedLog = EthereumLog<UnpausedEvent["args"]>

  export type UnstakeLog = EthereumLog<UnstakeEvent["args"]>


  export type DOTTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['DOT']>>

  export type HOMATransaction = EthereumTransaction<Parameters<LsdAbi['functions']['HOMA']>>

  export type HOMA_MINT_THRESHOLDTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['HOMA_MINT_THRESHOLD']>>

  export type LCDOTTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['LCDOT']>>

  export type LDOTTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['LDOT']>>

  export type LIQUID_CROWDLOANTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['LIQUID_CROWDLOAN']>>

  export type MAX_REWARD_TYPESTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['MAX_REWARD_TYPES']>>

  export type STABLE_ASSETTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['STABLE_ASSET']>>

  export type TDOTTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['TDOT']>>

  export type WTDOTTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['WTDOT']>>

  export type AddPoolTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['addPool']>>

  export type ClaimRewardsTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['claimRewards']>>

  export type ConvertInfosTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['convertInfos']>>

  export type ConvertLSTPoolTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['convertLSTPool']>>

  export type EarnedTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['earned']>>

  export type ExitTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['exit']>>

  export type Initialize__Transaction = EthereumTransaction<Parameters<LsdAbi['functions']['initialize()']>>

  export type Initialize_address_address_address_address_address_address_address_address_Transaction = EthereumTransaction<Parameters<LsdAbi['functions']['initialize(address,address,address,address,address,address,address,address)']>>

  export type LastTimeRewardApplicableTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['lastTimeRewardApplicable']>>

  export type OwnerTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['owner']>>

  export type PaidAccumulatedRatesTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['paidAccumulatedRates']>>

  export type PauseTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['pause']>>

  export type PausedTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['paused']>>

  export type PausedPoolOperationsTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['pausedPoolOperations']>>

  export type PoolIndexTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['poolIndex']>>

  export type RenounceOwnershipTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['renounceOwnership']>>

  export type RewardPerShareTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['rewardPerShare']>>

  export type RewardRulesTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['rewardRules']>>

  export type RewardTypesTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['rewardTypes']>>

  export type RewardsTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['rewards']>>

  export type RewardsDeductionRatesTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['rewardsDeductionRates']>>

  export type SetPoolOperationPauseTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['setPoolOperationPause']>>

  export type SetRewardsDeductionRateTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['setRewardsDeductionRate']>>

  export type ShareTypesTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['shareTypes']>>

  export type SharesTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['shares']>>

  export type StakeTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['stake']>>

  export type TotalSharesTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['totalShares']>>

  export type TransferOwnershipTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['transferOwnership']>>

  export type UnpauseTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['unpause']>>

  export type UnstakeTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['unstake']>>

  export type UpdateRewardRuleTransaction = EthereumTransaction<Parameters<LsdAbi['functions']['updateRewardRule']>>



