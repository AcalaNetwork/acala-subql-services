import { Collateral, DailyCollateral, HourlyCollateral } from "../types";

export const updateCollateral = (
  collateral: Collateral,
  depositAmount: bigint,
  debitAmount: bigint
) => {
  collateral.depositAmount = depositAmount;
  collateral.debitAmount = debitAmount;
  collateral.txCount = collateral.txCount + 1;
}

export const updateHourlyCollateral = (
  collateral: Collateral,
  hourly: HourlyCollateral,
  exchangeRate: bigint,
  depositVolumeUSD: bigint,
  debitVolumeUSD: bigint,
  depositChanged: bigint,
  debitChanged: bigint,
  depositChangedUSD: bigint,
  debitChangedUSD: bigint
) => {
  hourly.depositAmount = collateral.depositAmount;
  hourly.debitAmount = collateral.debitAmount;
  hourly.depositVolumeUSD = depositVolumeUSD;
  hourly.debitVolumeUSD = debitVolumeUSD;
  hourly.depositChanged = hourly.depositChanged + depositChanged
  hourly.debitChanged = hourly.debitChanged + debitChanged
  hourly.depositChangedUSD = hourly.depositChangedUSD + depositChangedUSD
  hourly.debitChangedUSD = hourly.debitChangedUSD + debitChangedUSD
  hourly.debitExchangeRate = exchangeRate;
  hourly.txCount = hourly.txCount + 1;
}

export const updateDailyCollateral = (
  collateral: Collateral,
  daily: DailyCollateral,
  exchangeRate: bigint,
  depositVolumeUSD: bigint,
  debitVolumeUSD: bigint,
  depositChanged: bigint,
  debitChanged: bigint,
  depositChangedUSD: bigint,
  debitChangedUSD: bigint
) => {
  daily.depositAmount = collateral.depositAmount;
  daily.debitAmount = collateral.debitAmount;
  daily.depositVolumeUSD = depositVolumeUSD;
  daily.debitVolumeUSD = debitVolumeUSD;
  daily.depositChanged = daily.depositChanged + depositChanged
  daily.debitChanged = daily.debitChanged + debitChanged
  daily.depositChangedUSD = daily.depositChangedUSD + depositChangedUSD
  daily.debitChangedUSD = daily.debitChangedUSD + debitChangedUSD
  daily.debitExchangeRate = exchangeRate;
  daily.txCount = daily.txCount + 1;
}
