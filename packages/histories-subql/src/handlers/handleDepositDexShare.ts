import { forceToCurrencyName } from "@acala-network/sdk-core";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getDepositDexShare, getToken } from "../records";
import { getBlockHash, getBlockNumber } from "../utils/block";
import { getExtrinsicHashFromEvent } from "../utils/extrinsic";

export const handleDepositDexShare = async (event : SubstrateEvent) => {
  const [account, currency, balance] = event.event.data as unknown as [AccountId, CurrencyId, Balance];
  await getAccount(account.toString());
  const token = await getToken(forceToCurrencyName(currency));

  const historyId = `${getBlockNumber(event.block)}-${event.idx.toString()}`;
  const history = await getDepositDexShare(historyId);

  history.addressId = account.toString();
  history.tokenId = token.name;
  history.amount = BigInt(balance.toString());
  history.blockNumber = getBlockNumber(event.block);
  history.blockHash = getBlockHash(event.block);
  history.extrinsic = getExtrinsicHashFromEvent(event);
  history.eventIndex = Number(event.idx.toString());

	await history.save();
}