import { forceToCurrencyIdName } from "@acala-network/sdk-core";
import { SubstrateEvent } from "@subql/types";
import { updateDailyLoanReport, updateHourLoanReport, updateLoanPosition } from "../handlers";
import { createParams, updateParams } from "../handlers/params";
import { getLoanHistory } from "../utils/record";

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

export async function handleParamsUpdated(event: SubstrateEvent): Promise<void> {
  const [token, amount] = event.event.data;
	const tokenName = (token.toJSON() as any).token;
	const value = BigInt(amount.toString())

	logger.info(event.event.method)
	await createParams(tokenName)
	await updateParams(event.event.method, event.block.block.header.number.toString(), tokenName, value);
}

export async function handleLiquidateUnsafeCDP(event: SubstrateEvent): Promise<void> {
	const [collateral, account, collateral_amount, bad_debt_value, liquidation_strategy] = event.event.data;

	const owner = account.toString();
	const token = forceToCurrencyIdName(collateral);

	const historyId = `${event.block.block.hash.toString()}-${event.idx.toString()}`
	const history = await getLoanHistory(historyId);

	history.ownerId = owner;
	history.collateralId = token;
	history.type = event.event.method.toString();
	history.collateralAjustment = BigInt(collateral_amount.toString());
	history.debitAjustment = BigInt(bad_debt_value.toString());
	history.liquidationStrategy = BigInt(liquidation_strategy.toString());
	history.atBlock = BigInt(event.block.block.header.number.toString());
	history.atBlockHash = event.block.block.hash.toString();
	history.atExtrinsicHash = event.extrinsic.extrinsic.hash.toString();
	history.timestamp = event.block.timestamp;

	await history.save()
}

export async function handleCloseCDPInDebitByDEX(event: SubstrateEvent): Promise<void> {
	const [collateral, account, sold_collateral_amount, refund_collateral_amount, debit_value] = event.event.data;

	const owner = account.toString();
	const token = forceToCurrencyIdName(collateral);

	const historyId = `${event.block.block.hash.toString()}-${event.idx.toString()}`
	const history = await getLoanHistory(historyId);

	history.ownerId = owner;
	history.collateralId = token;
	history.type = event.event.method.toString();
	history.soldCollateralAmount = BigInt(sold_collateral_amount.toString());
	history.refundCollateralAmount = BigInt(refund_collateral_amount.toString());
	history.debitValue = BigInt(debit_value.toString());
	history.atBlock = BigInt(event.block.block.header.number.toString());
	history.atBlockHash = event.block.block.hash.toString();
	history.atExtrinsicHash = event.extrinsic.extrinsic.hash.toString();
	history.timestamp = event.block.timestamp;

	await history.save()
}