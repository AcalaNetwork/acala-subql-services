import { CollateralParamsHistory } from "../types/models/CollateralParamsHistory";
import { getCollateral, getCollateralParams } from "../utils/record";

export const createParams = async (token: string) => {
  const record = await getCollateralParams(token);
  await getCollateral(token);

  if (!record.isExist) {
    const params = await api.query.cdpEngine.collateralParams({ Token: token });
    const defaultLiquidationRatio = await api.consts.cdpEngine.defaultLiquidationRatio;
    const defaultLiquidationPenalty = await api.consts.cdpEngine.defaultLiquidationPenalty;
    const newRecord = record.record;
    newRecord.collateralId = token;
    newRecord.maximumTotalDebitValue = BigInt((params as any).maximumTotalDebitValue.toString());
    newRecord.interestRatePerSec = BigInt((params as any).interestRatePerSec.toString());
    newRecord.liquidationRatio = (params as any).liquidationRatio ? BigInt((params as any).liquidationRatio.toString()) : BigInt(defaultLiquidationRatio.toString());
    newRecord.liquidationPenalty = (params as any).liquidationPenalty ? BigInt((params as any).liquidationPenalty.toString()) : BigInt(defaultLiquidationPenalty.toString());
    newRecord.requiredCollateralRatio = BigInt((params as any).requiredCollateralRatio.toString());

    await newRecord.save();
  }
}

export const updateParams = async (method: string, height: string, tokenName: string, value: bigint) => {
  await getCollateral(tokenName);

  const params = await getCollateralParams(tokenName);
  let field = '';
  if (method === 'InterestRatePerSecUpdated') {
    field = 'interestRatePerSec'
  } else if (method === 'LiquidationRatioUpdated') {
    field = 'liquidationRatio'
  } else if (method === 'LiquidationPenaltyUpdated') {
    field = 'liquidationPenalty'
  } else if (method === 'RequiredCollateralRatioUpdated') {
    field = 'requiredCollateralRatio'
  } else if (method === 'MaximumTotalDebitValueUpdated') {
    field = 'maximumTotalDebitValue'
  } else {
    return;
  }

  const newParams = new CollateralParamsHistory(`${height}-${tokenName}`);
  newParams.endAtBlock = BigInt(height);
  newParams.collateralId = params.record.collateralId;
  newParams.maximumTotalDebitValue = params.record.maximumTotalDebitValue;
  newParams.interestRatePerSec = params.record.interestRatePerSec;
  newParams.liquidationRatio = params.record.liquidationRatio;
  newParams.liquidationPenalty = params.record.liquidationPenalty;
  newParams.requiredCollateralRatio = params.record.requiredCollateralRatio;
  newParams[field] = BigInt(value);

  await newParams.save();
}