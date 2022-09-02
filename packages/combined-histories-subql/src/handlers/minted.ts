import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getMint } from "../utils/record";
import { ensureBlock, ensureExtrinsic } from "./event";

export const minted = async (event: SubstrateEvent) => {
  const blockData = await ensureBlock(event);

  const historyId = `${blockData.hash}-${event.idx.toString()}`;
  const history = await getMint(historyId);
  history.blockId = blockData.id;
  history.timestamp = blockData.timestamp;

  if (event.event.data.length === 3) {
    const [account, amount_staked, amount_minted] = event.event.data as unknown as [AccountId, Balance, Balance];
    await getAccount(account.toString())
    history.addressId = account.toString();
    history.amountStaked = BigInt(amount_staked.toString());
    history.amountMinted = BigInt(amount_minted.toString());
    history.type ='homaLite.Minted'
  } else {
    const [account, staking_currency_amount, liquid_amount_received, liquid_amount_added_to_void] = event.event.data as unknown as [AccountId, Balance, Balance, Balance];
    await getAccount(account.toString())
    history.addressId = account.toString();
    history.stakingCurrencyAmount = BigInt(staking_currency_amount.toString());
    history.liquidAmountReceived = BigInt(liquid_amount_received.toString());
    history.liquidAmountAddedToVoid = BigInt(liquid_amount_added_to_void.toString());
    history.type ='homa.Minted'
  }

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