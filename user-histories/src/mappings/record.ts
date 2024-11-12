import { SubstrateEvent } from "@subql/types";
import { checkAndGetBlock } from "./block";
import { Record } from "../types";

export async function createRecord(
  event: SubstrateEvent,
  accountId: string,
  type: string
) {
  const block = await checkAndGetBlock(event.block);

  const record = Record.create({
    id: `${block.number}-${event.idx.toString()}`,
    accountId: accountId,
    timestamp: block.timestamp,
    type: type,
  });

  return record;
}

