import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRedeemRequested } from "../records";
import { getBlockHash, getBlockNumber, getBlockTimestamp } from "../utils/block";

export const handleRedeemRequested = async (event: SubstrateEvent) => {
  const [address, liquid_amount, extra_fee] = event.event.data as unknown as [AccountId, Balance, Balance];
  const account = await getAccount(address.toString());

  const historyId = `${getBlockNumber(event.block)}-${event.idx.toString()}`;
  const history = await getRedeemRequested(historyId);

  history.addressId = account.toString();
  history.amount = BigInt(liquid_amount.toString());
  history.extraFee = BigInt(extra_fee.toString());
  history.blockNumber = getBlockNumber(event.block);
  history.blockHash = getBlockHash(event.block);
  history.timestamp = getBlockTimestamp(event.block);
  history.eventIndex = Number(event.idx.toString());

  await account.save();
  await history.save();
}