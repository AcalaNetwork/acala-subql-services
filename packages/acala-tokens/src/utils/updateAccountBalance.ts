import { getDateStartOfDay, getDateStartOfHour } from '@acala-network/subql-utils'
import { AccountBalance, DailyAccountBalance, HourAccountBalance } from '../types/models'
import { getAccount, getAccountBalance, getDailyAccountBalance, getHourAccountBalance } from './records'

export function updateAccountBalanceHistoryRecord(source: AccountBalance, target: HourAccountBalance | DailyAccountBalance) {
    target.total = source.total
    target.free = source.free
    target.reserved = source.reserved
    target.frozen = source.frozen
}

/**
 * @name updateAccountBalance
 * @param address
 * @param tokenName
 * @param freeChanged
 * @param reservedChanged
 * @param frozenChanged
 * @param timestamp
 */
export async function updateAccountBalance(address: string, tokenName: string, freeChanged: bigint, reservedChanged: bigint, frozenChanged: bigint, timestamp: Date) {
    const account = await getAccount(address)
    const accountBalance = await getAccountBalance(address, tokenName)

    const hourDate = getDateStartOfHour(timestamp).toDate()
    const dayDate = getDateStartOfDay(timestamp).toDate()
    const hourAccountBalance = await getHourAccountBalance(address, tokenName, hourDate)
    const dailyAccountBalance = await getDailyAccountBalance(address, tokenName, dayDate)

    // if free is changed, the total balance will change
    accountBalance.total = accountBalance.total + freeChanged
    accountBalance.free = accountBalance.free + freeChanged
    accountBalance.reserved = accountBalance.reserved + reservedChanged
    accountBalance.frozen = accountBalance.frozen + frozenChanged

    updateAccountBalanceHistoryRecord(accountBalance, hourAccountBalance)
    updateAccountBalanceHistoryRecord(accountBalance, dailyAccountBalance)

    await account.save()
    await accountBalance.save()
    await hourAccountBalance.save()
    await dailyAccountBalance.save()
}
