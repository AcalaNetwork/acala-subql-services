import { SubstrateEvent } from "@subql/types";
import { getPoolEntity, getUserPoolEntity } from "../utils";
import { Unbonded } from "../types";

export async function handleUnbonded (event: SubstrateEvent) {
  const index = event.idx.toString();
  const timestamp = event.block.timestamp;
  const blockNumber = BigInt(event.block.block.header.number.toNumber());

  /**
   * Unbonded { who: T::AccountId, amount: Balance, }
   */
  const { event: { data: [who, amount] } } = event;

  const address = who.toString();
  const amountBN = BigInt(amount.toString());

  // get user entity
  const userEntity = await getUserPoolEntity(address);

  // update user entity
  userEntity.share = userEntity.share - amountBN;
  userEntity.updatedAt = blockNumber;
  userEntity.timestamp = timestamp;

  // get pool entity
  const poolEntity = await getPoolEntity('aca-earning');

  poolEntity.totalShares = poolEntity.totalShares - amountBN;
  poolEntity.updatedAt = blockNumber;
  poolEntity.timestamp = timestamp;

  // get unbonded entity
  const unbondedEntity = await Unbonded.get(`${blockNumber}-${index}`);

  // save unbonded event
  unbondedEntity.address = address;
  unbondedEntity.amount = amountBN;
  unbondedEntity.block = blockNumber;
  unbondedEntity.timestamp = timestamp;
  unbondedEntity.extrinsic = event.extrinsic?.extrinsic.hash.toString() || '';

  await userEntity.save();
  await poolEntity.save();
  await unbondedEntity.save();
}