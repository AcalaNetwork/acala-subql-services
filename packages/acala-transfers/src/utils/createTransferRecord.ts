import { SubstrateEvent } from "@subql/types";
import { getAccount, getToken, getTransfer } from "./record";
import { getDateEndOfHour, getDateEndOfDay } from "@acala-subql/utils";

export async function createTransfer (
  fromId: string,
  toId: string,
  tokenName: string,
  amount: bigint,
  event: SubstrateEvent
) {
  const txHash = event.extrinsic.extrinsic.hash;
  const idx = event.idx;
  const block = event.block;
  const extrinsic = event.extrinsic;
  const fromAccount = await getAccount(fromId);
  const toAccount = await getAccount(toId);
  const tokenRecord = await getToken(tokenName);
  const transfer = await getTransfer(`${txHash}-${idx}`);
  const dateEndOfDay = getDateEndOfDay(block.timestamp);
  const dateEndOfHour = getDateEndOfHour(block.timestamp);

  transfer.fromId = fromAccount.id;
  transfer.toId = toAccount.id;
  transfer.amount = amount;
  transfer.tokenId = tokenRecord.id;

  transfer.atBlock = block.block.header.number.toBigInt();
  transfer.atBlockHash = block.block.hash.toString();
  transfer.atExtrinsicHash = extrinsic.extrinsic.hash.toString();
  transfer.timestamp = block.timestamp;

  tokenRecord.transferCount = tokenRecord.transferCount + 1;
  // only increase the from account transfer count
  fromAccount.transferCount = fromAccount.transferCount + 1;

  await fromAccount.save();
  await toAccount.save();
  await tokenRecord.save();
  await transfer.save();

  // update all report data
}
