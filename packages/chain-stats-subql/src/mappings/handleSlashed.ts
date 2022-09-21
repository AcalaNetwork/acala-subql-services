import { updateAccountBalance } from "../utils/updateAccountBalance"
import { updateToken } from "../utils/updateToken"

export async function handleSlashed(accountId: string, tokenName: string, free: bigint, reserved: bigint, timestamp: Date, blockNumber: bigint) {
  await updateToken(tokenName, BigInt(0), free, reserved, blockNumber, timestamp)
  await updateAccountBalance(accountId, tokenName, free, reserved, timestamp, blockNumber)
}