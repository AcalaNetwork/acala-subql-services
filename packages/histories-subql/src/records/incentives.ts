import { ClaimRewards, DepositDexShare, PayoutRewards, Token, WithdrawDexShare } from "../types";


export const getClaimRewards = async (id: string) => {
	let record = await ClaimRewards.get(id);

	if (!record) {
		record = new ClaimRewards(id);

		record.addressId = "";
		record.tokenId = "";
		record.pool = "";
		record.actualAmount = BigInt(0);
		record.deductionAmount = BigInt(0);
		record.blockNumber = BigInt(0);
		record.timestamp = new Date();
	}

	return record;
};


export const getDepositDexShare = async (id: string) => {
	let record = await DepositDexShare.get(id);

	if (!record) {
		record = new DepositDexShare(id);

		record.addressId = "";
    record.tokenId = '';
    record.amount = BigInt(0);
		record.blockNumber = BigInt(0);
		record.timestamp = new Date();
	}

	return record;
};


export const getPayoutRewards = async (id: string) => {
	let record = await PayoutRewards.get(id);

	if (!record) {
		record = new PayoutRewards(id);

		record.addressId = "";
		record.tokenId = "";
    record.pool = '';
		record.actualPayout = BigInt(0);
		record.deductionAmount = BigInt(0);
		record.blockNumber = BigInt(0);
		record.timestamp = new Date();
	}

	return record;
};


export const getWithdrawDexShare = async (id: string) => {
	let record = await WithdrawDexShare.get(id);

	if (!record) {
		record = new WithdrawDexShare(id);

		record.addressId = "";
		record.tokenId = "";
		record.amount = BigInt(0);
		record.blockNumber = BigInt(0);
		record.timestamp = new Date();
	}

	return record;
};