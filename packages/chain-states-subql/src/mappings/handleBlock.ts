import { SubstrateBlock } from "@subql/types/dist/interfaces";
import { getBlock, getToken } from "../utils/records";
import acalaNative from "../data/acala-1870000-native.json";
import acalaNonNative from "../data/acala-1870000-non-native.json";
import karuraNative from "../data/karura-2650000-native.json";
import karuraNonNative from "../data/karura-2650000-non-native.json";
import { updateAccountBalance } from "../utils/updateAccountBalance";
import { insertBefore, startAt } from "./mappingHandlers";


export async function handleBlock(block: SubstrateBlock) {
  const blockNumber = block.block.header.number.toBigInt();
  const record = await getBlock(blockNumber.toString());

  record.height = blockNumber;
  record.hash = block.block.hash.toString();
  record.timestamp = block.timestamp;

  if (blockNumber <= insertBefore) {
    const isAcala = api.registry.chainSS58 === 10
    let accountData = []

    if (isAcala) {
      accountData = [...acalaNative as any, ...acalaNonNative as any]
    } else {
      accountData = [...karuraNative as any, ...karuraNonNative as any]
    }

    const round = Number(blockNumber - startAt);

    logger.info(`total ${accountData.length}, start insert ${round * 1000}`);

    for (let i = 0; i < 1000; i++) {
      const data = accountData[i + round * 1000] as { account: string; token: string; free: string; reserved: string; frozen: string };

      if (!data) return;

      const token = await getToken(data.token);

      await token.save();
      await updateAccountBalance(
        data.account,
        data.token,
        BigInt(data.free),
        BigInt(data.reserved),
        BigInt(data.frozen),
        block.timestamp,
        blockNumber
      )
    }
  }



  await record.save();
}