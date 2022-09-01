import { TradingPair } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { ensureBlock, ensureExtrinsic } from ".";
import { getToken, getProvisionPool, getListProvision, getAccount } from "../utils";
import { getPoolId } from "../utils/getPoolId";

export const listProvision = async (event: SubstrateEvent) => {
	// [trading_pair]
	const [tradingPair] = event.event.data as unknown as [TradingPair];
	const blockData = await ensureBlock(event);

	const [poolId, token0Id, token1Id] = getPoolId(tradingPair[0], tradingPair[1]);

	await getToken(token0Id);
	await getToken(token1Id);
	await getToken(poolId);

	const provisionPool = await getProvisionPool(poolId);
	provisionPool.token0Id = token0Id;
	provisionPool.token1Id = token1Id;
	provisionPool.startAtBlockId = blockData.id;
	provisionPool.startAt = blockData.timestamp;

	await provisionPool.save();
	await createlistProvisionHistroy(event);
};

export const createlistProvisionHistroy = async (event: SubstrateEvent) => {
	const [tradingPair] = event.event.data as unknown as [TradingPair];
	const blockData = await ensureBlock(event);

	const [poolId, token0Id, token1Id] = getPoolId(tradingPair[0], tradingPair[1]);
	const history  = await getListProvision(`${blockData.hash}-${event.idx}`);
	history.poolId = poolId;
	history.token0Id = token0Id;
	history.token1Id = token1Id;
	history.blockId = blockData.id;

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