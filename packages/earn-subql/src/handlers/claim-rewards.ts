import { SubstrateEvent } from "@subql/types/dist/interfaces";
import { LoyaltyBonusPool, Reward } from "../types";
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

  const timestamp = event.block.timestamp;
  const blockNumber = event.block.block.header.number.toNumber();
  const { event: { data: [who, pool, reward_currency_id, actual_amount, deduction_amount] } } = event;
  const poolId = pool.toHex();
  // get total share
  const poolInfo = await api.query.rewards.poolInfos(pool);
  const totalShare = (poolInfo as any).totalShares.toString();
  // get user share
  const userInfo = await api.query.rewards.sharesAndWithdrawnRewards(pool, who);
  const userShare = (userInfo as any)?.[0]?.toString();
  // modify total_share, actural_amount, deduction_amount, user_share to bigint
  const totalShareBigInt = BigInt(totalShare);
  const userShareBigInt = BigInt(userShare);
  const actualAmountBigInt = BigInt(actual_amount.toString());
  const deductionAmountBigInt = BigInt(deduction_amount.toString());
  // get total reward amount in current event
  const totalRewardAmount = actualAmountBigInt * deductionAmountBigInt;
  // get user withdraw reward amount form loyalty bonus pool
  const userWithdrawRewardAmount = totalRewardAmount * userShareBigInt / totalShareBigInt;

  let poolEntity = await LoyaltyBonusPool.get(poolId);

  if (!poolEntity) {
    poolEntity = new LoyaltyBonusPool(poolId, [] as any, timestamp, BigInt(blockNumber));
  }

  // update pool rewards
  // get reward token id
  const rewardTokenId = forceToCurrencyName(reward_currency_id);
  const deductionAmount = BigInt(deduction_amount.toString()); 

  // if decuctionAmount is not zero
  if (deductionAmount > BigInt(0)) {
    // get current reward field
    const currentRewardIndex = poolEntity.rewards.findIndex((reward) => reward.token === rewardTokenId);
    const prevRewardAmount = currentRewardIndex === -1 ? BigInt(0) : poolEntity.rewards[currentRewardIndex].amount;
    const currentRewardAmount = prevRewardAmount - userWithdrawRewardAmount + deductionAmount;

    // if currentRewardIndex is -1, push new reward
    if (currentRewardIndex === -1) {
      poolEntity.rewards.push({ token: rewardTokenId, amount: currentRewardAmount });
    } else {
      // update reward amount
      poolEntity.rewards[currentRewardIndex].amount = currentRewardAmount;
    }
  }


  // update timestamp and updatedAt fields
  poolEntity.timestamp = timestamp;
  poolEntity.updatedAt = BigInt(blockNumber);

  //save pool entity
  await poolEntity.save();
}
