import { forceToCurrencyIdName } from "@acala-network/sdk-core";
import { SubstrateEvent } from "@subql/types";
import { updateLoanPosition } from "../handlers";
import { updateParams } from "../handlers/params";
import { getLoanHistory } from "../utils/record";

export async function handlePositionUpdated(event: SubstrateEvent): Promise<void> {
	await updateLoanPosition(event, false);
}

export async function handleConfiscateCollateralAndDebit(event: SubstrateEvent): Promise<void> {
	await updateLoanPosition(event, true);
}

export async function handleTransferLoan(event: SubstrateEvent): Promise<void> {
	logger.info(`handleTransferLoan: ${JSON.stringify(event)}`);
}

export async function handleParamsUpdated(event: SubstrateEvent): Promise<void> {
	await updateParams(event, 'cdp');
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
	history.collateralAmount = BigInt(collateral_amount.toString());
	history.badDebitValue = BigInt(bad_debt_value.toString());
	history.liquidationStrategy = liquidation_strategy.toString();
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