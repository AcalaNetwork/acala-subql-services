import { SubstrateEvent } from "@subql/types";
import { ensureAccount, ensureCollateral, updateDailyLoanReport, updateHourLoanReport, updateLoanPosition } from "../handlers";

export async function handlePositionUpdated(event: SubstrateEvent): Promise<void> {
    const [owner, token, collateralAmount, debitAmount] = event.event.data;

    ensureAccount(owner.toString());
    ensureCollateral(token.toString());

    await updateLoanPosition(event);

    await updateHourLoanReport(event, 'PositionUpdate');
    await updateDailyLoanReport(event, 'PositionUpdate');

}

export async function handleConfiscateCollateralAndDebit(event: SubstrateEvent): Promise<void> {
    const [owner, token, collateralAmount, debitAmount] = event.event.data;

    await updateLoanPosition(event, true);

    await updateHourLoanReport(event, 'ConfiscateCollateralAndDebit');
    await updateDailyLoanReport(event, 'ConfiscateCollateralAndDebit');
}

export async function handleTransferLoan(event: SubstrateEvent): Promise<void> {
    // const [owner, token, collateralAmount, debitAmount] = event.event.data;

    // await updateHourLoanReport(event, 'TransferLoan');
    // await updateDailyLoanReport(event, 'TransferLoan');
}