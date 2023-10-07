import { SubstrateEvent } from "@subql/types";
import { Withdrawn } from "../types";

export const handleWithdrawn = async (event: SubstrateEvent) => {
  /**
   * 	Withdrawn {
      who: T::AccountId,
      amount: Balance,
    },
   */
  logger.info('start handleWithdrawn');
  const index = event.idx.toString();
  const timestamp = event.block.timestamp;
  const blockNumber = BigInt(event.block.block.header.number.toNumber());
  const { event: { data: [who, amount] } } = event;

  const address = who.toString();
  const amountBN = BigInt(amount.toString());

  // save withdrawn entity
  const withdrawnEntity = await Withdrawn.create({
    id: `${blockNumber}-${index}`,
    address: address,
    amount: amountBN,
    block: blockNumber,
    timestamp: timestamp,
    extrinsic: event.extrinsic?.extrinsic.hash.toString() || '',
  });

  // save entities
  await withdrawnEntity.save();
};