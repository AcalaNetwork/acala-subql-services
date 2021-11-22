import { updateAccountBalance } from '../utils/updateAccountBalance'
import { updateToken } from '../utils/updateToken'

export async function handleUnReserved(accountId: string, tokenName: string, amount: bigint, timestamp: Date) {
  // reserved isn't includes in the trading volume
    await updateToken(tokenName, BigInt(0), BigInt(0), -amount, BigInt(0), timestamp)
    await updateAccountBalance(accountId, tokenName, amount, -amount, BigInt(0), timestamp)
}