import { SubstrateEvent } from '@subql/types'
import { AccountType } from '../types';
import { getAccount, getToken, getTransfer } from '../records';
import { getBlockHash, getBlockNumber, getBlockTimestamp } from '../utils/block';
import { getExtrinsicHashFromEvent } from '../utils/extrinsic';
import { getNativeCurrency, getTokenName } from '@acala-network/subql-utils';

async function saveTransfer(
    tokenName: string,
    fromId: string,
    toId: string,
    amount: bigint,
    event: SubstrateEvent
) {
    const token = await getToken(tokenName);
    const from = await getAccount(fromId);
    const to = await getAccount(toId);
    const transferId = `${getBlockNumber(event.block)}-${event.idx.toString()}`;
    const transfer = await getTransfer(transferId);

    // update token record
    token.transferVolume = token.transferVolume + amount;
    token.updateAt = getBlockTimestamp(event.block);
    token.updateAtBlock = getBlockNumber(event.block);
    // update from account record
    from.updateAt = getBlockTimestamp(event.block);
    from.updateAtBlock = getBlockNumber(event.block);
    // update to account record
    to.txCount = to.txCount + 1;
    to.updateAt = getBlockTimestamp(event.block);
    to.updateAtBlock = getBlockNumber(event.block);
    // update tranfser history record
    transfer.tokenId = token.id;
    transfer.fromId = from.id;
    transfer.toId = to.id;
    transfer.amount = amount;
    transfer.isSystemCall = from.type !== AccountType.USER || to.type !== AccountType.USER
    transfer.blockNumber = getBlockNumber(event.block);
    transfer.blockHash = getBlockHash(event.block);
    transfer.timestamp = getBlockTimestamp(event.block);
    transfer.eventIndex = Number(event.idx.toString());
    transfer.extrinsic = getExtrinsicHashFromEvent(event);

    await token.save();
    await from.save();
    await to.save();
    await transfer.save();
}
const nativeToken = getNativeCurrency(api as any);

// handle balances.Transfer
export async function handleBalancesTransfer(event: SubstrateEvent) {
    const [from, to, value] = event.event.data
    const fromId = from.toString()
    const toId = to.toString()
    const amount = BigInt(value.toString())
    const tokenName = getTokenName(nativeToken)

    await saveTransfer(tokenName, fromId, toId, amount, event)
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

    await saveTransfer(tokenName, fromId, toId, amount, event)
}
