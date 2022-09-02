import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRedeemRequested, getRequestedRedeem } from "../utils/record";
import { ensureBlock, ensureExtrinsic } from "./event";

export const requestedRedeem = async (event: SubstrateEvent) => {
  const [account, liquid_amount, allow_fast_match] = event.event.data as unknown as [AccountId, Balance, any];
  const blockData = await ensureBlock(event);
  await getAccount(account.toString());

  const historyId = `${blockData.hash}-${event.idx.toString()}`;
  const history = await getRequestedRedeem(historyId);
  history.blockId = blockData.id;
  history.timestamp = blockData.timestamp;
  history.addressId = account.toString();
  history.amount = BigInt(liquid_amount.toString());
  history.allowFastMatch = allow_fast_match;

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