import { SubstrateEvent } from "@subql/types";
import { getPoolEntity, getUserPoolEntity } from "../utils";
import { Rebonded } from "../types";

export async function handleRebonded(event: SubstrateEvent) {
  logger.info('start handleRebonded');
  const index = event.idx.toString();
  const timestamp = event.block.timestamp;
  const blockNumber = BigInt(event.block.block.header.number.toNumber());

  /**
   * Rebonded { who: T::AccountId, amount: Balance, }
   */
  const { event: { data: [who, amount] } } = event;

  const address = who.toString();
  const amountBN = BigInt(amount.toString());

  // get user entity
  const userEntity = await getUserPoolEntity(address);

  // update user entity
  userEntity.share = userEntity.share + amountBN;
  userEntity.updatedAt = blockNumber;
  userEntity.timestamp = timestamp;

  // get pool entity
  const poolEntity = await getPoolEntity('aca-earning');

  poolEntity.totalShares = poolEntity.totalShares + amountBN;
  poolEntity.updatedAt = blockNumber;
  poolEntity.timestamp = timestamp;

  // save rebonded event
  const rebondedEntity = await Rebonded.create({
    id: `${blockNumber}-${index}`,
    address: address,
    amount: amountBN,
    block: blockNumber,
    timestamp: timestamp,
    extrinsic: event.extrinsic?.extrinsic.hash.toString() || '',
  });

  // save entities
  await userEntity.save();
  await poolEntity.save();
  await rebondedEntity.save();

  logger.info('end handleRebonded');
}