import { forceToCurrencyName } from "@acala-network/sdk-core";
import { SubstrateBlock, SubstrateEvent } from "@subql/types"
import { getStableCoinCurrency, getStartOfDay, getStartOfHour, getTokenDecimals } from '@acala-network/subql-utils';
import { getBlock, getAccount, getCollateral, getPriceBundle, getPosition, getHourlyPosition, getDailyPosition, getHourlyCollateral, getDailyCollateral, getExchangeBundle } from "../utils/record";
import { updateDailyCollateral, updateDailyPosition, updateHourlyCollateral, updateHourlyPosition, createUpdatePositionHistroy, createConfiscatePositionHistory } from ".";
import { getVolumeUSD } from '../utils/math';
import { forceToCurrencyId } from "@acala-network/sdk-core";

export const updateLoanPosition = async (
  rawBlock: SubstrateBlock,
  account: string,
  collateralName: string,
  depositChanged: bigint,
  debitChanged: bigint, 
) => {
  const timestamp = rawBlock.timestamp;
  const startHour = getStartOfHour(timestamp);
  const startDay = getStartOfDay(timestamp);

  // get records
  const block = await getBlock(rawBlock);
  const owner = await getAccount(account.toString());
  const collateral = await getCollateral(collateralName);
  const priceBundle = await getPriceBundle(collateralName, rawBlock);
  const exchangeBundle = await getExchangeBundle(collateralName, rawBlock);
  const hourlyCollateral = await getHourlyCollateral(collateralName, startHour)
  const dailyCollateral = await getDailyCollateral(collateralName, startDay)
  const position = await getPosition(collateral.id, owner.id)
  const hourlyPosition = await getHourlyPosition(collateral.id, owner.id, startHour)
  const dailyPosition = await getDailyPosition(collateral.id, owner.id, startDay)
  const stableCoinDecimals = await getTokenDecimals(api as any, getStableCoinCurrency(api as any));
  const depositChangedUSD = getVolumeUSD(depositChanged, collateral.decimals, priceBundle.price)
  const debitChangedUSD = getVolumeUSD(debitChanged, stableCoinDecimals, exchangeBundle.debitExchangeRate)

  // update collateral record 
  collateral.debitAmount = collateral.debitAmount + debitChanged;
  collateral.depositAmount = collateral.depositAmount + depositChanged;

  // recalculate volume
  const depositVolumeUSD = getVolumeUSD(collateral.depositAmount, collateral.decimals, priceBundle.price)
  const debitVolumeUSD = getVolumeUSD(collateral.debitAmount, stableCoinDecimals, exchangeBundle.debitExchangeRate)

  // update collatearl daily/hourly record
  updateHourlyCollateral(
    collateral,
    hourlyCollateral,
    exchangeBundle.debitExchangeRate,
    depositVolumeUSD,
    debitVolumeUSD,
    depositChanged,
    debitChanged,
    depositChangedUSD,
    debitChangedUSD
  );
  updateDailyCollateral(
    collateral,
    dailyCollateral,
    exchangeBundle.debitExchangeRate,
    depositVolumeUSD,
    debitVolumeUSD,
    depositChanged,
    debitChanged,
    depositChangedUSD,
    debitChangedUSD
  );


  position.depositAmount = position.depositAmount + depositChanged;
  position.debitAmount = position.debitAmount + debitChanged;
  position.updateAt = block.timestamp;
  position.updateAtBlockId = block.id;
  position.txCount = position.txCount + 1;
  owner.txCount = owner.txCount + 1;

  const depositVolumeUSDInPosition = getVolumeUSD(position.depositAmount, collateral.decimals, priceBundle.price);
  const debitVolumeUSDInPosition = getVolumeUSD(position.debitAmount, stableCoinDecimals, exchangeBundle.debitExchangeRate);

  updateHourlyPosition(
    hourlyPosition,
    position,
    exchangeBundle.debitExchangeRate,
    depositVolumeUSDInPosition,
    debitVolumeUSDInPosition,
    depositChanged,
    debitChanged,
    depositChangedUSD,
    debitChangedUSD
  );

  updateDailyPosition(
    dailyPosition,
    position,
    exchangeBundle.debitExchangeRate,
    depositVolumeUSDInPosition,
    debitVolumeUSDInPosition,
    depositChanged,
    debitChanged,
    depositChangedUSD,
    debitChangedUSD
  );

  await owner.save();
  await collateral.save();
  await hourlyCollateral.save();
  await dailyCollateral.save();
  await position.save();
  await hourlyPosition.save();
  await dailyPosition.save();

  return {
    owner,
    exchangeBundle,
    collateral,
    priceBundle,
    depositChanged,
    depositChangedUSD,
    debitChanged,
    debitChangedUSD
  }
}

export async function handleLoanPositionUpdate (event: SubstrateEvent) {
  const [owner, collateral, collateralChanged, debitChanged] = event.event.data;

  const collateralChangedBN = BigInt(collateralChanged.toString())
  const debitChangedBN = BigInt(debitChanged.toString())
  const collateralName = forceToCurrencyName(collateral);

  const data = await updateLoanPosition(
    event.block,
    owner.toString(),
    collateralName,
    collateralChangedBN,
    debitChangedBN
  );

  await createUpdatePositionHistroy(
    event,
    data.owner,
    collateralName,
    data.depositChanged,
    data.debitChanged,
    data.depositChangedUSD,
    data.debitChangedUSD,
    data.priceBundle.price,
    data.exchangeBundle.debitExchangeRate
  )
}

export async function handleConfiscate (event: SubstrateEvent) {
  const [address, token, collateralChanged, debitChanged] = event.event.data;

  const collateralChangedBN = -BigInt(collateralChanged.toString());
  const debitChangedBN = -BigInt(debitChanged.toString());
  const collateralName = forceToCurrencyName(token);
  const rawBlock = event.block; 
  const owner = await getAccount(address.toString());
  const collateral = await getCollateral(collateralName);
  const stableCoinDecimals = await getTokenDecimals(api as any, getStableCoinCurrency(api as any));
  const priceBundle = await getPriceBundle(collateralName, rawBlock);
  const exchangeBundle = await getExchangeBundle(collateralName, rawBlock);

  const collateralVolumeUSD = getVolumeUSD(collateralChangedBN, collateral.decimals, priceBundle.price);
  const debitVolumeUSD = getVolumeUSD(debitChangedBN, stableCoinDecimals, exchangeBundle.debitExchangeRate);

  let debitPool = BigInt(0);

  try {
    const _pool = await api.query.cdpTreasury.debitPool();
    debitPool = BigInt(_pool.toString())
  } catch (error) {
    debitPool = BigInt(0)
  }

  await createConfiscatePositionHistory(
    event,
    owner,
    collateral,
    collateralChangedBN,
    debitChangedBN,
    collateralVolumeUSD,
    debitVolumeUSD,
    debitPool
  );
}