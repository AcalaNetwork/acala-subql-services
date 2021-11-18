import { SubstrateEvent } from "@subql/types";
import { Balance } from "@acala-network/types/interfaces";
import {
	Account,
	Transfer,
	Token,
	UserDailyReport,
	UserDailyReportGroup,
	TokenDailyReport,
} from "../types";
import { isSystemAccount } from "@acala-subql/utils";

export async function getTransfer(id: string) {
	let record = await Transfer.get(id);

	if (!record) {
		record = new Transfer(id);
	}

	return record;
}

export async function getAccount(id: string) {
	let record = await Account.get(id);

	if (!record) {
		record = new Account(id);

		record.isSystemAccount = !!isSystemAccount(id);
		record.transferCount = 0;
	}

	return record;
}

export async function getToken(id: string) {
	let record = await Token.get(id);

	if (!record) {
		record = new Token(id);

		record.transferCount = 0;
	}

	return record;
}

export async function getUserDailyReportGroup(id: string) {
	let record = await UserDailyReportGroup.get(id);

	if (!record) {
		record = new UserDailyReportGroup(id);
	}

	return record;
}

export async function getUserDailyReport(id: string) {
	let record = await UserDailyReport.get(id);

	if (!record) {
		record = new UserDailyReport(id);

		record.transferCount = 0;
		record.abs = BigInt(0);
		record.in = BigInt(0);
		record.out = BigInt(0);
		record.volumn = BigInt(0);
	}

	return record;
}

export async function getTokenDailyRecprod(id: string) {
	let record = await TokenDailyReport.get(id);

	if (!record) {
		record = new TokenDailyReport(id);

		record.transferCount = 0;
		record.abs = BigInt(0);
		record.in = BigInt(0);
		record.out = BigInt(0);
		record.volumn = BigInt(0);
	}

	return record;
}
