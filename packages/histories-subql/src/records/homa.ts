import { Mint } from "../types/models/Mint";
import { Rate } from '../types/models/Rate';
import { Redeemed } from "../types/models/Redeemed";
import { RedeemedByFastMatch } from "../types/models/RedeemedByFastMatch";
import { RedeemedByUnbond } from "../types/models/RedeemedByUnbond";
import { RedeemRequestCancelled } from "../types/models/RedeemRequestCancelled";
import { RedeemRequested } from "../types/models/RedeemRequested";
import { RequestedRedeem } from "../types/models/RequestedRedeem";

export const getMint = async (id: string) => {
	let record = await Mint.get(id);

	if (!record) {
		record = new Mint(id);
		record.amountMinted = BigInt(0);
		record.amountStaked = BigInt(0);
		record.stakingCurrencyAmount = BigInt(0);
		record.liquidAmountAddedToVoid = BigInt(0);
		record.liquidAmountReceived = BigInt(0);
		record.blockNumber = BigInt(0);
	}

	return record;
};

export const getRedeemRequestCancelled = async (id: string) => {
	let record = await RedeemRequestCancelled.get(id);

	if (!record) {
		record = new RedeemRequestCancelled(id);
    record.addressId = '';
    record.amount = BigInt(0);
		record.blockNumber = BigInt(0);
	}

	return record;
};

export const getRequestedRedeem = async (id: string) => {
	let record = await RequestedRedeem.get(id);

	if (!record) {
		record = new RequestedRedeem(id);

    record.addressId = '';
    record.amount = BigInt(0);
		record.blockNumber = BigInt(0);
		record.allowFastMatch = true;
	}

	return record;
};

export const getRedeemRequested = async (id: string) => {
	let record = await RedeemRequested.get(id);

	if (!record) {
		record = new RedeemRequested(id);

    record.addressId = '';
    record.amount = BigInt(0);
		record.extraFee = BigInt(0);
		record.blockNumber = BigInt(0);
	}

	return record;
};

export const getRedeemedByUnbond = async (id: string) => {
	let record = await RedeemedByUnbond.get(id);

	if (!record) {
		record = new RedeemedByUnbond(id);

    record.addressId = '';
    record.eraIndexWhenUnbond = BigInt(0);
		record.liquidAmount = BigInt(0);
		record.unbondingStakingAmount = BigInt(0);
		record.blockNumber = BigInt(0);
	}

	return record;
};

export const getRedeemed = async (id: string) => {
	let record = await Redeemed.get(id);

	if (!record) {
		record = new Redeemed(id);

    record.addressId = '';
    record.stakingAmountRedeemed = BigInt(0);
		record.liquidAmountDeducted = BigInt(0);
		record.blockNumber = BigInt(0);
	}

	return record;
};

export const getRedeemedByFastMatch = async (id: string) => {
	let record = await RedeemedByFastMatch.get(id);

	if (!record) {
		record = new RedeemedByFastMatch(id);

    record.addressId = '';
    record.matchedLiquidAmount = BigInt(0);
		record.feeInLiquid = BigInt(0);
		record.redeemedStakingAmount = BigInt(0);
		record.blockNumber = BigInt(0);
	}

	return record;
};

export const getRate = async(id: string) => {
	let record = await Rate.get(id);

	if (!record) {
		record = new Rate(id);

		record.totalStaking = BigInt(0);
		record.totalLiquidity = BigInt(0);
		record.totalVoidLiquid = BigInt(0);
		record.exchangeRate = BigInt(0);
		record.timestamp = new Date();
	}

	return record;
}