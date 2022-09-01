import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRedeemed } from "../utils/record";
import { getBlockNumber, getExtrinsicHash } from "./event";

export const redeemed = async (event: SubstrateEvent) => {
  const [account, staking_amount_redeemed, liquid_amount_deducted] = event.event
    .data as unknown as [AccountId, Balance, Balance];
  const blockNumber = getBlockNumber(event);
  await getAccount(account.toString());

  const historyId = `${blockNumber}-${event.idx.toString()}`;
  const history = await getRedeemed(historyId);
  history.blockNumber = blockNumber;
  history.timestamp = event.block.timestamp;
  history.addressId = account.toString();
  history.stakingAmountRedeemed = BigInt(staking_amount_redeemed.toString());
  history.liquidAmountDeducted = BigInt(liquid_amount_deducted.toString());

  if (event.extrinsic) {
    history.extrinsicHash = getExtrinsicHash(event);
    await getAccount(event.extrinsic.extrinsic.signer.toString());
  }
  await history.save();
};
