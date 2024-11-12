import { SubstrateEvent } from "@subql/types";
import { checkAndGetBlock } from "../block";
import { checkAndGetAccount } from "../account";
import { HomaLiteMint } from "../../types";
import { createRecord } from "../record";

export async function handleHomaLiteMinted(event: SubstrateEvent) {
  logger.info(`New homa-lite minted event found at block ${event.block.block.header.number.toString()}`);
  const block = await checkAndGetBlock(event.block);

  const [address, staked, minted] = event.event.data as unknown as [any, any, any];
  const account = await checkAndGetAccount(address.toString(), block.number);
  const record = await createRecord(event, account.id, 'homaLite.Minted');

  const mint = HomaLiteMint.create({
    id: `${block.number}-${event.idx.toString()}`,
    accountId: account.id,
    timestamp: block.timestamp,
    staked: BigInt(staked.toString()),
    minted: BigInt(minted.toString()),
    recordId: record.id,
    blockId: block.id,
    extrinsic: event.extrinsic?.extrinsic.hash.toString(),
  });

  await block.save();
  await account.save();
  await record.save();
  await mint.save();
}
