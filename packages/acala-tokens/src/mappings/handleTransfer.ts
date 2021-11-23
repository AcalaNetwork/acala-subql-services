import { updateAccountBalance } from '../utils/updateAccountBalance'
import { updateToken } from '../utils/updateToken'

export async function handleTransfer(tokenName: string, fromId: string, toId: string, amount: bigint, timestamp: Date) {
    await updateToken(tokenName, BigInt(0), amount, BigInt(0), BigInt(0), timestamp)
    await updateAccountBalance(fromId, tokenName, -amount, BigInt(0), BigInt(0), timestamp)
    await updateAccountBalance(toId, tokenName, amount, BigInt(0), BigInt(0), timestamp)
}
