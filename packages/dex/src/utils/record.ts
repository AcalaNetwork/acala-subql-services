import { createDexShareName, CurrencyObject, FixedPointNumber, getCurrencyObject } from "@acala-network/sdk-core";
import { getTokenDecimals } from "@acala-network/subql-utils";
import { Position } from "@acala-network/types/interfaces";
import {
	Account, Block, Extrinsic,
	AddLiquidity,
	AddProvision,
	DailyDex,
	DailyPool,
	Dex,
	HourDex,
	HourlyPool,
	ListProvision,
	Pool,
	PriceBundle,
	ProvisionPool,
	ProvisionPoolHourlyData,
	ProvisionToEnabled,
	RemoveLiquidity,
	Swap,
	Token,
	TokenDailyData,
	UserProvision
} from "../types";

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

export const getToken = async (token: string) => {
	const _reacord = await Token.get(token);
	if (!_reacord) {
		const decimals = await getTokenDecimals(api as any, token);
		const newReacord = new Token(token);
		newReacord.decimals = Number(decimals.toString());
		newReacord.name = token;
		newReacord.amount = BigInt(0);
		newReacord.tvl = BigInt(0);
		newReacord.tradeVolume = BigInt(0);
		newReacord.tradeVolumeUSD = BigInt(0);
		newReacord.txCount = BigInt(0);
		newReacord.poolCount = 0;
		newReacord.price = BigInt(0);
		await newReacord.save();
		return newReacord;
	} else {
		return _reacord;
	}
};

export const getDailyDex = async (id: string) => {
	const record = await DailyDex.get(id);

	if (!record) {
		const newRecord = new DailyDex(id);
		newRecord.poolCount = 0;
		newRecord.timestamp = new Date();
		newRecord.dailyTradeVolumeUSD = BigInt(0);
		newRecord.tradeVolumeUSD = BigInt(0);
		newRecord.totalTVL = BigInt(0);
		newRecord.updateAtBlockId = "";
		return newRecord;
	} else {
		return record;
	}
};


export const getDailyPool = async (id: string) => {
	const record = await DailyPool.get(id);

	if (!record) {
		const newRecord = new DailyPool(id);
		newRecord.poolId = "";
		newRecord.token0Id = "";
		newRecord.token1Id = "";
		newRecord.timestamp = new Date();
		newRecord.token0Amount = BigInt(0);
		newRecord.token1Amount = BigInt(0);
		newRecord.token0Price = BigInt(0);
		newRecord.token1Price = BigInt(0);
		newRecord.feeRateUSD = BigInt(0);
		newRecord.feeToken0Amount = BigInt(0);
		newRecord.feeToken1Amount = BigInt(0);
		newRecord.dailyToken0TradeVolume = BigInt(0);
		newRecord.dailyToken1TradeVolume = BigInt(0);
		newRecord.dailyTradeVolumeUSD = BigInt(0);
		newRecord.token0TradeVolume = BigInt(0);
		newRecord.token1TradeVolume = BigInt(0);
		newRecord.tradeVolumeUSD = BigInt(0);
		newRecord.token0TVL = BigInt(0);
		newRecord.token1TVL = BigInt(0);
		newRecord.totalTVL = BigInt(0);
		newRecord.txCount = BigInt(0);
		newRecord.token0Open = BigInt(0);
		newRecord.token0Low = BigInt(0);
		newRecord.token0Close = BigInt(0);
		newRecord.token0High = BigInt(0);
		newRecord.token1Open = BigInt(0);
		newRecord.token1Low = BigInt(0);
		newRecord.token1Close = BigInt(0);
		newRecord.token1High = BigInt(0);
		newRecord.updateAtBlockId = "";
		return newRecord;

	} else {
		return record;
	}
};

export const getDex = async (id = "dex") => {
	const record = await Dex.get(id);

	if (!record) {
		const newRecord = new Dex(id);
		newRecord.poolCount = 0;
		newRecord.tradeVolumeUSD = BigInt(0);
		newRecord.totalTVL = BigInt(0);
		return newRecord;
	} else {
		return record;
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

export const getHourDex = async (id: string) => {
	const record = await HourDex.get(id);

	if (!record) {
		const newRecord = new HourDex(id);
		newRecord.poolCount = 0;
		newRecord.timestamp = new Date();
		newRecord.hourlyTradeVolumeUSD = BigInt(0);
		newRecord.tradeVolumeUSD = BigInt(0);
		newRecord.totalTVL = BigInt(0);
		newRecord.updateAtBlockId = "";
		return newRecord;
	} else {
		return record;
	}
};

export const getHourlyPool = async (id: string) => {
	const record = await HourlyPool.get(id);

	if (!record) {
		const newRecord = new HourlyPool(id);
		newRecord.poolId = "";
		newRecord.token0Id = "";
		newRecord.token1Id = "";
		newRecord.timestamp = new Date();
		newRecord.token0Amount = BigInt(0);
		newRecord.token1Amount = BigInt(0);
		newRecord.token0Price = BigInt(0);
		newRecord.token1Price = BigInt(0);
		newRecord.feeRateUSD = BigInt(0);
		newRecord.feeToken0Amount = BigInt(0);
		newRecord.feeToken1Amount = BigInt(0);
		newRecord.hourlyToken0TradeVolume = BigInt(0);
		newRecord.hourlyToken1TradeVolume = BigInt(0);
		newRecord.hourlyTradeVolumeUSD = BigInt(0);
		newRecord.token0TradeVolume = BigInt(0);
		newRecord.token1TradeVolume = BigInt(0);
		newRecord.tradeVolumeUSD = BigInt(0);
		newRecord.token0TVL = BigInt(0);
		newRecord.token1TVL = BigInt(0);
		newRecord.totalTVL = BigInt(0);
		newRecord.txCount = BigInt(0);
		newRecord.token0Open = BigInt(0);
		newRecord.token0High = BigInt(0);
		newRecord.token0Low = BigInt(0);
		newRecord.token0Close = BigInt(0);
		newRecord.token1Open = BigInt(0);
		newRecord.token1High = BigInt(0);
		newRecord.token1Low = BigInt(0);
		newRecord.token1Close = BigInt(0);
		newRecord.updateAtBlockId = "";
		return newRecord;
	} else {
		return record;
	}
};

export const getPool = async (token0: string, token1: string, poolId?: string) => {
	const id = poolId ?? createDexShareName(token0, token1);
	const record = await Pool.get(id);

	if (!record) {
		const newRecord = new Pool(id);
		const feeData = api.consts.dex.getExchangeFee;

		newRecord.token0Id = token0;
		newRecord.token1Id = token1;
		newRecord.token0Amount = BigInt("0");
		newRecord.token1Amount = BigInt("0");
		newRecord.token0Price = BigInt(0);
		newRecord.token1Price = BigInt(0);
		newRecord.feeRate = BigInt(new FixedPointNumber(feeData[0]/feeData[1], 18).toChainData());
		newRecord.feeToken0Amount = BigInt(0);
		newRecord.feeToken1Amount = BigInt(0);
		newRecord.token0TradeVolume = BigInt(0);
		newRecord.token1TradeVolume = BigInt(0);
		newRecord.tradeVolumeUSD = BigInt(0);
		newRecord.token0TVL = BigInt(0);
		newRecord.token1TVL = BigInt(0);
		newRecord.totalTVL = BigInt(0);
		newRecord.txCount = BigInt(0);
		return newRecord;
	} else {
		return record;
	}
};

export const getProvisionPool = async (id: string) => {
	const record = await ProvisionPool.get(id);

	if (!record) {
		const newRecord = new ProvisionPool(id);
		newRecord.token0Id = "";
		newRecord.token1Id = "";
		newRecord.token0Amount = BigInt(0);
		newRecord.token1Amount = BigInt(0);
		newRecord.initializeShare = BigInt(0);
		newRecord.startAt = new Date();
		newRecord.startAtBlockId = "";
		newRecord.txCount = BigInt(0);
		return newRecord;
	} else {
		return record;
	}
};

export const getUserProvision = async (id: string) => {
	const record = await UserProvision.get(id);

	if (!record) {
		const newRecord = new UserProvision(id);
		newRecord.ownerId = "";
		newRecord.poolId = "";
		newRecord.token0Amount = BigInt(0);
		newRecord.token1Amount = BigInt(0);
		return newRecord;
	} else {
		return record;
	}
};

export const getPriceBundle = async (id: string) => {
	const record = await PriceBundle.get(id);

	if (!record) {
		const newRecord = new PriceBundle(id);

		newRecord.TokenId = "";
		newRecord.blockId = "";
		newRecord.price = BigInt(0);

		return {
			isExist: false,
			record: newRecord
		};
	} else {
		return {
			isExist: true,
			record: record
		};
	}
};

export const getAddLiquidity = async (id: string) => {
	const record = await AddLiquidity.get(id);

	if (!record) {
		const newRecord = new AddLiquidity(id);

		newRecord.addressId = "";
		newRecord.poolId = "";
		newRecord.token0Id = "";
		newRecord.token1Id = "";
		newRecord.token0Amount = BigInt(0);
		newRecord.token1Amount = BigInt(0);
		newRecord.price1 = BigInt(0);
		newRecord.price0 = BigInt(0);
		newRecord.blockId = "";
		newRecord.timestamp = new Date();
		return newRecord;
	} else {
		return record;
	}
};

export const getAddProvision = async (id: string) => {
	const record = await AddProvision.get(id);

	if (!record) {
		const newRecord = new AddProvision(id);

		newRecord.addressId = "";
		newRecord.poolId = "";
		newRecord.token0Id = "";
		newRecord.token1Id = "";
		newRecord.token0Amount = BigInt(0);
		newRecord.token1Amount = BigInt(0);
		newRecord.price1 = BigInt(0);
		newRecord.price0 = BigInt(0);
		newRecord.blockId = "";
		newRecord.timestamp = new Date();
		return newRecord;
	} else {
		return record;
	}
};

export const getListProvision = async (id: string) => {
	const record = await ListProvision.get(id);

	if (!record) {
		const newRecord = new ListProvision(id);

		newRecord.poolId = "";
		newRecord.token0Id = "";
		newRecord.token1Id = "";
		newRecord.blockId = "";
		newRecord.timestamp = new Date();
		return newRecord;
	} else {
		return record;
	}
};

export const getProvisionPoolHourlyData = async (id: string) => {
	const record = await ProvisionPoolHourlyData.get(id);

	if (!record) {
		const newRecord = new ProvisionPoolHourlyData(id);

		newRecord.poolId = "";
		newRecord.token0Amount = BigInt(0);
		newRecord.token1Amount = BigInt(0);
		newRecord.price0 = BigInt(0);
		newRecord.price1 = BigInt(0);
		newRecord.hourlyToken0InAmount = BigInt(0);
		newRecord.hourlyToken1InAmount = BigInt(0);
		newRecord.timestamp = new Date();
		newRecord.updateAtBlockId = "";
		return newRecord;
	} else {
		return record;
	}
};

export const getProvisionToEnabled = async (id: string) => {
	const record = await ProvisionToEnabled.get(id);

	if (!record) {
		const newRecord = new ProvisionToEnabled(id);

		newRecord.addressId = "";
		newRecord.poolId = "";
		newRecord.token0Amount = BigInt(0);
		newRecord.token1Amount = BigInt(0);
		newRecord.token0Id = "";
		newRecord.token1Id = "";
		newRecord.totalShareAmount = BigInt(0);
		newRecord.blockId = "";
		newRecord.timestamp = new Date();
		return newRecord;
	} else {
		return record;
	}
};

export const getRemoveLiquidity = async (id: string) => {
	const record = await RemoveLiquidity.get(id);

	if (!record) {
		const newRecord = new RemoveLiquidity(id);

		newRecord.addressId = "";
		newRecord.poolId = "";
		newRecord.token0Amount = BigInt(0);
		newRecord.token1Amount = BigInt(0);
		newRecord.token0Id = "";
		newRecord.token1Id = "";
		newRecord.price0 = BigInt(0);
		newRecord.price1 = BigInt(0);
		newRecord.shareAmount = BigInt(0);
		newRecord.blockId = "";
		newRecord.timestamp = new Date();
		return newRecord;
	} else {
		return record;
	}
};

export const getSwap = async (id: string) => {
	const record = await Swap.get(id);

	if (!record) {
		const newRecord = new Swap(id);

		newRecord.addressId = "";
		newRecord.poolId = "";
		newRecord.token0Id = "";
		newRecord.token1Id = "";
		newRecord.token0InAmount = BigInt('');
		newRecord.token1OutAmount = BigInt('');
		newRecord.tradePath = '';
		newRecord.blockId = "";
		newRecord.timestamp = new Date();
		return newRecord;
	} else {
		return record;
	}
};

export const getTokenDailyData = async (id: string) => {
	const record = await TokenDailyData.get(id);

	if (!record) {
		const newRecord = new TokenDailyData(id);

		newRecord.tokenId = "";
		newRecord.amount = BigInt(0);
		newRecord.tvl = BigInt(0);
		newRecord.dailyTradeVolume = BigInt(0);
		newRecord.dailyTradeVolumeUSD = BigInt(0);
		newRecord.dailyTxCount = BigInt(0);
		newRecord.timestamp = new Date();
		newRecord.updateAtBlockId = "";
		newRecord.price = BigInt(0);
		return newRecord;
	} else {
		return record;
	}
};