import { AcalaEvmEvent, AcalaEvmCall } from '@subql/acala-evm-processor';
import { NewPoolEvent, RewardsDeductionRateSetEvent, RewardRuleUpdateEvent, StakeEvent, UnstakeEvent, ClaimRewardEvent, LSTPoolConvertedEvent } from '../types/contracts/LsdAbi';
import { Pool, Shares, RewardRule, ClaimedReward, RewardSupply, NewPoolRecord, RewardsDeductionRateSetRecord, RewardRuleUpdateRecord, StakeRecord, UnstakeRecord, ClaimRewardRecord, LSTPoolConvertedRecord } from '../types';

export async function handleNewPool(
  event: AcalaEvmEvent<NewPoolEvent['args']>
): Promise<void> {

  const [poolId, shareType] = event.args;
  logger.info('NewPoolEvent: {}', [poolId, shareType]);

  const poolEntity = new Pool(poolId.toString());
  poolEntity.shareType = shareType.toString();
  poolEntity.totalShare = BigInt(0);
  await poolEntity.save();

  const newPoolRecordEntity = new NewPoolRecord(`${event.transactionHash}-${event.logIndex}`, event.blockTimestamp, event.from, poolId.toBigInt(), shareType.toString());
  await newPoolRecordEntity.save();
}

export async function handleRewardsDeductionRateSet(
  event: AcalaEvmEvent<RewardsDeductionRateSetEvent['args']>
): Promise<void> {

  const [poolId, rate] = event.args;
  logger.info('RewardsDeductionRateSet: {}', [poolId, rate]);

  const poolEntity = await Pool.get(poolId.toString());
  poolEntity.rewardsDeductionRate = rate.toBigInt();
  await poolEntity.save();

  const rewardsDeductionRateSetRecordEntity = new RewardsDeductionRateSetRecord(`${event.transactionHash}-${event.logIndex}`, event.blockTimestamp, event.from, poolId.toBigInt(), rate.toBigInt());
  await rewardsDeductionRateSetRecordEntity.save();
}

export async function handleRewardRuleUpdate(
  event: AcalaEvmEvent<RewardRuleUpdateEvent['args']>
): Promise<void> {

  const [poolId, rewardType, rewardRate, endTime] = event.args;
  logger.info('RewardRuleUpdate: {}', [poolId, rewardType, rewardRate, endTime]);

  const id = `${poolId.toString()}-${rewardType.toString()}`;
  let rewardRuleEntity = await RewardRule.get(id);
  if (rewardRuleEntity === undefined) {
    rewardRuleEntity = new RewardRule(id, poolId.toBigInt(), rewardType.toString());
    rewardRuleEntity.rewardRate = BigInt(0);
    rewardRuleEntity.endTime = BigInt(0);
  }

  let rewardSupplyEntity = await RewardSupply.get(id);
  if (rewardSupplyEntity === undefined) {
    rewardSupplyEntity = new RewardSupply(id);
    rewardSupplyEntity.amount = BigInt(0);
  }

  const now = BigInt(Math.floor(event.blockTimestamp.getTime() / 1000));
  const remain = rewardRuleEntity.endTime > now ? (rewardRuleEntity.endTime - now) * rewardRuleEntity.rewardRate : BigInt(0);

  rewardRuleEntity.rewardRate = rewardRate.toBigInt();
  rewardRuleEntity.endTime = endTime.toBigInt();


  const added = rewardRuleEntity.rewardRate * (rewardRuleEntity.endTime - now) - remain;
  if (added > BigInt(0)) {
    rewardSupplyEntity.amount = rewardSupplyEntity.amount + remain;
  }

  await rewardRuleEntity.save();
  await rewardSupplyEntity.save();

  const rewardRuleUpdateRecordEntity = new RewardRuleUpdateRecord(`${event.transactionHash}-${event.logIndex}`, event.blockTimestamp, event.from, poolId.toBigInt(), rewardType.toString(), rewardRate.toBigInt(), endTime.toBigInt());
  await rewardRuleUpdateRecordEntity.save();
}

export async function handleStake(
  event: AcalaEvmEvent<StakeEvent['args']>
): Promise<void> {

  const [sender, poolId, amount] = event.args;
  logger.info('Stake: {}', [sender, poolId, amount]);

  const poolEntity = await Pool.get(poolId.toString());
  poolEntity.totalShare = poolEntity.totalShare + amount.toBigInt();
  await poolEntity.save();

  const shareId = `${poolId}-${sender}`;
  let sharesEntity = await Shares.get(shareId);
  if (sharesEntity === undefined) {
    sharesEntity = new Shares(shareId, poolId.toBigInt(), sender.toString());
    sharesEntity.stakedAmount = BigInt(0);
  }

  sharesEntity.stakedAmount = sharesEntity.stakedAmount + amount.toBigInt();
  await sharesEntity.save();


  const stakeRecordEntity = new StakeRecord(`${event.transactionHash}-${event.logIndex}`, event.blockTimestamp, event.from, sender.toString(), poolId.toBigInt(), amount.toBigInt());
  await stakeRecordEntity.save();

  logger.info('Stake: success');
}

export async function handleStakeCall (
  event: AcalaEvmCall<any>
) {
  logger.info(`StakeCall: ${event.success}`)
  logger.info(JSON.stringify(event.args.events))
}

export async function handleUnstake(
  event: AcalaEvmEvent<UnstakeEvent['args']>
): Promise<void> {

  const [sender, poolId, amount] = event.args;
  logger.info('Unstake: {}', [sender, poolId, amount]);

  const poolEntity = await Pool.get(poolId.toString());
  poolEntity.totalShare = poolEntity.totalShare - amount.toBigInt();
  await poolEntity.save();

  const shareId = `${poolId}-${sender}`;
  let sharesEntity = await Shares.get(shareId);
  if (sharesEntity === undefined) {
    sharesEntity = new Shares(shareId, poolId.toBigInt(), sender.toString());
    sharesEntity.stakedAmount = BigInt(0);
  }
  sharesEntity.stakedAmount = sharesEntity.stakedAmount - amount.toBigInt();
  await sharesEntity.save();

  const unstakeRecordEntity = new UnstakeRecord(`${event.transactionHash}-${event.logIndex}`, event.blockTimestamp, event.from, sender.toString(), poolId.toBigInt(), amount.toBigInt());
  await unstakeRecordEntity.save();
}

export async function handleClaimReward(
  event: AcalaEvmEvent<ClaimRewardEvent['args']>
): Promise<void> {

  const [sender, poolId, rewardType, amount] = event.args;
  logger.info('ClaimReward: {}', [sender, poolId, rewardType, amount]);

  const claimedRewardEntity = await ClaimedReward.get(rewardType.toString());
  claimedRewardEntity.totalAmount = claimedRewardEntity.totalAmount + amount.toBigInt();
  await claimedRewardEntity.save();

  const claimRewardRecordEntity = new ClaimRewardRecord(`${event.transactionHash}-${event.logIndex}`, event.blockTimestamp, event.from, sender.toString(), poolId.toBigInt(), rewardType.toString(), amount.toBigInt());
  await claimRewardRecordEntity.save();
}

export async function handleLSTPoolConverted(
  event: AcalaEvmEvent<LSTPoolConvertedEvent['args']>
): Promise<void> {

  const [poolId, beforeShareType, afterShareType, beforeShareTokenAmount, afterShareTokenAmount] = event.args;
  logger.info('LSTPoolConverted: {}', [poolId, beforeShareType, afterShareType, beforeShareTokenAmount, afterShareTokenAmount]);

  const poolIdEntity = await Pool.get(poolId.toString());
  poolIdEntity.convertedType = afterShareType.toString();
  poolIdEntity.convertedExchangeRate = afterShareTokenAmount.toBigInt() * BigInt(10 ** 18) / beforeShareTokenAmount.toBigInt();
  await poolIdEntity.save();

  const lsdPoolConvertedRecordEntity = new LSTPoolConvertedRecord(`${event.transactionHash}-${event.logIndex}`, event.blockTimestamp, event.from, poolId.toBigInt(), beforeShareType.toString(), afterShareType.toString(), beforeShareTokenAmount.toBigInt(), afterShareTokenAmount.toBigInt());
  await lsdPoolConvertedRecordEntity.save();
}