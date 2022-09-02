import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getRedeemedByFastMatch } from "../utils/record";
import { ensureBlock, ensureExtrinsic } from "./event";

export const redeemedByFastMatch = async (event: SubstrateEvent) => {
  const [account, matchedLiquidAmount, feeInLiquid, redeemedStakingAmount] = event.event.data as unknown as [AccountId, Balance, Balance, Balance];
  const blockData = await ensureBlock(event);
  await getAccount(account.toString());

  const historyId = `${blockData.hash}-${event.idx.toString()}`;
  const history = await getRedeemedByFastMatch(historyId);
  history.blockId = blockData.id;
  history.timestamp = blockData.timestamp;
  history.addressId = account.toString();
  history.matchedLiquidAmount = BigInt(matchedLiquidAmount.toString());
  history.feeInLiquid = BigInt(feeInLiquid.toString());
  history.redeemedStakingAmount = BigInt(redeemedStakingAmount.toString());

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