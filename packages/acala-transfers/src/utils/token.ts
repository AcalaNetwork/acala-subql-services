import { forceToCurrencyIdName } from "@acala-network/sdk-core";
import { WalletPromise } from "@acala-network/sdk-wallet";

const wallet = new WalletPromise(api);

export const nativeToken = wallet.getNativeToken();

export function isTokenEqual(t1: any, t2: any) {
  return forceToCurrencyIdName(t1) === forceToCurrencyIdName(t2);
}

export function getTokenName(token: any) {
  return forceToCurrencyIdName(token);
}

export function getTokenDecimal(token: any) {
  return wallet.getToken(token).decimal;
}
