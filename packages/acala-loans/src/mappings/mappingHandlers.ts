import { SubstrateEvent } from "@subql/types";
import { updateDailyLoanReport, updateHourLoanReport, updateLoanPosition } from "../handlers";
import { updateParams } from "../handlers/params";

export async function handlePositionUpdated(event: SubstrateEvent): Promise<void> {
    await updateLoanPosition(event);
    await updateHourLoanReport(event);
    await updateDailyLoanReport(event);
}

export async function handleConfiscateCollateralAndDebit(event: SubstrateEvent): Promise<void> {
    await updateLoanPosition(event);
    await updateHourLoanReport(event);
    await updateDailyLoanReport(event);
}

export async function handleTransferLoan(event: SubstrateEvent): Promise<void> {
}

export async function handleParamsUpdated (event: SubstrateEvent): Promise<void> {
    await updateParams(event);
}