import { forceToCurrencyName } from "@acala-network/sdk-core";
import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getPoolId } from "../utils/getPoolId";
import { getAccount, getClaimRewards, getToken } from "../records";
import { getBlockHash, getBlockNumber } from "../utils/block";
import { getExtrinsicHashFromEvent } from "../utils/extrinsic";

export const handleClaimRewards = async (event: SubstrateEvent) => {
  const block = event.block;
  // who, pool_id, reward_currency_id, actual_amount, deduction_amount
  const [address, pool,  currency, actual_amount, deduction_amount] = event.event.data as unknown as [AccountId, any, CurrencyId, Balance, Balance];
  const account = await getAccount(address.toString());
  const token = await getToken(forceToCurrencyName(currency));

  const historyId = `${block.block.header.number}-${event.idx.toString()}`;
  const history = await getClaimRewards(historyId);

  history.addressId = account.toString();
  history.tokenId = token.name;
  history.pool = getPoolId(pool);
  history.actualAmount = BigInt(actual_amount.toString());
  history.deductionAmount = BigInt(deduction_amount.toString());
  history.blockHash = getBlockHash(block);
  history.blockNumber = getBlockNumber(block);
  history.extrinsic = getExtrinsicHashFromEvent(event);
  history.eventIndex = Number(event.idx.toString());

  await token.save();
  await account.save();
	await history.save();
}