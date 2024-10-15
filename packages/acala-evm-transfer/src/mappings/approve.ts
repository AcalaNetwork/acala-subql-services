import assert from "assert";
import { ApproveTransaction } from "../types/abi-interfaces/Erc20";
import { getToken } from "./token";
import { Approve } from "../types";

export async function handleApprove(call: ApproveTransaction) {
  assert(call.args, "call.args is null");
  assert(call.to, "call.to is null");

  const receipt = await call.receipt();
  const success = receipt.status;
  const address = call.to;
  const token = await getToken(address);

  const approve = new Approve(
    call.hash,
    BigInt(call.blockNumber),
    call.from,
    call.args[0],
    BigInt(call.args[1].toString()),
    token.id,
    new Date(Number(call.blockTimestamp) * 1000),
    success
  );

  await approve.save();
}
