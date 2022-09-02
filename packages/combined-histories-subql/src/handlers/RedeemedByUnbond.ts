import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRedeemedByUnbond, getRedeemRequestCancelled } from "../utils/record";
import { ensureBlock, ensureExtrinsic } from "./event";

export const RedeemedByUnbond = async (event: SubstrateEvent) => {
  const [account, era_index_when_unbond, liquid_amount, unbonding_staking_amount] = event.event.data as unknown as [AccountId, Balance, Balance, Balance];
  const blockData = await ensureBlock(event);
  await getAccount(account.toString());

  const historyId = `${blockData.hash}-${event.idx.toString()}`;
  const history = await getRedeemedByUnbond(historyId);
  history.blockId = blockData.id;
  history.timestamp = blockData.timestamp;
  history.addressId = account.toString();
  history.eraIndexWhenUnbond = BigInt(era_index_when_unbond.toString());
  history.liquidAmount = BigInt(liquid_amount.toString());
  history.unbondingStakingAmount = BigInt(unbonding_staking_amount.toString());

  if (event.extrinsic) {
    const extrinsicData = await ensureExtrinsic(event);
    history.extrinsicId = extrinsicData.id;
    await getAccount(event.extrinsic.extrinsic.signer.toString());

    extrinsicData.section = event.event.section;
    extrinsicData.method = event.event.method;
    extrinsicData.addressId = event.extrinsic.extrinsic.signer.toString();

    await extrinsicData.save();
  }
  await history.save();
}