import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRedeemedByUnbond } from "../records";
import { getBlockHash, getBlockNumber, getBlockTimestamp } from "../utils/block";
import { getExtrinsicHashFromEvent } from "../utils/extrinsic";

export const handleRedeemedByUnbond = async (event: SubstrateEvent) => {
  const [address, era_index_when_unbond, liquid_amount, unbonding_staking_amount] = event.event.data as unknown as [AccountId, Balance, Balance, Balance];

  const account = await getAccount(address.toString());

  const historyId = `${getBlockNumber(event.block)}-${event.idx.toString()}`;
  const history = await getRedeemedByUnbond(historyId);
  history.addressId = account.toString();
  history.eraIndexWhenUnbond = BigInt(era_index_when_unbond.toString());
  history.liquidAmount = BigInt(liquid_amount.toString());
  history.unbondingStakingAmount = BigInt(unbonding_staking_amount.toString());
  history.blockNumber = getBlockNumber(event.block);
  history.blockHash = getBlockHash(event.block);
  history.timestamp = getBlockTimestamp(event.block);
  history.eventIndex = Number(event.idx.toString());
  history.extrinsic = getExtrinsicHashFromEvent(event);

  await account.save();
  await history.save();
}