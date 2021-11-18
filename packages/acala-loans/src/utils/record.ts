import { Account, Collateral, DailyGlobalPosition, DailyLoanPosition, DailyLoanReport, GlobalPosition, HourGlobalPosition, HourLoanPosition, HourLoanReport, LoanPosition } from "../types"
import { ExchangeRate } from "../types/models/ExchangeRate";

export const getAccount = async (address: string) => {
  const _account = await Account.get(address);
  if (!_account) {
    const newAccount = new Account(address);
    newAccount.address = address;
    await newAccount.save();
    return newAccount;
  } else {
    return _account;
  }
}

export const getCollateral = async (token: string) => {
  const _collateral = await Collateral.get(token);
  if (!_collateral) {
    const newCollateral = new Collateral(token);
    newCollateral.token = token;
    newCollateral.save();
    return newCollateral;
  } else {
    return _collateral;
  }
}


export const getLoanPosition = async (id: string) => {
  const record = await LoanPosition.get(id);

  if (!record) {
    const newRecord = new LoanPosition(id);

    newRecord.collateralAmount = BigInt(0);
    newRecord.collateralId = '';
    newRecord.debitAmount = BigInt(0);
    newRecord.ownerId = '';

    return newRecord;
  } else {
    return record;
  }

}

export const getGlobalLoanPosition = async (id: string) => {
  const record = await GlobalPosition.get(id);

  if (!record) {
    const newRecord = new GlobalPosition(id);

    newRecord.collateralAmount = BigInt(0);
    newRecord.debitAmount = BigInt(0);
    newRecord.collateralId = '';

    return newRecord;
  } {
    return record;
  }

  
}

export const getHourLoanPosition = async (id: string) => {
  const record = await HourLoanPosition.get(id);

  if (!record) {
    const newRecord = new HourLoanPosition(id);

    newRecord.collateralAmount = BigInt(0);
    newRecord.collateralId = '';
    newRecord.debitAmount = BigInt(0);
    newRecord.ownerId = '';
    newRecord.timestamp = new Date();
    newRecord.debitExchangeRate = BigInt(0);

    return newRecord;
  } else {
    return record;
  }
}

export const getHourGolbalPosition = async (id: string) => {
  const record = await HourGlobalPosition.get(id);

  if (!record) {
    const newRecord = new HourGlobalPosition(id);

    newRecord.collateralAmount = BigInt(0);
    newRecord.debitAmount = BigInt(0);
    newRecord.timestamp = new Date();
    newRecord.collateralId = '';
    newRecord.debitExchangeRate = BigInt(0);

    return newRecord;
  }else {
    return record;
  }
}

export const getDailyLoanPosition = async (id: string) => {
  const record = await DailyLoanPosition.get(id);

  if (!record) {
    const newRecord = new DailyLoanPosition(id);

    newRecord.collateralAmount = BigInt(0);
    newRecord.collateralId = '';
    newRecord.debitAmount = BigInt(0);
    newRecord.ownerId = '';
    newRecord.timestamp = new Date();
    newRecord.debitExchangeRate = BigInt(0);

    return newRecord;
  } else {
    return record
  }
}

export const getDailyGlobalPosition = async (id: string) => {
  const record = await DailyGlobalPosition.get(id);

  if (!record) {
    const newRecord = new DailyGlobalPosition(id);

    newRecord.collateralAmount = BigInt(0);
    newRecord.debitAmount = BigInt(0);
    newRecord.timestamp = new Date();
    newRecord.collateralId = '';
    newRecord.debitExchangeRate = BigInt(0);

    return newRecord;
  } else {
    return record;
  }
}

export const getHourPositionReport = async (id: string) => {
  const record = await HourLoanReport.get(id);

  if (!record) {
    const newRecord = new HourLoanReport(id);

    newRecord.actionCount = BigInt(0);
    newRecord.collateralChange = BigInt(0);
    newRecord.debitChange = BigInt(0);
    newRecord.timestamp = new Date();

    return newRecord;
  } else {
    return record;
  }
}

export const getDailyPositionReport = async (id: string) => {
  const record = await DailyLoanReport.get(id);

  if (!record) {
    const newRecord = new DailyLoanReport(id);

    newRecord.actionCount = BigInt(0);
    newRecord.collateralChange = BigInt(0);
    newRecord.debitChange = BigInt(0);
    newRecord.timestamp = new Date();

    return newRecord;
  } else {
    return record;
  }
}

export const getExchangeRate = async (id: string | number) => {
  const record = await ExchangeRate.get(id.toString());

  if (!record) {
    const newRecord = new ExchangeRate(id.toString());
    
    newRecord.debitExchangeRate = BigInt(0);

    return newRecord;
  } else {
    return record;
  }
}