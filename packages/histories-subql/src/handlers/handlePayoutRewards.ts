import { forceToCurrencyName, MaybeCurrency } from "@acala-network/sdk-core";
import { SubstrateEvent } from "@subql/types";
import { getPoolId } from "../utils/getPoolId";
import { getAccount, getPayoutRewards, getToken } from "../records";
import { getBlockHash, getBlockNumber, getBlockTimestamp } from "../utils/block";
import { getExtrinsicHashFromEvent } from "../utils/extrinsic";

export const handlePayoutRewards = async (event: SubstrateEvent) => {
  // who, pool_id, reward_currency_type, actual_payout, deduction_amount
  const [account, pool, reward_currency_type, actual_payout, deduction_amount] = event.event.data;

  await getAccount(account.toString());
  const token = await getToken(forceToCurrencyName(reward_currency_type as unknown as MaybeCurrency));

  const historyId = `${getBlockNumber(event.block)}-${event.idx.toString()}`;
  const history = await getPayoutRewards(historyId);

  history.addressId = account.toString();
  history.pool = getPoolId(pool);
  history.tokenId = token.name
  history.actualPayout = BigInt(actual_payout.toString());
  history.deductionAmount = BigInt(deduction_amount.toString());
  history.blockNumber = getBlockNumber(event.block);
  history.blockHash = getBlockHash(event.block);
  history.timestamp = getBlockTimestamp(event.block);
  history.eventIndex = Number(event.idx.toString());
  history.extrinsic = getExtrinsicHashFromEvent(event);

	await history.save();
}