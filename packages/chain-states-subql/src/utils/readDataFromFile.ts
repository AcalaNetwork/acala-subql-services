import unNativeTokenBalances from './unNativeTokenbBalance.json'
import nativeTokenBalances from './nativeTokenBalance.json';
import { ReadBlock } from '../types';
import { updateAccountBalance } from './updateAccountBalance';
import { isNewAccount } from './isNewAccount';
import { SubstrateEvent } from '@subql/types';
import { updateToken } from './updateToken';
import { startHeight } from '../mappings/mappingHandlers';

interface BalanceDataProsp {
  account: string;
  token: string;
  free: string;
  reserved: string;
  frozen: string;
}

export const readDataFromFile = async (event: SubstrateEvent) => {
  const exists = await ReadBlock.get('read');
  const height = event.block.block.header.number.toBigInt();
  const timestamp = event.block.timestamp;
  const allBalances = (nativeTokenBalances as BalanceDataProsp[]).concat((unNativeTokenBalances as BalanceDataProsp[]));
  if (height > BigInt(startHeight)) return;

  if (exists) {
    const start = exists.start;
    const size = exists.size;
    const data = allBalances.slice(start, start + size);

    await insert(data, event, timestamp, height);
    exists.start = start + size;
    await exists.save();
  } else {
    const record = new ReadBlock('read');
    record.start = 100;
    record.size = 100;
    await record.save();

    await insert(allBalances.slice(0, 100), event, timestamp, height);
  }
}

export const insert = async (allBalances: BalanceDataProsp[], event: SubstrateEvent, timestamp: Date, height: bigint) => {
  const obj = {};

  allBalances.forEach(item => {
    if (obj[item.token]) {
      const data = obj[item.token]
      data.free += Number(item.free);
      data.reserved += Number(item.reserved);
      data.frozen += Number(item.frozen);
    } else {
      obj[item.token] = {
        token: item.token,
        free: Number(item.free),
        reserved: Number(item.reserved),
        frozen: Number(item.frozen),
      }
    }
  })

  await Promise.all(Object.keys(obj).map(async key => {
    const item = obj[key];
    await updateToken(item.token, BigInt(item.free) + BigInt(item.reserved), BigInt(0), BigInt(item.reserved), BigInt(item.frozen), height, timestamp);
  }))

  await Promise.all(allBalances.map(async item => {
    const isNew = isNewAccount(item.account, event);
    await updateAccountBalance(item.account, item.token, BigInt(item.free), BigInt(item.reserved), BigInt(item.frozen), timestamp, height, isNew);
  }))

  // await Promise.all((nativeTokenBalances as BalanceDataProsp[]).map(async item => {
  //   const isNew = isNewAccount(item.account, event);
  //   await updateToken(item.token, BigInt(item.free) + BigInt(item.reserved) + BigInt(item.frozen), BigInt(0), BigInt(item.reserved), BigInt(item.frozen), height, timestamp);
  //   await updateAccountBalance(item.account, item.token, BigInt(item.free), BigInt(item.reserved), BigInt(item.frozen), timestamp, height, isNew);
  // }))
}