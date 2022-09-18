import { SubstrateBlock, SubstrateEvent } from "@subql/types";
import { addLiquidity, addProvision, listProvision, removeLiquidity, swap } from "../handlers";
import { provisionToEnable } from "../handlers";
import { forceUpdatePositions } from "../handlers/forceUpdatePositions";

const isAcala = api.registry.chainSS58 === 10;
const acalaForceUpdateAt = BigInt(1889000);

export const handleBlock = async (block: SubstrateBlock) => {
	const height = block.block.header.number.toBigInt();

	if (height === acalaForceUpdateAt && isAcala) {
		await forceUpdatePositions();
	}
}

export const handleProvisioningToEnabled = async (event: SubstrateEvent) => {


	await provisionToEnable(event);
};

export const handleAddLiquidity = async (event: SubstrateEvent) => {
	await addLiquidity(event);
};

export const handleRemoveLiquidity = async (event: SubstrateEvent) => {
	await removeLiquidity(event);
};

export const handleSwap = async (event: SubstrateEvent) => {
	await swap(event);
};

export const handleListProvision = async (event: SubstrateEvent) => {
	await listProvision(event);
};

export const handleAddProvision = async (event: SubstrateEvent) => {
	await addProvision(event);
};
