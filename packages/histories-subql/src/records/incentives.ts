import { getTokenDecimals } from "@acala-network/subql-utils";
import { ClaimRewards, DepositDexShare, PayoutRewards, Token, WithdrawDexShare } from "../types";

export const getToken = async (token: string) => {
	let reacord = await Token.get(token);

	if (!reacord) {
		const decimals = await getTokenDecimals(api as any, token);
		const record = new Token(token);
		record.decimals = Number(decimals.toString());
		record.name = token;
	}

	return reacord;
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
		const record = new Extrinsic(id);
		record.hash = "";
		record.blockId = "";
		record.method = "";
		record.section = "";
		return record;
	} else {
		return record;
	}
};

export const getClaimRewards = async (id: string) => {
	const record = await ClaimRewards.get(id);

	if (!record) {
		const record = new ClaimRewards(id);

		record.addressId = "";
		record.tokenId = "";
		record.pool = "";
		record.actualAmount = BigInt(0);
		record.deductionAmount = BigInt(0);
		record.blockId = "";
		record.timestamp = new Date();
		return record;
	} else {
		return record;
	}
};


export const getDepositDexShare = async (id: string) => {
	const record = await DepositDexShare.get(id);

	if (!record) {
		const record = new DepositDexShare(id);

		record.addressId = "";
    record.tokenId = '';
    record.amount = BigInt(0);
		record.blockId = "";
		record.timestamp = new Date();
		return record;
	} else {
		return record;
	}
};


export const getPayoutRewards = async (id: string) => {
	const record = await PayoutRewards.get(id);

	if (!record) {
		const record = new PayoutRewards(id);

		record.addressId = "";
		record.tokenId = "";
    record.pool = '';
		record.actualPayout = BigInt(0);
		record.deductionAmount = BigInt(0);
		record.blockId = "";
		record.timestamp = new Date();
		return record;
	} else {
		return record;
	}
};


export const getWithdrawDexShare = async (id: string) => {
	const record = await WithdrawDexShare.get(id);

	if (!record) {
		const record = new WithdrawDexShare(id);

		record.addressId = "";
		record.tokenId = "";
		record.amount = BigInt(0);
		record.blockId = "";
		record.timestamp = new Date();
		return record;
	} else {
		return record;
	}
};