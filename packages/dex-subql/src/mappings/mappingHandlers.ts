import { SubstrateEvent } from "@subql/types";
import { addLiquidity, addProvision, listProvision, removeLiquidity, swap, stableAssetSwap } from "../handlers";
import { provisionToEnable } from "../handlers";

export * from '../handlers/handleEnableTradingPair';

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

export async function handleStableAssetSwap(event: SubstrateEvent): Promise<void> {
    await stableAssetSwap(event);
}