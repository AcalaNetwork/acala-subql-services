import { SubstrateEvent } from '@subql/types'
import { handleTransfer } from './handleTransfer'
import { getNativeCurrency, getTokenName } from '@acala-network/subql-utils'

const nativeToken = getNativeCurrency(api as any);

// handle balances.Transfer
export async function handleBalancesTransfer(event: SubstrateEvent) {
    const [from, to, value] = event.event.data
    const fromId = from.toString()
    const toId = to.toString()
    const amount = BigInt(value.toString())
    const tokenName = getTokenName(nativeToken)

    await handleTransfer(tokenName, fromId, toId, amount, event)
}


// handle currencies.Transferred
export async function handleCurrenciesTransfer(event: SubstrateEvent) {
    const [currency, from, to, value] = event.event.data
    const fromId = from.toString()
    const toId = to.toString()
    const amount = BigInt(value.toString())
    const tokenName = getTokenName(currency)
    const nativeName = getTokenName(nativeToken)

    // don't handle native token here
    if (tokenName === nativeName) return;

    await handleTransfer(tokenName, fromId, toId, amount, event)
}
