import { SubstrateEvent } from "@subql/types/dist/interfaces";
import { ClaimRewards, LoyaltyBonusPool, LoyaltyBonusReward, UserPool } from "../types";
import { forceToCurrencyName } from '@acala-network/sdk-core';

export const handleClaimRewards = async (event: SubstrateEvent) => {
 /**
  * ClaimRewards Event Structure
  *  who: T::AccountId,
  *  pool: PoolId,
  *  reward_currency_id: CurrencyId,
  *  actual_amount: Balance,
  *  deduction_amount: Balance,
  **/
  const index = event.idx.toString();
  const timestamp = event.block.timestamp;
  const blockNumber = BigInt(event.block.block.header.number.toNumber());
  const { event: { data: [who, pool, reward_currency_id, actual_amount, deduction_amount] } } = event;
  const poolId = pool.toHex();

  let loyaltyBonusPool = await LoyaltyBonusPool.get(poolId);

  if (!loyaltyBonusPool) {
    loyaltyBonusPool = new LoyaltyBonusPool(poolId, timestamp, BigInt(blockNumber));
  }

  // get reward token id
  const rewardToken = forceToCurrencyName(reward_currency_id);
  const deductionAmount = BigInt(deduction_amount.toString() || 0); 

  // get loyalty bonus reward entity
  let loyaltyBonusReward = await LoyaltyBonusReward.get(`${poolId}-${rewardToken}`);

  if (!loyaltyBonusReward) {
    loyaltyBonusReward = new LoyaltyBonusReward(
      `${poolId}-${rewardToken}`,
      poolId,
      rewardToken,
      BigInt(0),
      timestamp,
      blockNumber
    );
  }

  // update loyalty bonus reward entity
  loyaltyBonusReward.amount = loyaltyBonusReward.amount + deductionAmount;

  // update timestamp and block number
  loyaltyBonusPool.timestamp = timestamp;
  loyaltyBonusPool.updatedAt = blockNumber;
  loyaltyBonusReward.timestamp = timestamp;
  loyaltyBonusReward.updatedAt = blockNumber;

  // get claim rewards entity
  const claimRewardsEntity = await ClaimRewards.get(`${blockNumber}-${index}`);

  // save claim rewards event
  claimRewardsEntity.address = who.toString();
  claimRewardsEntity.token = rewardToken;
  claimRewardsEntity.poolId = poolId;
  claimRewardsEntity.actualAmount = BigInt(actual_amount.toString() || 0);
  claimRewardsEntity.deductionAmount = deductionAmount;
  claimRewardsEntity.block = blockNumber;
  claimRewardsEntity.timestamp = timestamp;
  claimRewardsEntity.extrinsic = event.extrinsic?.extrinsic.hash.toString() || '';

  //save pool entity
  await loyaltyBonusPool.save();
  await loyaltyBonusReward.save();
  await claimRewardsEntity.save();
}
