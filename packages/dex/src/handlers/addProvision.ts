import { AccountId, Balance, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { ensureBlock, ensureExtrinsic } from ".";
import { getAccount, getAddProvision, getProvisionPool, getProvisionPoolHourlyData, getStartOfDay, getStartOfHour, getToken, getTokenDailyData, getUserProvision, queryPrice } from "../utils";
import { getPoolId } from "../utils/getPoolId";

export const addProvision = async (event: SubstrateEvent) => {
	// [who, currency_id_0, contribution_0, currency_id_1, contribution_1]
	const [account, _token0, _token0Amount, _token1, _token1Amount] = event.event.data as unknown as [AccountId, CurrencyId, Balance, CurrencyId, Balance];
	const [poolId, token0Name, token1Name] = getPoolId(_token0, _token1);
	const blockData = await ensureBlock(event);
	const { address } = await getAccount(account.toString());
	const hourTime = getStartOfHour(blockData.timestamp);

	await getToken(token0Name);
	await getToken(token1Name);

	const token0Amount = BigInt(_token0Amount.toString());
	const token1Amount = BigInt(_token1Amount.toString());

	const provisionPool = await getProvisionPool(poolId);
	provisionPool.token0Id = token0Name;
	provisionPool.token1Id = token1Name;
	provisionPool.token0Amount = provisionPool.token0Amount + token0Amount;
	provisionPool.token1Amount = provisionPool.token1Amount + token1Amount;
	provisionPool.txCount = provisionPool.txCount + BigInt(1);

	await provisionPool.save();
	await addHourProvisionPool(blockData.id, hourTime, poolId, token0Amount, token1Amount);
	await addUserProvision(address, poolId, token0Amount, token1Amount);
	await createAddProvisionHistory(event, address, poolId, token0Name, token1Name, token0Amount, token1Amount);
};

export const addHourProvisionPool = async (number: string, hourTime: Date, poolId: string, token0Amount: bigint, token1Amount: bigint) => {
	const hourPoolId = `${poolId}-${hourTime.getTime()}`;
	const hourProvisionPool = await getProvisionPoolHourlyData(hourPoolId);
	hourProvisionPool.poolId = poolId;
	hourProvisionPool.token0Amount = token0Amount;
	hourProvisionPool.token1Amount = token1Amount;
	hourProvisionPool.hourlyToken0InAmount = hourProvisionPool.hourlyToken0InAmount + token0Amount;
	hourProvisionPool.hourlyToken1InAmount = hourProvisionPool.hourlyToken1InAmount + token1Amount;
	hourProvisionPool.timestamp = hourTime;
	hourProvisionPool.updateAtBlockId = number;

	await hourProvisionPool.save();
};

export const addUserProvision = async (account: string, poolId: string, token0Amount: bigint, token1Amount: bigint) => {
	const userPoolId = `${poolId}-${account.toString()}`;
	const userPool = await getUserProvision(userPoolId);
	userPool.ownerId = account
	userPool.poolId = poolId;
	userPool.token0Amount = userPool.token0Amount + token0Amount;
	userPool.token1Amount = userPool.token1Amount + token1Amount;

	await userPool.save();
};

export const createAddProvisionHistory = async (event: SubstrateEvent, addressId: string, poolId: string, token0: string, token1: string, token0Amount: bigint, token1Amount: bigint) => {
	const blockData = await ensureBlock(event);

	const historyId = `${blockData.hash}-${event.idx}`;
	const history = await getAddProvision(historyId);
	history.addressId = addressId;
	history.poolId = poolId;
	history.token0Id = token0;
	history.token1Id = token1;
	history.token0Amount = token0Amount;
	history.token1Amount = token1Amount;
	history.blockId = blockData.id;
	history.timestamp = blockData.timestamp;

	if (event.extrinsic) {
		const extrinsicData = await ensureExtrinsic(event);
		history.extrinsicId = extrinsicData.id;
		await getAccount(event.extrinsic.extrinsic.signer.toString());

		extrinsicData.section = event.event.section;
		extrinsicData.method = event.event.method;
		extrinsicData.addressId = event.extrinsic.extrinsic.signer.toString();

		await extrinsicData.save();
	}
	await history.save();
};