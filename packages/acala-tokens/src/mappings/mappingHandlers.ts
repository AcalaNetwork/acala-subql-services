import { SubstrateEvent } from '@subql/types'
import { getTokenName, nativeToken } from '@acala-network/subql-utils'
import { handleTransfer } from './handleTransfer'
import { handleDeposit } from './handleDeposit'
import { handleTreasuryDeposit } from './handleTreasuryDeposit'
import { handleReserved } from './handleReserved'
import { handleUnReserved } from './handleUnReserved'
import { FrameSupportTokensMiscBalanceStatus  } from '@polkadot/types/lookup'
import { handleReservedRepatriated } from './handleReserveRepatriated'
import { handleWithdrawn } from './handleWithdrawn'
import { handleBalanceUpdated } from './handleBalanceUpdated'

/*
handle balances.Transfer
DONOT need handle balances.Endowed as balances.Endowed is appear with balances.Treansfer
*/
export async function handleBalancesTransfer(event: SubstrateEvent) {
    const [from, to, value] = event.event.data
    const fromId = from.toString()
    const toId = to.toString()
    const amount = BigInt(value.toString())
    const tokenName = getTokenName(nativeToken)

    await handleTransfer(tokenName, fromId, toId, amount, event.block.timestamp)
}

// handle balances.Reserved
export async function handleBalancesReserved(event: SubstrateEvent) {
    // Some balance was reserved (moved from free to reserved). \[who, value\]
    const [who, value] = event.event.data
    const account = who.toString();
    const amount = BigInt(value.toString());
    const nativeTokenName = getTokenName(nativeToken);

    await handleReserved(account, nativeTokenName, amount, event.block.timestamp);
}

// handle balances.Unreserved
export async function handleBalancesUnreserved(event: SubstrateEvent) {
    // Some balance was unreserved (moved from reserved to free). \[who, value\]

    const [who, value] = event.event.data
    const account = who.toString();
    const amount = BigInt(value.toString());
    const nativeTokenName = getTokenName(nativeToken);

    await handleUnReserved(account, nativeTokenName, amount, event.block.timestamp);
}

/*
    handle treasury.Deposit
    DONOT need handle balances.DustLost as blanaces.DustLost is appear with treasury.Deposit
 */
export async function handleTreasuryDepositEvent(event: SubstrateEvent) {
    // Some funds have been deposited. \[deposit\]
    const [deposit] = event.event.data;
    const extrinsic = event.extrinsic

    // just for type check, all treasury.deposit must have extrinsic
    if (!extrinsic) return;

    const depositAmount = BigInt(deposit.toString());
    const accountId = extrinsic.extrinsic.signer.toString();
    const nativeTokenName = getTokenName(nativeToken);

    await handleTreasuryDeposit(accountId, nativeTokenName, depositAmount, event.block.timestamp)
}

// 	handle balances.ReserveRepatriated
export async function handleBalancesReserveRepatriated(event: SubstrateEvent) {
    // Some balance was moved from the reserve of the first account to the second account.Final argument indicates the destination balance type.\[from, to, balance, destination_status\]
    const [from, to, balance, status] = event.event.data;

    const fromId = from.toString();
    const toId = to.toString();
    const amount = BigInt(balance.toString());
    const nativeTokenName = getTokenName(nativeToken);

    await handleReservedRepatriated(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (status as any as FrameSupportTokensMiscBalanceStatus),
        fromId,
        toId,
        nativeTokenName,
        amount,
        event.block.timestamp
    );
}

// handle currencies.Transferred
export async function handleCurrenciesTransfer(event: SubstrateEvent) {
    const [currency, from, to, amount] = event.event.data

    const fromId = from.toString()
    const toId = to.toString()
    const amountN = BigInt(amount.toString())
    const tokenName = getTokenName(currency)

    await handleTransfer(tokenName, fromId, toId, amountN, event.block.timestamp)
}

/*
 handle currencies.Deposited

 DONT NEED handle balances.Deposit as we don't Deposit/Withdrawn any native token
 DONT NEED handle tokens.Endowed, as tokens.Endowed is appear with balances.Deposit
*/
export async function handleCurrenciesDeposite(event: SubstrateEvent) {
    // Deposit success. \[currency_id, who, amount\]
    const [currency, who, value] = event.event.data

    const recipientId = who.toString()
    const tokenName = getTokenName(currency)
    const amount = BigInt(value.toString())

    await handleDeposit(recipientId, tokenName, amount, event.block.timestamp)
}

// handle currencies.Withdrawn
export async function handleCurrenciesWithdrawn(event: SubstrateEvent) {
    // Withdraw success. \[currency_id, who, amount\]
    const [currency, who, value] = event.event.data;

    const accountId = who.toString();
    const tokenName = getTokenName(currency)
    const amount = BigInt(value.toString())

    await handleWithdrawn(accountId, tokenName, amount, event.block.timestamp);
}

// handle currencies.DustSwept
export async function handleDustSwept(event: SubstrateEvent) {
    // Dust swept. \[currency_id, who, amount\]
    const [currency, who, value] = event.event.data;

    const accountId = who.toString();
    const tokenName = getTokenName(currency);
    const amount = BigInt(value.toString());

    await handleTreasuryDeposit(accountId, tokenName, amount, event.block.timestamp);
}

// handle currencies.BalanceUpdated
export async function handleBalanceUpdatedEvent(event: SubstrateEvent) {
    // Update balance success. \[currency_id, who, amount\]
    const [currency, who, value] = event.event.data;

    const accountId = who.toString();
    const tokenName = getTokenName(currency);
    const amount = BigInt(value.toString());

    await handleBalanceUpdated(accountId, tokenName, amount, event.block.timestamp);
}