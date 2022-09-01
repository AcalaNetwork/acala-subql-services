import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRedeemedByUnbond } from "../utils/record";
import { getBlockNumber, getExtrinsicHash } from "./event";

export const RedeemedByUnbond = async (event: SubstrateEvent) => {
  const [
    account,
    era_index_when_unbond,
    liquid_amount,
    unbonding_staking_amount,
  ] = event.event.data as unknown as [AccountId, Balance, Balance, Balance];
  const blockNumber = getBlockNumber(event);
  await getAccount(account.toString());

  const historyId = `${blockNumber}-${event.idx.toString()}`;
  const history = await getRedeemedByUnbond(historyId);
  history.blockNumber = blockNumber;
  history.timestamp = event.block.timestamp;
  history.addressId = account.toString();
  history.eraIndexWhenUnbond = BigInt(era_index_when_unbond.toString());
  history.liquidAmount = BigInt(liquid_amount.toString());
  history.unbondingStakingAmount = BigInt(unbonding_staking_amount.toString());

  if (event.extrinsic) {
    history.extrinsicHash = getExtrinsicHash(event);
    await getAccount(event.extrinsic.extrinsic.signer.toString());
  }
  await history.save();
};
