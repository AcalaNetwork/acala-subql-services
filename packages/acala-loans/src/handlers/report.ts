import { FixedPointNumber } from "@acala-network/sdk-core";
import { SubstrateEvent } from "@subql/types";
import { getDateEndOfDay, getDateEndOfHour } from '@acala-network/subql-utils';
import { getDailyPositionReport, getHourPositionReport } from "../utils/record";

export const updateHourLoanReport = async (event: SubstrateEvent) => {
  const [owner, token, collateralAmount, debitAmount] = event.event.data;
  const timeKey = getDateEndOfHour(event.block.timestamp).toDate().getTime().toString();

  const collateralChange = !FixedPointNumber.fromInner(collateralAmount.toString()).eq(FixedPointNumber.ZERO);
  const debitChange = !FixedPointNumber.fromInner(debitAmount.toString()).eq(FixedPointNumber.ZERO);

  const _report = await getHourPositionReport(timeKey);
  _report.actionCount = BigInt(_report.actionCount) + BigInt(1);
  _report.collateralChange = BigInt(_report.collateralChange) + BigInt(collateralChange);
  _report.debitChange = BigInt(_report.debitChange) + BigInt(debitChange);
  _report.timestamp = event.block.timestamp;
  await _report.save();
}

export const updateDailyLoanReport = async (event: SubstrateEvent) => {
  const [owner, token, collateralAmount, debitAmount] = event.event.data;
  const timeKey = getDateEndOfDay(event.block.timestamp).toDate().getTime().toString();

  const collateralChange = !FixedPointNumber.fromInner(collateralAmount.toString()).eq(FixedPointNumber.ZERO);
  const debitChange = !FixedPointNumber.fromInner(debitAmount.toString()).eq(FixedPointNumber.ZERO);

  const _report = await getDailyPositionReport(timeKey);
  _report.actionCount = BigInt(_report.actionCount) + BigInt(1);
  _report.collateralChange = BigInt(_report.collateralChange) + BigInt(collateralChange);
  _report.debitChange = BigInt(_report.debitChange) + BigInt(debitChange);
  _report.timestamp = event.block.timestamp;
  await _report.save();
}