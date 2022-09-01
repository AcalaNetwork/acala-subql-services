import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRedeemedByFastMatch } from "../utils/record";
import { getBlockNumber, getExtrinsicHash } from "./event";

export const redeemedByFastMatch = async (event: SubstrateEvent) => {
  const [account, matchedLiquidAmount, feeInLiquid, redeemedStakingAmount] =
    event.event.data as unknown as [AccountId, Balance, Balance, Balance];
  const blockNumber = getBlockNumber(event);
  await getAccount(account.toString());

  const historyId = `${blockNumber}-${event.idx.toString()}`;
  const history = await getRedeemedByFastMatch(historyId);
  history.blockNumber = blockNumber;
  history.timestamp = event.block.timestamp;
  history.addressId = account.toString();
  history.matchedLiquidAmount = BigInt(matchedLiquidAmount.toString());
  history.feeInLiquid = BigInt(feeInLiquid.toString());
  history.redeemedStakingAmount = BigInt(redeemedStakingAmount.toString());

  if (event.extrinsic) {
    history.extrinsicHash = getExtrinsicHash(event);
    await getAccount(event.extrinsic.extrinsic.signer.toString());
  }
  await history.save();
};
