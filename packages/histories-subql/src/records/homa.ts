import { Account } from "../types";
import { Block } from "../types/models/Block";
import { Extrinsic } from "../types/models/Extrinsic";
import { Mint } from "../types/models/Mint";
import { Rate } from '../types/models/Rate';
import { Redeemed } from "../types/models/Redeemed";
import { RedeemedByFastMatch } from "../types/models/RedeemedByFastMatch";
import { RedeemedByUnbond } from "../types/models/RedeemedByUnbond";
import { RedeemRequestCancelled } from "../types/models/RedeemRequestCancelled";
import { RedeemRequested } from "../types/models/RedeemRequested";
import { RequestedRedeem } from "../types/models/RequestedRedeem";

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

export const getMint = async (id: string) => {
	const record = await Mint.get(id);

	if (!record) {
		const newRecord = new Mint(id);
		newRecord.amountMinted = BigInt(0);
		newRecord.amountStaked = BigInt(0);
		newRecord.stakingCurrencyAmount = BigInt(0);
		newRecord.liquidAmountAddedToVoid = BigInt(0);
		newRecord.liquidAmountReceived = BigInt(0);
		newRecord.blockId = "";
		return newRecord;
	} else {
		return record;
	}
};

export const getRedeemRequestCancelled = async (id: string) => {
	const record = await RedeemRequestCancelled.get(id);

	if (!record) {
		const newRecord = new RedeemRequestCancelled(id);
    newRecord.addressId = '';
    newRecord.amount = BigInt(0);
		newRecord.blockId = "";
		return newRecord;
	} else {
		return record;
	}
};

export const getRequestedRedeem = async (id: string) => {
	const record = await RequestedRedeem.get(id);

	if (!record) {
		const newRecord = new RequestedRedeem(id);
    newRecord.addressId = '';
    newRecord.amount = BigInt(0);
		newRecord.blockId = "";
		newRecord.allowFastMatch = true;
		return newRecord;
	} else {
		return record;
	}
};

export const getRedeemRequested = async (id: string) => {
	const record = await RedeemRequested.get(id);

	if (!record) {
		const newRecord = new RedeemRequested(id);
    newRecord.addressId = '';
    newRecord.amount = BigInt(0);
		newRecord.extraFee = BigInt(0);
		newRecord.blockId = "";
		return newRecord;
	} else {
		return record;
	}
};

export const getRedeemedByUnbond = async (id: string) => {
	const record = await RedeemedByUnbond.get(id);

	if (!record) {
		const newRecord = new RedeemedByUnbond(id);
    newRecord.addressId = '';
    newRecord.eraIndexWhenUnbond = BigInt(0);
		newRecord.liquidAmount = BigInt(0);
		newRecord.unbondingStakingAmount = BigInt(0);
		newRecord.blockId = "";
		return newRecord;
	} else {
		return record;
	}
};

export const getRedeemed = async (id: string) => {
	const record = await Redeemed.get(id);

	if (!record) {
		const newRecord = new Redeemed(id);
    newRecord.addressId = '';
    newRecord.stakingAmountRedeemed = BigInt(0);
		newRecord.liquidAmountDeducted = BigInt(0);
		newRecord.blockId = "";
		return newRecord;
	} else {
		return record;
	}
};

export const getRedeemedByFastMatch = async (id: string) => {
	const record = await RedeemedByFastMatch.get(id);

	if (!record) {
		const newRecord = new RedeemedByFastMatch(id);
    newRecord.addressId = '';
    newRecord.matchedLiquidAmount = BigInt(0);
		newRecord.feeInLiquid = BigInt(0);
		newRecord.redeemedStakingAmount = BigInt(0);
		newRecord.blockId = "";
		return newRecord;
	} else {
		return record;
	}
};

export const getRate = async(id: string) => {
	const record = await Rate.get(id);

	if (!record) {
		const newRecord = new Rate(id);
		newRecord.totalStaking = BigInt(0);
		newRecord.totalLiquidity = BigInt(0);
		newRecord.totalVoidLiquid = BigInt(0);
		newRecord.exchangeRate = BigInt(0);
		newRecord.timestamp = new Date();
		return newRecord;
	} else {
		return record;
	}
}