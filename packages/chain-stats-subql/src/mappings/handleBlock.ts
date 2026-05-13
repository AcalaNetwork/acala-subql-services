import { SubstrateBlock } from "@subql/types/dist/interfaces";
import { getBlock, getToken } from "../utils/records";
import { updateAccountBalance } from "../utils/updateAccountBalance";
import { insertBefore, startAt } from "./mappingHandlers";
import { getInitialBalanceRecords } from "../utils/balanceData";


export async function handleBlock(block: SubstrateBlock) {
  const blockNumber = block.block.header.number.toBigInt();
  const record = await getBlock(blockNumber.toString());

  record.height = blockNumber;
  record.hash = block.block.hash.toString();
  record.timestamp = block.timestamp;

  if (blockNumber <= insertBefore) {
    const network = api.registry.chainSS58 === 10 ? "acala" : "karura";
    const round = Number(blockNumber - startAt);
    const startIndex = round * 1000;
    const accountData = await getInitialBalanceRecords(network, startIndex, 1000);

    logger.info(`start insert ${startIndex}, batch ${accountData.length}`);

    if (accountData.length === 0) return;

    for (const data of accountData) {
      const token = await getToken(data.token);

      await token.save();
      await updateAccountBalance(
        data.account,
        data.token,
        BigInt(data.free),
        BigInt(data.reserved),
        block.timestamp,
        blockNumber
      )
    }
  }



  await record.save();
}
