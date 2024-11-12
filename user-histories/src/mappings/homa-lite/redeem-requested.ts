import { SubstrateEvent } from "@subql/types";
import { checkAndGetBlock } from "../block";
import { checkAndGetAccount } from "../account";
import { createRecord } from "../record";
import { HomaLiteRedeemRequested } from "../../types";

export async function handleHomaLiteRedeemRequested(event: SubstrateEvent) {
  logger.info(`New homa-lite redeem requested event found at block ${event.block.block.header.number.toString()}`);
  const block = await checkAndGetBlock(event.block);

  const [address, liquid_amount, extra_fee] = event.event.data as unknown as [any, any, any];
  const account = await checkAndGetAccount(address.toString(), block.number);
  const record = await createRecord(event, account.id, 'homaLite.RedeemRequested');

  const redeemRequested = HomaLiteRedeemRequested.create({
    id: `${block.number}-${event.idx.toString()}`,
    accountId: account.id,
    amount: BigInt(liquid_amount.toString()),
    extraFee: BigInt(extra_fee.toString()),
    recordId: record.id,
    blockId: block.id,
    timestamp: block.timestamp,
    extrinsic: event.extrinsic?.extrinsic.hash.toString(),
  });

  await block.save();
  await account.save();
  await record.save();
  await redeemRequested.save();
}