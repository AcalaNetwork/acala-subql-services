import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRedeemRequested } from "../utils/record";
import { getBlockNumber, getExtrinsicHash } from "./event";

export const redeemRequested = async (event: SubstrateEvent) => {
  const [account, liquid_amount, extra_fee] = event.event.data as unknown as [
    AccountId,
    Balance,
    Balance
  ];
  const blockNumber = getBlockNumber(event);
  await getAccount(account.toString());

  const historyId = `${blockNumber}-${event.idx.toString()}`;
  const history = await getRedeemRequested(historyId);
  history.blockNumber = blockNumber;
  history.timestamp = event.block.timestamp;
  history.addressId = account.toString();
  history.amount = BigInt(liquid_amount.toString());
  history.extraFee = BigInt(extra_fee.toString());

  if (event.extrinsic) {
    history.extrinsicHash = getExtrinsicHash(event);
    await getAccount(event.extrinsic.extrinsic.signer.toString());
  }
  await history.save();
};
