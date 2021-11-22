import { getDateStartOfDay, getDateStartOfHour } from '@acala-network/subql-utils'
import { Token, DailyToken, HourToken } from '../types/models'
import { getToken, getDailyToken, getHourToken } from './records'

function absBN(n: bigint) {
    return n > BigInt(0) ? n : -n
}

export function updateTokenHistoryRecord(source: Token, target: HourToken | DailyToken) {
    target.issuance = source.issuance
    target.reserved = source.reserved
    target.frozen = source.frozen
}

/**
 * @name updateToken
 * @param tokenName 
 * @param issuanceChanged 
 * @param volumeChanged 
 * @param reservedChanged 
 * @param frozenChanged 
 * @param timestamp 
 */
export async function updateToken(tokenName: string, issuanceChanged: bigint, volumeChanged: bigint, reservedChanged: bigint, frozenChanged: bigint, timestamp: Date) {
    const token = await getToken(tokenName)

    const hourDate = getDateStartOfHour(timestamp).toDate()
    const dayDate = getDateStartOfDay(timestamp).toDate()
    const hourToken = await getHourToken(tokenName, hourDate)
    const dailyToken = await getDailyToken(tokenName, dayDate)

    token.volume = token.volume + absBN(volumeChanged) 
    token.issuance = token.issuance + issuanceChanged
    token.reserved = token.reserved + reservedChanged
    token.frozen = token.frozen + frozenChanged

    updateTokenHistoryRecord(token, hourToken)
    updateTokenHistoryRecord(token, dailyToken)

    hourToken.volume = hourToken.volume + absBN(volumeChanged)
    dailyToken.volume = dailyToken.volume + absBN(volumeChanged)

    await token.save()
    await hourToken.save()
    await dailyToken.save()
}
