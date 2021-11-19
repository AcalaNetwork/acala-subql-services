import { forceToCurrencyIdName, FixedPointNumber } from "@acala-network/sdk-core";
import { SubstrateEvent } from "@subql/types"
import { getDateEndOfDay, getDateEndOfHour } from '@acala-network/subql-utils';
import { getAccount, getCollateral, getDailyGlobalPosition, getDailyLoanPosition, getGlobalLoanPosition, getHourGolbalPosition, getHourLoanPosition, getLoanHistory, getLoanPosition } from "../utils/record";
import { getExchangeRateFromDb } from "../utils";

const getLoanMessage = (_collateral: bigint, _debit: bigint) => {
  const collateral = FixedPointNumber.fromInner(_collateral.toString());
  const debit = FixedPointNumber.fromInner(_debit.toString());

  let type = '';
  let amount = '';

  if (collateral.lt(FixedPointNumber.ZERO)) {
    type = 'Withdraw';
    amount = FixedPointNumber.ZERO.minus(collateral).toString();
  }

  if (collateral.isGreaterThan(FixedPointNumber.ZERO)) {
    type = 'Deposit';
    amount = collateral.toString();
  }

  if (debit.isGreaterThan(FixedPointNumber.ZERO)) {
    type = 'Mint';
    amount = debit.toString();
  }

  if (debit.lt(FixedPointNumber.ZERO)) {
    type = 'Payback';
    amount = FixedPointNumber.ZERO.minus(debit).toString();
  }

  return { type, amount }
}

export const updateLoanPosition = async (event: SubstrateEvent, isLiquidatiton = false) => {
  const [account, collateral, collateral_amount, debit_amount] = event.event.data;

  const _account = await getAccount(account.toString());
  const _token = await getCollateral(forceToCurrencyIdName(collateral));

  const owner = _account.id;
  const token = _token.id;
  const collateralAmount = isLiquidatiton ? -BigInt(collateral_amount.toString()) : BigInt(collateral_amount.toString());
  const debitAmount = isLiquidatiton ? -BigInt(debit_amount.toString()) : BigInt(debit_amount.toString());

  const exchangeRate = await getExchangeRateFromDb(BigInt(event.block.block.header.number.toString()), collateral);

  // loanposition personal part
  const positionId = `${owner}-${token}`;
  const position = await getLoanPosition(positionId);

  const positionCollateralAmount = position.collateralAmount;
  const positionDebitAmount = position.debitAmount;
  position.collateralAmount = positionCollateralAmount + collateralAmount
  position.debitAmount = positionDebitAmount + debitAmount
  position.ownerId = owner;
  position.collateralId = token;

  // loanposition global part
  const globalPositionId = token;
  const globalPosition = await getGlobalLoanPosition(globalPositionId);

  const globalPositionCollateralAmount = globalPosition.collateralAmount;
  const globalPositionDebitAmount = globalPosition.debitAmount;
  globalPosition.collateralAmount = globalPositionCollateralAmount + collateralAmount
  globalPosition.debitAmount = globalPositionDebitAmount + debitAmount
  globalPosition.collateralId = token;


  const hourTimeKey = getDateEndOfHour(event.block.timestamp).toDate().getTime();
  // hourloanposition personal part
  const hourPositionId = `${owner}-${token}-${hourTimeKey}`;
  const hourPosition = await getHourLoanPosition(hourPositionId);
  const hourPositionCollateralAmount = hourPosition.collateralAmount;
  const hourPositionDebitAmount = hourPosition.debitAmount;
  hourPosition.collateralAmount = hourPositionCollateralAmount + collateralAmount
  hourPosition.debitAmount = hourPositionDebitAmount + debitAmount
  hourPosition.ownerId = owner;
  hourPosition.timestamp = event.block.timestamp;
  hourPosition.debitExchangeRate = exchangeRate;
  hourPosition.collateralId = token;

  // hourloanposition global part
  const globalHourPositionId = `${token}-${hourTimeKey}`;
  const hourGlobalPosition = await getHourGolbalPosition(globalHourPositionId);

  const hourGlobalPositionCollateralAmount = hourGlobalPosition.collateralAmount;
  const hourGlobalPositionDebitAmount = hourGlobalPosition.debitAmount;
  hourGlobalPosition.collateralAmount = hourGlobalPositionCollateralAmount + collateralAmount
  hourGlobalPosition.debitAmount = hourGlobalPositionDebitAmount + debitAmount
  hourGlobalPosition.timestamp = event.block.timestamp;
  hourGlobalPosition.debitExchangeRate = exchangeRate;
  hourGlobalPosition.collateralId = token;


  const DailyTimeKey = getDateEndOfDay(event.block.timestamp).toDate().getTime();
  // personal part
  const dailyPositionId = `${owner}-${token}-${DailyTimeKey}`;
  const dailyPosition = await getDailyLoanPosition(dailyPositionId);

  const dailyPositionCollateralAmount = dailyPosition.collateralAmount;
  const dailyPositionDebitAmount = dailyPosition.debitAmount;
  dailyPosition.collateralAmount = dailyPositionCollateralAmount + collateralAmount
  dailyPosition.debitAmount = dailyPositionDebitAmount + debitAmount
  dailyPosition.ownerId = owner;
  dailyPosition.timestamp = event.block.timestamp;
  dailyPosition.debitExchangeRate = exchangeRate;
  dailyPosition.collateralId = token;

  // global part
  const dailyGlobalPositionId = `${token}-${DailyTimeKey}`;
  const dailyGlobalPosition = await getDailyGlobalPosition(dailyGlobalPositionId)

  const dailyGlobalPositionCollateralAmount = dailyGlobalPosition.collateralAmount;
  const dailyGlobalPositionDebitAmount = dailyGlobalPosition.debitAmount;
  dailyGlobalPosition.collateralAmount = dailyGlobalPositionCollateralAmount + collateralAmount
  dailyGlobalPosition.debitAmount = dailyGlobalPositionDebitAmount + debitAmount
  dailyGlobalPosition.collateralId = token;
  dailyGlobalPosition.debitExchangeRate = exchangeRate;
  dailyGlobalPosition.timestamp = event.block.timestamp;

  const historyId = `${event.block.block.hash.toString()}-${event.event.index.toString()}`
  const history = await getLoanHistory(historyId);
  const { type, amount } = getLoanMessage(collateralAmount, debitAmount);

  history.ownerId = owner;
  history.collateralId = token;
  history.type = type;
  history.collateralAmount = collateralAmount;
  history.debitAmount = debitAmount;
  history.exchangeRate = exchangeRate;
  history.displayMessage = `${type} ${amount} ${token}`;
  history.atBlock = BigInt(event.block.block.header.number.toString());
  history.atBlockHash = event.block.block.hash.toString();
  history.atExtrinsicHash = event.extrinsic.extrinsic.hash.toString();
  history.timestamp = event.block.timestamp;

  await position.save();
  await globalPosition.save();
  await hourPosition.save();
  await hourGlobalPosition.save();
  await dailyPosition.save();
  await dailyGlobalPosition.save();
  await history.save();
}