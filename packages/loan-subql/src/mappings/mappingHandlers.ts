import { SubstrateEvent } from "@subql/types";
import { transferLoan, liquidateUnsafeCDP, updateParams, closeByDex } from "../handlers";
import { initWrapper } from "../handlers/init";
import { handleLoanPositionUpdate, handleConfiscate } from '../handlers/updateLoanPosition';

export const handleParamsUpdated = initWrapper(async (event: SubstrateEvent): Promise<void> => {
	await updateParams(event);
});

export const handleLiquidateUnsafeCDP = initWrapper(async (event: SubstrateEvent): Promise<void> => {
	await liquidateUnsafeCDP(event);
});

export const handleCloseCDPInDebitByDEX = initWrapper(async (event: SubstrateEvent): Promise<void> => {
	await closeByDex(event);
});

export const handlePositionUpdated = initWrapper(async (event: SubstrateEvent): Promise<void> => {
	await handleLoanPositionUpdate(event);
});

export const handleConfiscateCollateralAndDebit = initWrapper(async (event: SubstrateEvent): Promise<void> => {
	await handleConfiscate(event);
});

export const handleTransferLoan = initWrapper(async (event: SubstrateEvent): Promise<void> => {
	await transferLoan(event);
});