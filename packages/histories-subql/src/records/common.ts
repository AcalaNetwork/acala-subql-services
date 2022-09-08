import { getTokenDecimals, isSystemAccount } from "@acala-network/subql-utils";
import { Account, AccountType, Token } from "../types";

export const getAccount = async (address: string) => {
	let account = await Account.get(address);

	if (!account) {
		account = new Account(address);
		account.address = address;

    const isSystem = isSystemAccount(address);

    account.type = isSystem ? AccountType.SYSTEM : AccountType.USER;
		account.txCount = 0;
	}
  return account;
};

export const getToken = async (token: string) => {
	let record = await Token.get(token);

	if (!record) {
		const decimals = await getTokenDecimals(api as any, token);
		record = new Token(token);

		record.decimals = Number(decimals.toString());
		record.name = token;
		record.transferVolume = BigInt(0);
	}

	return record;
};