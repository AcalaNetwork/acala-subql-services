import { updateAccountBalance } from '../utils/updateAccountBalance'
import { updateToken } from '../utils/updateToken'

export async function handleBalanceUpdated(recipientId: string, tokenName: string, amount: bigint, timestamp: Date, blockNumber: bigint) {
    // balanceUpdated event will increase total issuance and recipient free balance
    await updateToken(tokenName, amount, BigInt(0), BigInt(0), blockNumber, timestamp)
    await updateAccountBalance(recipientId, tokenName, amount, BigInt(0), timestamp, blockNumber)
}
