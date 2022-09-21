import { getStartOfDay, getStartOfHour } from '@acala-network/subql-utils'
import { Token, DailyToken, HourToken } from '../types/models'
import { getToken, getDailyToken, getHourToken } from './records'

function absBN(n: bigint) {
    return n > BigInt(0) ? n : -n
}

export function updateTokenHistoryRecord(source: Token, target: HourToken | DailyToken) {
    target.issuance = source.issuance
    target.reserved = source.reserved
    target.updateAtBlock = source.updateAtBlock
}

/**
 * @name updateToken
 * @param tokenName
 * @param issuanceChanged
 * @param volumeChanged
 * @param reservedChanged
 * @param blockNumber
 * @param timestamp
 */
export async function updateToken(
    tokenName: string,
    issuanceChanged: bigint,
    volumeChanged: bigint,
    reservedChanged: bigint,
    blockNumber: bigint,
    timestamp: Date
) {
    const token = await getToken(tokenName)

    const hourDate = getStartOfHour(timestamp)
    const dayDate = getStartOfDay(timestamp)
    const hourToken = await getHourToken(tokenName, hourDate)
    const dailyToken = await getDailyToken(tokenName, dayDate)

    token.volume = token.volume + absBN(volumeChanged)
    token.issuance = token.issuance + issuanceChanged
    token.reserved = token.reserved + reservedChanged
    token.updateAtBlock = blockNumber

    updateTokenHistoryRecord(token, hourToken)
    updateTokenHistoryRecord(token, dailyToken)

    hourToken.volume = hourToken.volume + absBN(volumeChanged)
    dailyToken.volume = dailyToken.volume + absBN(volumeChanged)

    await token.save()
    await hourToken.save()
    await dailyToken.save()
}
