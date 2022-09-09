import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRedeemed } from "../records";
import { getBlockHash, getBlockNumber, getBlockTimestamp } from "../utils/block";

export const handleRedeemed = async (event: SubstrateEvent) => {
  const [address, staking_amount_redeemed, liquid_amount_deducted] = event.event.data as unknown as [AccountId, Balance, Balance];
  const account = await getAccount(address.toString());

  const historyId = `${getBlockNumber(event.block)}-${event.idx.toString()}`;
  const history = await getRedeemed(historyId);

  history.addressId = account.id;
  history.stakingAmountRedeemed = BigInt(staking_amount_redeemed.toString());
  history.liquidAmountDeducted = BigInt(liquid_amount_deducted.toString());
  history.blockNumber = getBlockNumber(event.block);
  history.blockHash = getBlockHash(event.block);
  history.timestamp = getBlockTimestamp(event.block);
  history.eventIndex = Number(event.idx.toString());

  await account.save();
  await history.save();
}