/* only support acala-subql projects */

import { forceToCurrencyIdName } from '@acala-network/sdk-core'
import { WalletPromise } from '@acala-network/sdk-wallet'

const wallet = new WalletPromise(api)

export const nativeToken = wallet.getNativeToken()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTokenEqual(t1: any, t2: any) {
    return forceToCurrencyIdName(t1) === forceToCurrencyIdName(t2)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTokenName(token: any) {
    return forceToCurrencyIdName(token)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTokenDecimal(token: any) {
    return wallet.getToken(token).decimal
}
