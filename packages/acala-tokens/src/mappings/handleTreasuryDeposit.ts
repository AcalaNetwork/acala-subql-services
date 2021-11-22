/*
the treasury will take some native tokens as network fee
the treasury wil also take account dust
*/
import { getTreasuryAccount } from "@acala-network/subql-utils";
import { updateAccountBalance } from "../utils/updateAccountBalance";
import { updateToken } from "../utils/updateToken";

export async function handleTreasuryDeposit (
  accountId: string,
  tokenName: string,
  amount: bigint,
  timestamp: Date
) {
  const treasurAccount = getTreasuryAccount();

  // we treat treasury.deposit as transfer, so volume should increase
  await updateToken(tokenName, BigInt(0), amount, BigInt(0), BigInt(0), timestamp);
  await updateAccountBalance(treasurAccount, tokenName, amount, BigInt(0), BigInt(0), timestamp);
  await updateAccountBalance(accountId, tokenName, -amount, BigInt(0), BigInt(0), timestamp);
}
