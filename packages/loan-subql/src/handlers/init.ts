import { SubstrateEvent } from "@subql/types";
import { getStatus } from "../utils";
import { updateLoanPosition } from "./updateLoanPosition";

const INIT_BLOCKS = {
  acala:  3070895,
  karura: 3828505
}

async function initPositions (event: SubstrateEvent) {
  // read from local file
  const isAcala = api.registry.chainSS58 === 10;
  const chainName = isAcala ? 'acala' : 'karura';
  const positions = require(`../data/${chainName}-${INIT_BLOCKS[chainName]}.json`);

  if (!positions) throw new Error(`can'not read init data`);

  for (const [i, item] of positions.entries()) {
    const owner = item.address;
    const collateral = item.token;
    const deposit = BigInt(item.collateral || 0);
    const debit = BigInt(item.debit || 0);

    logger.info(`${i} ${owner} ${collateral} ${deposit} ${debit}`)

    await updateLoanPosition(
      event.block,
      owner,
      collateral,
      deposit,
      debit
    );
  }
}

export function initWrapper (fn: (event: SubstrateEvent) => Promise<void>) {
  return async (event: SubstrateEvent) => {
    const status = await getStatus();

    if (!status.initialized) {
      await initPositions(event);

      status.initialized = true;

      await status.save();

      return;
    }

    await fn(event);
  }
}
