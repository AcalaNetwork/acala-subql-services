import { updateAccountBalance } from '../utils/updateAccountBalance'
import { updateToken } from '../utils/updateToken'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handleReservedRepatriated(status: any, fromId: string, toId: string, tokenName: string, amount: bigint, timestamp: Date, blockNumber: bigint) {
    // reserved isn't includes in the trading volume
    await updateToken(tokenName, BigInt(0), BigInt(0), BigInt(0), BigInt(0), blockNumber, timestamp)

    // handle two types of MiscBalnaceStatus
    if (status.isFree) {
        await updateAccountBalance(fromId, tokenName, BigInt(0), -amount, BigInt(0), timestamp, blockNumber)
        await updateAccountBalance(toId, tokenName, amount, BigInt(0), BigInt(0), timestamp, blockNumber)
    }

    if (status.isReserved) {
        await updateAccountBalance(fromId, tokenName, BigInt(0), -amount, BigInt(0), timestamp, blockNumber)
        await updateAccountBalance(toId, tokenName, BigInt(0), amount, BigInt(0), timestamp, blockNumber)
    }
}
