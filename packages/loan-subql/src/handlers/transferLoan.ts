import { forceToCurrencyName } from "@acala-network/sdk-core";
import { AccountId, CurrencyId } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { getAccount, getBlock, getExtrinsic, getTransferPosition } from "../utils";

export const createTransferLoanHistory = async (
  event: SubstrateEvent,
  token: CurrencyId,
  from: string,
  to: string
) => {
  const tokenName = forceToCurrencyName(token);
  const block = await getBlock(event.block);
  const history = await getTransferPosition(`${block.id}-${event.idx.toString()}`);

  history.collateralId = tokenName;
  history.fromId = from;
  history.toId = to;
  history.blockId = block.id;
  history.timestamp = block.timestamp;

  if (event.extrinsic) {
    const extrinshcData = await getExtrinsic(event.extrinsic);

    history.extrinsicId = extrinshcData.id;
  }

  await history.save()
}

export const transferLoan = async (event: SubstrateEvent) => {
  const [from, to, token] = event.event.data as unknown as [AccountId, AccountId, CurrencyId];
  const fromAccount = await getAccount(from.toString());

  fromAccount.txCount + 1;

  await fromAccount.save();
  await createTransferLoanHistory(event, token, from.toString(), to.toString());
}
