import { Account } from "../types";

export const getAccount = async (address: string) => {
	let account = await Account.get(address);
	if (!account) {
		account = new Account(address);
		account.address = address;
		account.txCount = BigInt(0);
	}
  return account;
};
