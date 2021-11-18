import { forceToCurrencyIdName } from "@acala-network/sdk-core";
import { SubstrateEvent } from "@subql/types";
import { updateDailyLoanReport, updateHourLoanReport, updateLoanPosition } from "../handlers";

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