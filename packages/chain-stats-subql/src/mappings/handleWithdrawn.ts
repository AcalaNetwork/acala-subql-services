import { updateAccountBalance } from '../utils/updateAccountBalance'
import { updateToken } from '../utils/updateToken'

export async function handleWithdrawn(
    recipientId: string,
    tokenName: string,
    amount: bigint,
    timestamp: Date,
    blockNumber: bigint
) {
    // if the withdrawn event had been sent, that means the new amount of token had been burned
    await updateToken(tokenName, -amount, amount, BigInt(0), blockNumber, timestamp)
    await updateAccountBalance(recipientId, tokenName, -amount, BigInt(0), timestamp, blockNumber)
}
