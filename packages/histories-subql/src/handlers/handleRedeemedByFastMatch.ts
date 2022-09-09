import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRedeemedByFastMatch } from "../records";
import { getBlockHash, getBlockNumber, getBlockTimestamp } from "../utils/block";
import { getExtrinsicHashFromEvent } from "../utils/extrinsic";

export const handleRedeemedByFastMatch = async (event: SubstrateEvent) => {
  const [address, matchedLiquidAmount, feeInLiquid, redeemedStakingAmount] = event.event.data as unknown as [AccountId, Balance, Balance, Balance];
  const account = await getAccount(address.toString());

  const historyId = `${getBlockNumber(event.block)}-${event.idx.toString()}`;
  const history = await getRedeemedByFastMatch(historyId);
  history.addressId = account.toString();
  history.matchedLiquidAmount = BigInt(matchedLiquidAmount.toString());
  history.feeInLiquid = BigInt(feeInLiquid.toString());
  history.redeemedStakingAmount = BigInt(redeemedStakingAmount.toString());
  history.blockNumber = getBlockNumber(event.block);
  history.blockHash = getBlockHash(event.block);
  history.timestamp = getBlockTimestamp(event.block);
  history.eventIndex = Number(event.idx.toString());
  history.extrinsic = getExtrinsicHashFromEvent(event);

  await account.save();
  await history.save();
}