/* eslint-disable @typescript-eslint/no-unused-vars */
import { SubstrateEvent } from "@subql/types";
import { getDateStartOfDay, getDateStartOfHour } from '@acala-network/subql-utils';
import { getDailyPositionReport, getHourPositionReport } from "../utils/record";

export const updateHourLoanReport = async (event: SubstrateEvent) => {
  const [owner, token, collateralAmount, debitAmount] = event.event.data;
  const timeKey = getDateStartOfHour(event.block.timestamp).toDate();

  const collateralVolume = collateralAmount.toString() !== '0';
  const debitVolume = debitAmount.toString() !== '0';

  const report = await getHourPositionReport(timeKey.getTime().toString());
  report.txCount = BigInt(report.txCount) + BigInt(1);
  report.collateralVolume = BigInt(report.collateralVolume) + BigInt(collateralVolume);
  report.debitVolume = BigInt(report.debitVolume) + BigInt(debitVolume);
  report.timestamp = timeKey;
  await report.save();
}

export const updateDailyLoanReport = async (event: SubstrateEvent) => {
  const [owner, token, collateralAmount, debitAmount] = event.event.data;
  const timeKey = getDateStartOfDay(event.block.timestamp).toDate();

  const collateralVolume = collateralAmount.toString() !== '0';
  const debitVolume = debitAmount.toString() !== '0';

  const report = await getDailyPositionReport(timeKey.getTime().toString());
  report.txCount = BigInt(report.txCount) + BigInt(1);
  report.collateralVolume = BigInt(report.collateralVolume) + BigInt(collateralVolume);
  report.debitVolume = BigInt(report.debitVolume) + BigInt(debitVolume);
  report.timestamp = timeKey;
  await report.save();
}