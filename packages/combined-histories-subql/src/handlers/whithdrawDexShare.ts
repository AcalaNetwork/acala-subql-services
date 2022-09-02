import { forceToCurrencyName } from "@acala-network/sdk-core";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getToken, getWithdrawDexShare } from "../utils/record";
import { ensureBlock, ensureExtrinsic } from "./event";

export const whithdrawDexShare = async (event: SubstrateEvent) => {
  const [account, currency, balance] = event.event.data as unknown as [AccountId, CurrencyId, Balance];
  const blockData = await ensureBlock(event);
  await getAccount(account.toString());
  const token = await getToken(forceToCurrencyName(currency));

  const historyId = `${blockData.id}-${event.idx.toString()}`;
  const history = await getWithdrawDexShare(historyId);

  history.addressId = account.toString();
  history.tokenId = token.name;
  history.amount = BigInt(balance.toString());
  history.blockId = blockData.id;

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