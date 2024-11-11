import assert from "assert";
import { TransferLog } from "../types/abi-interfaces/Erc20";
import { getToken } from "./token";
import { TransferEvent } from "../types";

export async function handleTransferEvent(event: TransferLog) {
  assert(event.address, "event.address is null");
  // assert(event.args, "event.args is null");
  if (!event.args) return;

  const address = event.address;
  const token = await getToken(address);

  const transferEvent = new TransferEvent(
    `${event.transactionHash}-${event.logIndex}`,
    BigInt(event.block.number),
    token.id,
    event.args.from,
    event.args.to,
    BigInt(event.args.value.toString()),
    event.transactionHash,
    new Date(Number(event.block.timestamp) * 1000)
  );

  await transferEvent.save();
}

