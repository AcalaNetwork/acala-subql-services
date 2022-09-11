import { getTokenDecimals, isSystemAccount } from "@acala-network/subql-utils";
import { Account, AccountType, Token } from "../types";

export const getAccount = async (address: string) => {
	let record = await Account.get(address);

	if (!record) {
		record = new Account(address);
		record.address = address;

    const isSystem = isSystemAccount(address);

    record.type = isSystem ? AccountType.SYSTEM : AccountType.USER;
		record.txCount = 0;
	}

  return record;
};

export const getToken = async (token: string) => {
	let record = await Token.get(token);

	if (!record) {
		const decimals = await getTokenDecimals(api as any, token);
		record = new Token(token);

		record.decimals = Number(decimals.toString());
		record.name = token;
		record.transferVolume = BigInt(0);
		record.updateAt = new Date();
	}

	return record;
};