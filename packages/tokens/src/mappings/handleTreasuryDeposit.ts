/*
the treasury will take some native tokens as network fee
the treasury wil also take account dust
*/
import { getAccountBalance } from '../utils/records'
import { getTreasuryAccount, isTokenEqual, getNativeCurrency } from '@acala-network/subql-utils'
import { updateAccountBalance } from '../utils/updateAccountBalance'
import { updateToken } from '../utils/updateToken'

export async function handleTreasuryDeposit(accountId: string, tokenName: string, amount: bigint, timestamp: Date, blockNumber: bigint) {
    const treasurAccount = getTreasuryAccount()
    const nativeToken = getNativeCurrency(api as any);

    // we treat treasury.deposit as transfer, so volume should increase
    await updateToken(tokenName, BigInt(0), amount, BigInt(0), BigInt(0), blockNumber, timestamp)
    await updateAccountBalance(treasurAccount, tokenName, amount, BigInt(0), BigInt(0), timestamp, blockNumber)

    const accountBalnace = await getAccountBalance(accountId, tokenName, blockNumber) 

    if (accountBalnace.frozen > amount && isTokenEqual(tokenName, nativeToken)) {
        await updateAccountBalance(accountId, tokenName, BigInt(0), BigInt(0), -amount, timestamp, blockNumber)
    } else {
        await updateAccountBalance(accountId, tokenName, -amount, BigInt(0), BigInt(0), timestamp, blockNumber)
    }
}
