import { Rate, OptionRate } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types"
import { DailyGlobalPosition, DailyLoanPosition, GlobalPosition, HourGlobalPosition, HourLoanPosition, LoanPosition } from "../types";
import { add, getDailyTimeString, getHourTimeString } from "../utils"

export const updateLoanPosition = async (event: SubstrateEvent, isLiquidatiton = false) => {
  const [owner, token, collateralAmount, debitAmount] = event.event.data;

  const _owner = owner.toString();
  const _token = token.toString();
  const _collateralAmount = isLiquidatiton ? (BigInt(0) - BigInt(collateralAmount.toString())) : BigInt(collateralAmount.toString());
  const _debitAmount = isLiquidatiton ? (BigInt(0) - BigInt(debitAmount.toString())) : BigInt(debitAmount.toString())

  // personal part
  const positionId = `${_owner}-${_token}`;
  const _position = await LoanPosition.get(positionId);

  if (_position) {
    const positionCollateralAmount = _position.collateralAmount;
    const positionDebitAmount = _position.debitAmount;
    _position.collateralAmount = positionCollateralAmount + _collateralAmount
    _position.debitAmount = positionDebitAmount + _debitAmount
    await _position.save();
  } else {
    const newPosition = new LoanPosition(positionId);
    newPosition.ownerId = _owner;
    newPosition.collateralId = _token;
    newPosition.collateralAmount = _collateralAmount;
    newPosition.debitAmount = _collateralAmount;
    await newPosition.save();
  }

  // global part
  const globalPositionId = _token;
  const _globalPosition = await GlobalPosition.get(globalPositionId);

  if(_globalPosition) {
    const globalpositionCollateralAmount = _globalPosition.collateralAmount;
    const globalpositionDebitAmount = _globalPosition.debitAmount;
    _globalPosition.collateralAmount = globalpositionCollateralAmount + _collateralAmount
    _globalPosition.debitAmount = globalpositionDebitAmount + _debitAmount
    await _globalPosition.save();

  } else {
    const newGlobalPosition = new GlobalPosition(globalPositionId);
    newGlobalPosition.tokenId = globalPositionId;
    newGlobalPosition.collateralAmount = _collateralAmount;
    newGlobalPosition.debitAmount = _debitAmount;
    await newGlobalPosition.save();
  }

  const debitExchangeRate = (await api.query.cdpEngine.debitExchangeRate(token)) as unknown as OptionRate;
  const globalExchangeRate = api.consts.cdpEngine.defaultDebitExchangeRate as unknown as Rate;
  const exchangeRate = debitExchangeRate.isNone ? BigInt(globalExchangeRate.toString()) : BigInt(debitExchangeRate.unwrapOrDefault().toString());

  await updateHourLoanPosition(_owner, _token, _collateralAmount, _debitAmount, event.block.timestamp, exchangeRate);
  await updateDailyLoanPosition(_owner, _token, _collateralAmount, _debitAmount, event.block.timestamp, exchangeRate);
}

export const updateHourLoanPosition = async (owner: string, token: string, collateralAmount: bigint, debitAmount: bigint, timestamp: Date, exchangeRate: bigint) => {
  const timeKey = getHourTimeString(timestamp);

  // personal part
  const positionId = `${owner}-${token}-${timeKey}`;
  const _hourPosition = await HourLoanPosition.get(positionId);

  if(_hourPosition) {
    const positionCollateralAmount = _hourPosition.collateralAmount;
    const positionDebitAmount = _hourPosition.debitAmount;
    _hourPosition.collateralAmount = positionCollateralAmount + collateralAmount
    _hourPosition.debitAmount = positionDebitAmount + debitAmount
    await _hourPosition.save();

  } else {
    const newHourPosition = new HourLoanPosition(positionId);
    newHourPosition.ownerId = owner;
    newHourPosition.timestamp = timeKey;
    newHourPosition.debitExchangeRate = exchangeRate;
    newHourPosition.debitAmount = debitAmount;
    newHourPosition.collateralId = token;
    newHourPosition.collateralAmount = collateralAmount;
    await newHourPosition.save();
  }

  // global part
  const globalPositionId = `${owner}-${token}-${timeKey}`;
  const _hourGlobalPosition = await HourGlobalPosition.get(globalPositionId);

  if(_hourGlobalPosition) {
    const hourGlobalPositionCollateralAmount = _hourGlobalPosition.collateralAmount;
    const hourGlobalPositionDebitAmount = _hourGlobalPosition.debitAmount;
    _hourGlobalPosition.collateralAmount = hourGlobalPositionCollateralAmount + collateralAmount
    _hourGlobalPosition.debitAmount = hourGlobalPositionDebitAmount + debitAmount
    await _hourGlobalPosition.save();
  } else {
    const newHourGlobalPosition = new HourGlobalPosition(globalPositionId);
    newHourGlobalPosition.collateralAmount = collateralAmount;
    newHourGlobalPosition.debitAmount = debitAmount;
    newHourGlobalPosition.tokenId = token;
    await newHourGlobalPosition.save();
  }
}

export const updateDailyLoanPosition = async (owner: string, token: string, collateralAmount: bigint, debitAmount: bigint, timestamp: Date, exchangeRate: bigint) => {
  const timeKey = getDailyTimeString(timestamp);

  // personal part
  const positionId = `${owner}-${token}-${timeKey}`;
  const _dailyPosition = await DailyLoanPosition.get(positionId);

  if(_dailyPosition) {
    const positionCollateralAmount = _dailyPosition.collateralAmount;
    const positionDebitAmount = _dailyPosition.debitAmount;
    _dailyPosition.collateralAmount = positionCollateralAmount + collateralAmount
    _dailyPosition.debitAmount = positionDebitAmount + debitAmount
    await _dailyPosition.save();

  } else {
    const newDailyPosition = new DailyLoanPosition(positionId);
    newDailyPosition.ownerId = owner;
    newDailyPosition.timestamp = timeKey;
    newDailyPosition.debitExchangeRate = exchangeRate;
    newDailyPosition.debitAmount = debitAmount;
    newDailyPosition.collateralId = token;
    newDailyPosition.collateralAmount = collateralAmount;
    await newDailyPosition.save();
  }

  // global part
  const globalPositionId = `${owner}-${token}-${timeKey}`;
  const _dailyGlobalPosition = await DailyGlobalPosition.get(globalPositionId);

  if(_dailyGlobalPosition) {
    const dailyGlobalPositionCollateralAmount = _dailyGlobalPosition.collateralAmount;
    const dailyGlobalPositionDebitAmount = _dailyGlobalPosition.debitAmount;
    _dailyGlobalPosition.collateralAmount = dailyGlobalPositionCollateralAmount + collateralAmount
    _dailyGlobalPosition.debitAmount = dailyGlobalPositionDebitAmount + debitAmount
    await _dailyGlobalPosition.save();
  } else {
    const newDailyGlobalPosition = new DailyGlobalPosition(globalPositionId);
    newDailyGlobalPosition.collateralAmount = collateralAmount;
    newDailyGlobalPosition.debitAmount = debitAmount;
    newDailyGlobalPosition.tokenId = token;
    await newDailyGlobalPosition.save();
  }
}