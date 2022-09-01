import { SubstrateEvent } from '@subql/types'
import { getTokenName, getNativeCurrency } from '@acala-network/subql-utils'
import { handleTransfer } from './handleTransfer'
import { handleDeposit } from './handleDeposit'
import { handleReserved } from './handleReserved'
import { handleUnReserved } from './handleUnReserved'
import { handleReservedRepatriated } from './handleReserveRepatriated'
import { handleWithdrawn } from './handleWithdrawn'
import { isNewAccount } from '../utils/isNewAccount'
import { handleSlashed } from './handleSlashed'
import { readDataFromFile } from '../utils/readDataFromFile'

const nativeToken = getNativeCurrency(api as any);
export const startHeight = 1200000;

/*
handle balances.Transfer

Transfer succeeded.
Transfer { from: T::AccountId, to: T::AccountId, amount: T::Balance },
*/
export async function handleBalancesTransfer(event: SubstrateEvent) {
    const [from, to, value] = event.event.data
    const fromId = from.toString()
    const toId = to.toString()
    const amount = BigInt(value.toString())
    const tokenName = await getTokenName(nativeToken)
    const blockNumber = event.block.block.header.number.toBigInt()
    const fromAccountIsNew = isNewAccount(fromId, event);
    const toAccountIsNew = isNewAccount(toId, event);

    await readDataFromFile(event)
    if(blockNumber <= BigInt(startHeight)) return;
    await handleTransfer(tokenName, fromId, toId, amount, event.block.timestamp, blockNumber, fromAccountIsNew, toAccountIsNew)
}

/*
handle balances.Deposit
Some amount was deposited (e.g. for transaction fees).
Deposit { who: T::AccountId, amount: T::Balance },
*/
export async function handleBalancesDeposit(event: SubstrateEvent) {
    const [to, value] = event.event.data
    const toId = to.toString()
    const amount = BigInt(value.toString())
    const tokenName = await getTokenName(nativeToken)
    const blockNumber = event.block.block.header.number.toBigInt()
    const accountIsNew = isNewAccount(toId, event);

    await readDataFromFile(event)
    if(blockNumber <= BigInt(startHeight)) return;
    await handleDeposit(toId, tokenName, amount, event.block.timestamp, blockNumber, accountIsNew)
}

/*
handle balances.Withdraw
Some amount was withdrawn from the account (e.g. for transaction fees).
Withdraw { who: T::AccountId, amount: T::Balance },
*/
export async function handleBalancesWithdraw(event: SubstrateEvent) {
    const [from, value] = event.event.data
    const fromId = from.toString()
    const amount = BigInt(value.toString())
    const tokenName = await getTokenName(nativeToken)
    const blockNumber = event.block.block.header.number.toBigInt()
    const accountIsNew = isNewAccount(fromId, event);

    await readDataFromFile(event)
    if(blockNumber <= BigInt(startHeight)) return;
    await handleWithdrawn(fromId, tokenName, amount, event.block.timestamp, blockNumber, accountIsNew)
}

/*
handle balances.DustLost
*/
export async function handleBalancesDustLost(event: SubstrateEvent) {
    const [from, value] = event.event.data
    const fromId = from.toString()
    const amount = BigInt(value.toString())
    const tokenName = await getTokenName(nativeToken)
    const blockNumber = event.block.block.header.number.toBigInt()

    await readDataFromFile(event)
    if(blockNumber <= BigInt(startHeight)) return;
    await handleWithdrawn(fromId, tokenName, amount, event.block.timestamp, blockNumber)
}

/**
handle balances.Reserved
Some balance was reserved (moved from free to reserved).
Reserved { who: T::AccountId, amount: T::Balance },
 */
export async function handleBalancesReserved(event: SubstrateEvent) {
    const [who, value] = event.event.data
    const account = who.toString()
    const amount = BigInt(value.toString())
    const nativeTokenName = await getTokenName(nativeToken)
    const blockNumber = event.block.block.header.number.toBigInt()

    await readDataFromFile(event)
    if(blockNumber <= BigInt(startHeight)) return;
    await handleReserved(account, nativeTokenName, amount, event.block.timestamp, blockNumber)
}

/**
handle balances.Unreserved
Some balance was unreserved (moved from reserved to free).
Unreserved { who: T::AccountId, amount: T::Balance },
 */
export async function handleBalancesUnreserved(event: SubstrateEvent) {
    const [who, value] = event.event.data
    const account = who.toString()
    const amount = BigInt(value.toString())
    const nativeTokenName = await getTokenName(nativeToken)
    const blockNumber = event.block.block.header.number.toBigInt()

    await readDataFromFile(event)
    if(blockNumber <= BigInt(startHeight)) return;
    await handleUnReserved(account, nativeTokenName, amount, event.block.timestamp, blockNumber)
}

/**
handle balances.ReserveRepatriated
Some balance was moved from the reserve of the first account to the second account.
Final argument indicates the destination balance type.
ReserveRepatriated {
    from: T::AccountId,
    to: T::AccountId,
    amount: T::Balance,
    destination_status: Status,
},
 */
export async function handleBalancesReserveRepatriated(event: SubstrateEvent) {
    const [from, to, balance, status] = event.event.data
    const fromId = from.toString()
    const toId = to.toString()
    const amount = BigInt(balance.toString())
    const nativeTokenName = await getTokenName(nativeToken)
    const blockNumber = event.block.block.header.number.toBigInt()

    await readDataFromFile(event)
    if(blockNumber <= BigInt(startHeight)) return;
    await handleReservedRepatriated(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        status as any,
        fromId,
        toId,
        nativeTokenName,
        amount,
        event.block.timestamp,
        blockNumber
    )
}


/**
handle tokens.Transfer
Transfer succeeded.
Transfer {
    currency_id: T::CurrencyId,
    from: T::AccountId,
    to: T::AccountId,
    amount: T::Balance,
},
 */
export async function handleTokensTransfer(event: SubstrateEvent) {
    const [currency, from, to, amount] = event.event.data
    const fromId = from.toString()
    const toId = to.toString()
    const amountN = BigInt(amount.toString())
    const tokenName = await getTokenName(currency)
    const blockNumber = event.block.block.header.number.toBigInt()

    await readDataFromFile(event)
    if(blockNumber <= BigInt(startHeight)) return;
    await handleTransfer(tokenName, fromId, toId, amountN, event.block.timestamp, blockNumber)
}

/**
handle tokens.Reserved
Some balance was reserved (moved from free to reserved).
Reserved {
    currency_id: T::CurrencyId,
    who: T::AccountId,
    amount: T::Balance,
}
 */
export async function handleTokensReserved(event: SubstrateEvent) {
    const [currencyId, who, value] = event.event.data
    const account = who.toString()
    const amount = BigInt(value.toString())
    const tokenName = await getTokenName(currencyId)
    const blockNumber = event.block.block.header.number.toBigInt()

    await readDataFromFile(event)
    if(blockNumber <= BigInt(startHeight)) return;
    await handleReserved(account, tokenName, amount, event.block.timestamp, blockNumber)
}


/**
handle tokens.Unreserved
Some balance was unreserved (moved from reserved to free).
Unreserved { who: T::AccountId, amount: T::Balance },
 */
export async function handleTokensUnreserved(event: SubstrateEvent) {
    // Some balance was unreserved (moved from reserved to free). \[who, value\]
    const [currencyId, who, value] = event.event.data
    const account = who.toString()
    const amount = BigInt(value.toString())
    const tokenName = await getTokenName(currencyId)
    const blockNumber = event.block.block.header.number.toBigInt()

    await readDataFromFile(event)
    if(blockNumber <= BigInt(startHeight)) return;
    await handleUnReserved(account, tokenName, amount, event.block.timestamp, blockNumber)
}

/**
handle tokens.ReserveRepatriated
Some balance was moved from the reserve of the first account to the second account.
Final argument indicates the destination balance type.
ReserveRepatriated {
    from: T::AccountId,
    to: T::AccountId,
    amount: T::Balance,
    destination_status: Status,
},
 */
export async function handleTokensReserveRepatriated(event: SubstrateEvent) {
    const [currencyId, from, to, balance, status] = event.event.data
    const fromId = from.toString()
    const toId = to.toString()
    const amount = BigInt(balance.toString())
    const tokenName = await getTokenName(currencyId)
    const blockNumber = event.block.block.header.number.toBigInt()

    await readDataFromFile(event)
    if(blockNumber <= BigInt(startHeight)) return;
    await handleReservedRepatriated(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        status as any,
        fromId,
        toId,
        tokenName,
        amount,
        event.block.timestamp,
        blockNumber
    )
}

/*
handle tokens.Deposited
Deposited some balance into an account
Deposited {
    currency_id: T::CurrencyId,
    who: T::AccountId,
    amount: T::Balance,
}
*/
export async function handleTokensDeposited(event: SubstrateEvent) {
    const [currency, who, value] = event.event.data
    const recipientId = who.toString()
    const tokenName = await getTokenName(currency)
    const amount = BigInt(value.toString())
    const blockNumber = event.block.block.header.number.toBigInt()

    await readDataFromFile(event)
    if(blockNumber <= BigInt(startHeight)) return;
    await handleDeposit(recipientId, tokenName, amount, event.block.timestamp, blockNumber)
}

/*
handle tokens.Withdrawn
Some balances were withdrawn (e.g. pay for transaction fee)
Withdrawn {
	currency_id: T::CurrencyId,
	who: T::AccountId,
	amount: T::Balance,
}
*/
export async function handleTokensWithdrawn(event: SubstrateEvent) {
    const [currency, who, value] = event.event.data
    const accountId = who.toString()
    const tokenName = await getTokenName(currency)
    const amount = BigInt(value.toString())
    const blockNumber = event.block.block.header.number.toBigInt()

    await readDataFromFile(event)
    if(blockNumber <= BigInt(startHeight)) return;
    await handleWithdrawn(accountId, tokenName, amount, event.block.timestamp, blockNumber)
}

/**
handle tokens.Slashed
Some balances were slashed (e.g. due to mis-behavior)
Slashed {
	currency_id: T::CurrencyId,
	who: T::AccountId,
	free_amount: T::Balance,
	reserved_amount: T::Balance,
}
 */
export async function handleTokensSlashed (event: SubstrateEvent) {
    const [currency, who, free, reserved] = event.event.data
    const accountId = who.toString()
    const tokenName = await getTokenName(currency)
    const freeAmount = BigInt(free.toString())
    const reservedAmount = BigInt(reserved.toString())
    const blockNumber = event.block.block.header.number.toBigInt()

    await readDataFromFile(event)
    if(blockNumber <= BigInt(startHeight)) return;
    await handleSlashed(accountId, tokenName, freeAmount, reservedAmount, event.block.timestamp, blockNumber);
}