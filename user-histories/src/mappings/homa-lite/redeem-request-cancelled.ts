import { SubstrateEvent } from "@subql/types";
import { createRecord } from "../record";
import { checkAndGetAccount } from "../account";
import { checkAndGetBlock } from "../block";
import { HomaLiteRedeemRequestCancelled } from "../../types";

export async function handleHomaLiteRedeemRequestCancelled(event: SubstrateEvent) {
  logger.info(`New homa-lite redeem request cancelled event found at block ${event.block.block.header.number.toString()}`);
  const block = await checkAndGetBlock(event.block);
  const [address, cancelled_liquid_amount] = event.event.data as unknown as [any, any];
  const account = await checkAndGetAccount(address.toString(), block.number);
  const record = await createRecord(event, account.id, 'homaLite.RedeemRequestCancelled');

  const redeemRequestCancelled = HomaLiteRedeemRequestCancelled.create({
    id: `${block.number}-${event.idx.toString()}`,
    accountId: account.id,
    amount: BigInt(cancelled_liquid_amount.toString()),
    recordId: record.id,
    blockId: block.id,
    timestamp: block.timestamp,
    extrinsic: event.extrinsic?.extrinsic.hash.toString(),
  });

  await block.save();
  await account.save();
  await record.save();
  await redeemRequestCancelled.save();
}