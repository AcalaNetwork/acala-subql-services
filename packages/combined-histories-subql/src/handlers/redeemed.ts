import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRedeemed } from "../utils/record";
import { ensureBlock, ensureExtrinsic } from "./event";

export const redeemed = async (event: SubstrateEvent) => {
  const [account, staking_amount_redeemed, liquid_amount_deducted] = event.event.data as unknown as [AccountId, Balance, Balance];
  const blockData = await ensureBlock(event);
  await getAccount(account.toString());

  const historyId = `${blockData.hash}-${event.idx.toString()}`;
  const history = await getRedeemed(historyId);
  history.blockId = blockData.id;
  history.timestamp = blockData.timestamp;
  history.addressId = account.toString();
  history.stakingAmountRedeemed = BigInt(staking_amount_redeemed.toString());
  history.liquidAmountDeducted = BigInt(liquid_amount_deducted.toString());

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