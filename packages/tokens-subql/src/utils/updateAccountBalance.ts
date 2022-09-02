import { getStartOfDay, getStartOfHour, isTokenEqual, getNativeCurrency } from '@acala-network/subql-utils'
import { AccountBalance, DailyAccountBalance, HourAccountBalance } from '../types/models'
import { getAccount, getAccountBalance, getDailyAccountBalance, getHourAccountBalance } from './records'

const nativeToken = getNativeCurrency(api as any);

export function updateAccountBalanceHistoryRecord(source: AccountBalance, target: HourAccountBalance | DailyAccountBalance) {
    target.total = source.total
    target.free = source.free
    target.reserved = source.reserved
    target.frozen = source.frozen
    target.updateAtBlock = source.updateAtBlock
}

/**
 * @name updateAccountBalance
 * @param address
 * @param tokenName
 * @param freeChanged
 * @param reservedChanged
 * @param frozenChanged
 * @param timestamp
 * @param blockNumber
 */
export async function updateAccountBalance(
    address: string,
    tokenName: string,
    freeChanged: bigint,
    reservedChanged: bigint,
    frozenChanged: bigint,
    timestamp: Date,
    blockNumber: bigint,
    accountIsNew = false
) {
    const account = await getAccount(address)
    const accountBalance = await getAccountBalance(address, tokenName, blockNumber, accountIsNew)

    const hourDate = getStartOfHour(timestamp)
    const dayDate = getStartOfDay(timestamp)
    const hourAccountBalance = await getHourAccountBalance(address, tokenName, hourDate)
    const dailyAccountBalance = await getDailyAccountBalance(address, tokenName, dayDate)

    // ignore update when the account balance is initizlied and init from chain is equal to blocknumber
    if (isTokenEqual(tokenName, nativeToken) && accountBalance.initFromChainAt && accountBalance.initFromChainAt === blockNumber) {
        // pass
    } else {
        // if free is changed, the total balance will change
        accountBalance.total = accountBalance.total + freeChanged + frozenChanged
        accountBalance.free = accountBalance.free + freeChanged
        accountBalance.reserved = accountBalance.reserved + reservedChanged
        accountBalance.frozen = accountBalance.frozen + frozenChanged
    }

    updateAccountBalanceHistoryRecord(accountBalance, hourAccountBalance)
    updateAccountBalanceHistoryRecord(accountBalance, dailyAccountBalance)

    await account.save()
    await accountBalance.save()
    await hourAccountBalance.save()
    await dailyAccountBalance.save()
}
