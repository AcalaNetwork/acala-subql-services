import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRequestedRedeem } from "../utils/record";
import { getBlockNumber, getExtrinsicHash } from "./event";

export const requestedRedeem = async (event: SubstrateEvent) => {
  const [account, liquid_amount, allow_fast_match] = event.event
    .data as unknown as [AccountId, Balance, any];
  const blockNumber = getBlockNumber(event);
  await getAccount(account.toString());

  const historyId = `${blockNumber}-${event.idx.toString()}`;
  const history = await getRequestedRedeem(historyId);
  history.blockNumber = blockNumber;
  history.timestamp = event.block.timestamp;
  history.addressId = account.toString();
  history.amount = BigInt(liquid_amount.toString());
  history.allowFastMatch = allow_fast_match;

  if (event.extrinsic) {
    history.extrinsicHash = getExtrinsicHash(event);
    await getAccount(event.extrinsic.extrinsic.signer.toString());
  }
  await history.save();
};
