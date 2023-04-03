import { SubstrateEvent } from "@subql/types";
import { getStatus } from "../utils";
import { updateLoanPosition } from "./updateLoanPosition";

const INIT_BLOCKS = {
  acala:  3070000,
  karura: 3827500
}

async function initPositions (event: SubstrateEvent) {
  // read from local file
  const isAcala = api.registry.chainSS58 === 10;
  const chainName = isAcala ? 'acala' : 'karura';
  const positions = require(`../data/${chainName}-loan-positions-${INIT_BLOCKS[chainName]}`);

  if (!positions) throw new Error(`can'not read init data`);

  for (const i of positions) {
    const owner = i.address;
    const collateral = i.token;
    const deposit = BigInt(i.collatearl);
    const debit = BigInt(i.debit);

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
