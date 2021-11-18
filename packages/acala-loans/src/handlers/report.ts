import { FixedPointNumber } from "@acala-network/sdk-core";
import { SubstrateEvent } from "@subql/types";
import { DailyLoanReport, HourLoanReport } from "../types";
import { getDailyTimeString, getHourTimeString } from "../utils";

export type TAcition = 'PositionUpdate' | "ConfiscateCollateralAndDebit" | "TransferLoan";

export const updateHourLoanReport = async (event: SubstrateEvent, type: TAcition) => {
  const [owner, token, collateralAmount, debitAmount] = event.event.data;
  const timeKey = getHourTimeString(event.block.timestamp);

  const collateralChange = !FixedPointNumber.fromInner(collateralAmount.toString()).eq(FixedPointNumber.ZERO);
  const debitChange = !FixedPointNumber.fromInner(debitAmount.toString()).eq(FixedPointNumber.ZERO);

  const _report = await HourLoanReport.get(timeKey);
  if (_report) {
    _report.actionCount = (Number(_report.actionCount) + 1).toString();
    _report.collateralChange = (Number(_report.collateralChange) + Number(collateralChange)).toString();
    _report.debitChange = (Number(_report.debitChange) + Number(debitChange)).toString();
    await _report.save();
  } else {
    const newReport = new HourLoanReport(timeKey);
    newReport.timestamp = timeKey;
    newReport.debitChange = debitChange ? '1' : '0';
    newReport.collateralChange = collateralChange ? '1' : '0';
    newReport.actionCount = '1';
    await newReport.save();
  }
}

export const updateDailyLoanReport = async (event: SubstrateEvent, type: TAcition) => {
  const [owner, token, collateralAmount, debitAmount] = event.event.data;
  const timeKey = getDailyTimeString(event.block.timestamp);

  const collateralChange = !FixedPointNumber.fromInner(collateralAmount.toString()).eq(FixedPointNumber.ZERO);
  const debitChange = !FixedPointNumber.fromInner(debitAmount.toString()).eq(FixedPointNumber.ZERO);

  const _report = await DailyLoanReport.get(timeKey);
  if (_report) {
    _report.actionCount = (Number(_report.actionCount) + 1).toString();
    _report.collateralChange = (Number(_report.collateralChange) + Number(collateralChange)).toString();
    _report.debitChange = (Number(_report.debitChange) + Number(debitChange)).toString();
    await _report.save();
  } else {
    const newReport = new DailyLoanReport(timeKey);
    newReport.timestamp = timeKey;
    newReport.debitChange = debitChange ? '1' : '0';
    newReport.collateralChange = collateralChange ? '1' : '0';
    newReport.actionCount = '1';
    await newReport.save();
  }
}