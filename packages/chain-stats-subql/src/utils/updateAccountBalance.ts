import { getStartOfDay, getStartOfHour } from '@acala-network/subql-utils'
import { AccountBalance, DailyAccountBalance, HourAccountBalance } from '../types/models'
import { getAccount, getAccountBalance, getDailyAccountBalance, getHourAccountBalance } from './records'

export function updateAccountBalanceHistoryRecord(source: AccountBalance, target: HourAccountBalance | DailyAccountBalance) {
    target.total = source.total
    target.free = source.free
    target.reserved = source.reserved
    target.updateAtBlock = source.updateAtBlock
}

/**
 * @name updateAccountBalance
 * @param address
 * @param tokenName
 * @param freeChanged
 * @param reservedChanged
 * @param timestamp
 * @param blockNumber
 */
export async function updateAccountBalance(
    address: string,
    tokenName: string,
    freeChanged: bigint,
    reservedChanged: bigint,
    timestamp: Date,
    blockNumber: bigint,
) {
    const account = await getAccount(address)
    const accountBalance = await getAccountBalance(address, tokenName, blockNumber)

    const hourDate = getStartOfHour(timestamp)
    const dayDate = getStartOfDay(timestamp)
    const hourAccountBalance = await getHourAccountBalance(address, tokenName, hourDate)
    const dailyAccountBalance = await getDailyAccountBalance(address, tokenName, dayDate)

    // if free is changed, the total balance will change
    accountBalance.total = accountBalance.total + freeChanged + reservedChanged
    accountBalance.free = accountBalance.free + freeChanged
    accountBalance.reserved = accountBalance.reserved + reservedChanged

    updateAccountBalanceHistoryRecord(accountBalance, hourAccountBalance)
    updateAccountBalanceHistoryRecord(accountBalance, dailyAccountBalance)

    await account.save()
    await accountBalance.save()
    await hourAccountBalance.save()
    await dailyAccountBalance.save()
}
