import { SubstrateEvent } from "@subql/types";
import { checkAndGetBlock } from "../block";
import { checkAndGetAccount } from "../account";
import { HomaLiteRedeemed } from "../../types";
import { createRecord } from "../record";

export async function handleHomaLiteRedeemed(event: SubstrateEvent): Promise<void> {
  logger.info(`New homa-lite redeemed event found at block ${event.block.block.header.number.toString()}`);
  const block = await checkAndGetBlock(event.block);

  const [address, staking_amount_redeemed, liquid_amount_deducted] = event.event.data as unknown as [any, any, any];
  const account = await checkAndGetAccount(address.toString(), block.number);
  const record = await createRecord(event, account.id, 'homaLite.Redeemed');

  const redeemed = HomaLiteRedeemed.create({
    id: `${block.number}-${event.idx.toString()}`,
    accountId: account.id,
    redeemed: BigInt(staking_amount_redeemed.toString()),
    deducted: BigInt(liquid_amount_deducted.toString()),
    recordId: record.id,
    blockId: block.id,
    timestamp: block.timestamp,
    extrinsic: event.extrinsic?.extrinsic.hash.toString(),
  });

  await block.save();
  await account.save();
  await record.save();
  await redeemed.save();
}