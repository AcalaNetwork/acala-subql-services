import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRequestedRedeem } from "../records";
import { getBlockHash, getBlockNumber, getBlockTimestamp } from "../utils/block";
import { getExtrinsicHashFromEvent } from "../utils/extrinsic";

export const handleRequestedRedeem = async (event: SubstrateEvent) => {
  const [account, liquid_amount, allow_fast_match] = event.event.data as unknown as [AccountId, Balance, any];
  await getAccount(account.toString());

  const historyId = `${getBlockNumber(event.block)}-${event.idx.toString()}`;
  const history = await getRequestedRedeem(historyId);
  history.addressId = account.toString();
  history.amount = BigInt(liquid_amount.toString());
  history.allowFastMatch = allow_fast_match;
  history.blockNumber = getBlockNumber(event.block);
  history.blockHash = getBlockHash(event.block);
  history.timestamp = getBlockTimestamp(event.block);
  history.eventIndex = Number(event.idx.toString());
  history.extrinsic = getExtrinsicHashFromEvent(event);

  await history.save();
}