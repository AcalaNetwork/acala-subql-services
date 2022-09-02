import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRedeemRequestCancelled } from "../records";
import { getBlockHash, getBlockNumber, getBlockTimestamp } from "../utils/block";

export const redeemRequestCancelled = async (event: SubstrateEvent) => {
  const [account, cancelled_liquid_amount] = event.event.data as unknown as [AccountId, Balance];
  await getAccount(account.toString());

  const historyId = `${getBlockNumber(event.block)}-${event.idx.toString()}`;
  const history = await getRedeemRequestCancelled(historyId);

  history.amount = BigInt(cancelled_liquid_amount.toString());
  history.blockNumber = getBlockNumber(event.block);
  history.blockHash = getBlockHash(event.block);
  history.timestamp = getBlockTimestamp(event.block);
  history.eventIndex = Number(event.idx.toString());

  await history.save();
}