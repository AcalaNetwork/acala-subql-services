import { getTokenDecimals, isSystemAccount } from "@acala-network/subql-utils";
import { stringToHex, u8aToHex } from "@polkadot/util";
import { decodeAddress } from "@polkadot/util-crypto";
import { Account, AccountType, Token } from "../types";

const SYSTEM_ACCOUNT_PREFIX = stringToHex("modl");

const isSystemAccountByPublicKey = (address: string) => {
	try {
		return u8aToHex(decodeAddress(address, true)).startsWith(SYSTEM_ACCOUNT_PREFIX);
	} catch {
		return false;
	}
};

export const isSystemAccountSafe = (address: string) => {
	try {
		return isSystemAccount(address);
	} catch {
		const isSystem = isSystemAccountByPublicKey(address);
		const logger = (globalThis as any).logger;

		if (typeof logger?.warn === "function") {
			logger.warn(`Unable to classify account ${address} with checksum validation; fallback system=${isSystem}`);
		}

		return isSystem;
	}
};

export const getAccount = async (address: string) => {
	let record = await Account.get(address);

	if (!record) {
		record = new Account(address);
		record.address = address;

		const isSystem = isSystemAccountSafe(address);

		record.type = isSystem ? AccountType.SYSTEM : AccountType.USER;
	}

	return record;
};

export const getToken = async (token: string) => {
	let record = await Token.get(token);

	if (!record) {
		const decimals = await getTokenDecimals(api as any, token);
		record = new Token(token, token, Number(decimals.toString()));

		record.decimals = Number(decimals.toString());
		record.name = token;
	}

	return record;
};
