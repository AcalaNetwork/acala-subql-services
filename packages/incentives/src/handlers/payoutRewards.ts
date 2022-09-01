import { forceToCurrencyName } from "@acala-network/sdk-core";
import { SubstrateEvent } from "@subql/types";
import { getPoolId } from "../utils/getPoolId";
import { getAccount, getPayoutRewards, getToken } from "../utils/record";
import { ensureBlock, ensureExtrinsic } from "./event";

export const payoutRewards = async (event: SubstrateEvent) => {
  // who, pool_id, reward_currency_type, actual_payout, deduction_amount
  const [account, pool, reward_currency_type, actual_payout, deduction_amount] = event.event.data;

  const blockData = await ensureBlock(event);
  await getAccount(account.toString());
  const token = await getToken(forceToCurrencyName(reward_currency_type));

  const historyId = `${blockData.id}-${event.idx.toString()}`;
  const history = await getPayoutRewards(historyId);

  history.addressId = account.toString();
  history.pool = getPoolId(pool);
  history.tokenId = token.name
  history.actualPayout = BigInt(actual_payout.toString());
  history.deductionAmount = BigInt(deduction_amount.toString());
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