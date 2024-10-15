import { TransferTransaction } from "../types/abi-interfaces/Erc20";
import { Transfer } from "../types";
import assert from "assert";
import { getToken } from "./token";

export async function handleTransfer(call: TransferTransaction) {
  assert(call.logs, "call.logs is null");
  assert(call.to, "call.to is null");
  assert(call.from, "call.from is null");
  assert(call.args, "call.args is null");

  const receipt = await call.receipt();
  const success = receipt.status;
  const address = call.to;
  let token = await getToken(address);

  const transfer = new Transfer(
    call.hash,
    BigInt(call.blockNumber),
    token.id,
    call.from,
    call.args[0],
    BigInt(call.args[1].toString()),
    new Date(Number(call.blockTimestamp) * 1000),
    success
  );

  await transfer.save();
}
