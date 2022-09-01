import { getTokenDecimals } from "@acala-network/subql-utils";
import { Account, Block, ClaimRewards, DepositDexShare, Extrinsic, PayoutRewards, Token, WithdrawDexShare } from "../types";

export const getAccount = async (address: string) => {
	const _account = await Account.get(address);
	if (!_account) {
		const newAccount = new Account(address);
		newAccount.address = address;
		newAccount.txCount = BigInt(0);
		await newAccount.save();
		return newAccount;
	} else {
		return _account;
	}
};


export const getToken = async (token: string) => {
	const _reacord = await Token.get(token);
	if (!_reacord) {
		const decimals = await getTokenDecimals(api as any, token);
		const newReacord = new Token(token);
		newReacord.decimals = Number(decimals.toString());
		newReacord.name = token;
		await newReacord.save();
		return newReacord;
	} else {
		return _reacord;
	}
};

export const getBlock = async (id: string) => {
	const _block = await Block.get(id);
	if (!_block) {
		const newBlock = new Block(id);
		newBlock.hash = "";
		newBlock.number = BigInt(0);
		newBlock.timestamp = new Date();
		await newBlock.save();
		return newBlock;
	} else {
		return _block;
	}
};

export const getExtrinsic = async (id: string) => {
	const record = await Extrinsic.get(id);

	if (!record) {
		const newRecord = new Extrinsic(id);
		newRecord.hash = "";
		newRecord.blockId = "";
		newRecord.method = "";
		newRecord.section = "";
		return newRecord;
	} else {
		return record;
	}
};

export const getClaimRewards = async (id: string) => {
	const record = await ClaimRewards.get(id);

	if (!record) {
		const newRecord = new ClaimRewards(id);

		newRecord.addressId = "";
		newRecord.tokenId = "";
		newRecord.pool = "";
		newRecord.actualAmount = BigInt(0);
		newRecord.deductionAmount = BigInt(0);
		newRecord.blockId = "";
		newRecord.timestamp = new Date();
		return newRecord;
	} else {
		return record;
	}
};


export const getDepositDexShare = async (id: string) => {
	const record = await DepositDexShare.get(id);

	if (!record) {
		const newRecord = new DepositDexShare(id);

		newRecord.addressId = "";
    newRecord.tokenId = '';
    newRecord.amount = BigInt(0);
		newRecord.blockId = "";
		newRecord.timestamp = new Date();
		return newRecord;
	} else {
		return record;
	}
};


export const getPayoutRewards = async (id: string) => {
	const record = await PayoutRewards.get(id);

	if (!record) {
		const newRecord = new PayoutRewards(id);

		newRecord.addressId = "";
		newRecord.tokenId = "";
    newRecord.pool = '';
		newRecord.actualPayout = BigInt(0);
		newRecord.deductionAmount = BigInt(0);
		newRecord.blockId = "";
		newRecord.timestamp = new Date();
		return newRecord;
	} else {
		return record;
	}
};


export const getWithdrawDexShare = async (id: string) => {
	const record = await WithdrawDexShare.get(id);

	if (!record) {
		const newRecord = new WithdrawDexShare(id);

		newRecord.addressId = "";
		newRecord.tokenId = "";
		newRecord.amount = BigInt(0);
		newRecord.blockId = "";
		newRecord.timestamp = new Date();
		return newRecord;
	} else {
		return record;
	}
};