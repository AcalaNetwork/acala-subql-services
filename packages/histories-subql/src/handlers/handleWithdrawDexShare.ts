import { forceToCurrencyName } from "@acala-network/sdk-core";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getToken, getWithdrawDexShare } from "../records";
import { getBlockHash, getBlockNumber, getBlockTimestamp } from "../utils/block";
import { getExtrinsicHashFromEvent } from "../utils/extrinsic";

export const handleWithdrawDexShare = async (event: SubstrateEvent) => {
  const [address, currency, balance] = event.event.data as unknown as [AccountId, CurrencyId, Balance];
  const account = await getAccount(address.toString());
  const token = await getToken(forceToCurrencyName(currency));

  const historyId = `${getBlockNumber(event.block)}-${event.idx.toString()}`;
  const history = await getWithdrawDexShare(historyId);

  history.addressId = account.id;
  history.tokenId = token.name;
  history.amount = BigInt(balance.toString());
  history.blockNumber = getBlockNumber(event.block);
  history.blockHash = getBlockHash(event.block);
  history.timestamp = getBlockTimestamp(event.block);
  history.eventIndex = Number(event.idx.toString());
  history.extrinsic = getExtrinsicHashFromEvent(event);


  await account.save();
  await token.save();
	await history.save();
}