import { AccountId, Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getMint } from "../records";
import { getBlockHash, getBlockNumber, getBlockTimestamp } from "../utils/block";
import { getExtrinsicHashFromEvent } from "../utils/extrinsic";

export const handleMinted = async (event: SubstrateEvent) => {
  const historyId = `${getBlockNumber(event.block)}-${event.idx.toString()}`;
  const history = await getMint(historyId);

  history.blockNumber = getBlockNumber(event.block);
  history.blockHash = getBlockHash(event.block);
  history.timestamp = getBlockTimestamp(event.block);
  history.eventIndex = Number(event.idx.toString());
  history.extrinsic = getExtrinsicHashFromEvent(event);

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

  await history.save();
}