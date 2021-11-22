import { forceToCurrencyIdName } from "@acala-network/sdk-core";
import { SubstrateBlock, SubstrateEvent } from "@subql/types";
import { CollateralParamsHistory } from "../types/models/CollateralParamsHistory";
import { getCollateralParams } from "../utils/record";

export const createParams = async (token: string) => {
  const record = await getCollateralParams(token);

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

export const updateParams = async (event: SubstrateEvent) => {
  const [token, data] = event.event.data;
  const tokenName = forceToCurrencyIdName(token.toString());
  const value = data.toString();

  const params = await getCollateralParams(tokenName);
  let field = '';
  if (event.event.method === 'InterestRatePerSecUpdated') {
    field = 'interestRatePerSec'
  } else if (event.event.method === 'LiquidationRatioUpdated') {
    field = 'liquidationRatio'
  } else if (event.event.method === 'LiquidationPenaltyUpdated') {
    field = 'liquidationPenalty'
  } else if (event.event.method === 'RequiredCollateralRatioUpdated') {
    field = 'requiredCollateralRatio'
  } else if (event.event.method === 'MaximumTotalDebitValueUpdated') {
    field = 'maximumTotalDebitValue'
  } else {
    return;
  }

  const newParams = new CollateralParamsHistory(params.record.id);
  newParams.endAtBlock = BigInt(event.block.block.header.number.toString());
  newParams.collateralId = params.record.collateralId;
  newParams.maximumTotalDebitValue = params.record.maximumTotalDebitValue;
  newParams.interestRatePerSec = params.record.interestRatePerSec;
  newParams.liquidationRatio = params.record.liquidationRatio;
  newParams.liquidationPenalty = params.record.liquidationPenalty;
  newParams.requiredCollateralRatio = params.record.requiredCollateralRatio;
  newParams[field] = BigInt(value);

  await newParams.save();
}