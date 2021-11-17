import { WalletPromise } from "@acala-network/sdk-wallet";
import { Balance } from "@acala-network/types/interfaces";
import { SubstrateEvent } from "@subql/types";
import { createTransfer } from "../utils/createTransferRecord";
import { getTokenName, isTokenEqual } from "../utils/token";

const wallet = new WalletPromise(api);
const nativeToken = wallet.getNativeToken();

export async function handleNonNativeTokenTransfer (event: SubstrateEvent) {
  const extrinsic = event.extrinsic;

  // ignore transfer event which with no tx
  if (!extrinsic) return;

  const data = event.event.data;
  const [token, from, to, amount] = data;

  // don't handle native token for native token transfer will create two events
  if (isTokenEqual(nativeToken, token)) return;

  // save transfer record
  await createTransfer(
    from.toString(),
    to.toString(),
    getTokenName(token),
    BigInt((amount as Balance).toString()),
    event
  );
}

export async function handleNativeTokenTransfer (event: SubstrateEvent) {
  const extrinsic = event.extrinsic;

  // ignore transfer event which with no tx
  if (!extrinsic) return;

  const data = event.event.data;

  const [from, to, amount] = data;

  // save transfer record
  await createTransfer(
    from.toString(),
    to.toString(),
    getTokenName(nativeToken),
    BigInt((amount as Balance).toString()),
    event
  );
}