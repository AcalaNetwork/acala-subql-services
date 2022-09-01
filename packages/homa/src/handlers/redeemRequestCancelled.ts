import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRedeemRequestCancelled } from "../utils/record";
import { getBlockNumber, getExtrinsicHash } from "./event";

export const redeemRequestCancelled = async (event: SubstrateEvent) => {
  const [account, cancelled_liquid_amount] = event.event.data as unknown as [
    AccountId,
    Balance
  ];
  const blockNumber = getBlockNumber(event);
  await getAccount(account.toString());

  const historyId = `${blockNumber}-${event.idx.toString()}`;
  const history = await getRedeemRequestCancelled(historyId);
  history.blockNumber = blockNumber;
  history.timestamp = event.block.timestamp;
  history.addressId = account.toString();
  history.amount = BigInt(cancelled_liquid_amount.toString());

  if (event.extrinsic) {
    history.extrinsicHash = getExtrinsicHash(event);
    await getAccount(event.extrinsic.extrinsic.signer.toString());
  }
  await history.save();
};
