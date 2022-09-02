import { updateAccountBalance } from '../utils/updateAccountBalance'
import { updateToken } from '../utils/updateToken'

export async function handleDeposit(
    recipientId: string,
    tokenName: string,
    amount: bigint,
    timestamp: Date,
    blockNumber: bigint,
    accountIsNew?: boolean
) {
    // if the deposit event had been sent, that means the new amount of token had been issued
    await updateToken(tokenName, amount, amount, BigInt(0), BigInt(0), blockNumber, timestamp)
    await updateAccountBalance(recipientId, tokenName, amount, BigInt(0), BigInt(0), timestamp, blockNumber, accountIsNew)
}
