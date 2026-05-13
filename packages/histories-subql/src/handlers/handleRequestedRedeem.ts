import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRequestedRedeem } from "../records";
import { getBlockHash, getBlockNumber, getBlockTimestamp } from "../utils/block";
import { getExtrinsicHashFromEvent } from "../utils/extrinsic";

type BooleanCodec = {
  toString(): string;
};

export const handleRequestedRedeem = async (event: SubstrateEvent) => {
  const [address, liquidAmount, allowFastMatch] = event.event.data as unknown as [AccountId, Balance, BooleanCodec];
  const account = await getAccount(address.toString());

  const historyId = `${getBlockNumber(event.block)}-${event.idx.toString()}`;
  const history = await getRequestedRedeem(historyId);
  history.addressId = account.id;
  history.amount = BigInt(liquidAmount.toString());
  history.allowFastMatch = allowFastMatch.toString() === "true";
  history.blockNumber = getBlockNumber(event.block);
  history.blockHash = getBlockHash(event.block);
  history.timestamp = getBlockTimestamp(event.block);
  history.eventIndex = Number(event.idx.toString());
  history.extrinsic = getExtrinsicHashFromEvent(event);

  await account.save();
  await history.save();
}
