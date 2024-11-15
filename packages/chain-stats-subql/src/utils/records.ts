import { isSystemAccount, getNativeCurrency, getTokenDecimals, isTokenEqual, getSystemAccountName } from '@acala-network/subql-utils'
import { Block, Token, Account, AccountBalance, DailyAccountBalance, HourAccountBalance, HourToken, DailyToken } from '../types/models'

const nativeToken = getNativeCurrency(api as any);

export async function getBlock(id: string) {
    let record = await Block.get(id)

    if (!record) {
        record = new Block(id)
    }

    return record
}

export async function getToken(id: string) {
    let record = await Token.get(id)

    if (!record) {
        record = new Token(id)
        record.decimals = await getTokenDecimals(api as any, id);

        let issuance = BigInt(0)

        // try to read native token issuance amount from chain, the native token issuance was setted when the chain started
        if (isTokenEqual(id, nativeToken)) {
            const rawIssuance = await api.query.balances.totalIssuance()

            issuance = BigInt(rawIssuance.toString())
        }

        record.volume = BigInt(0)
        record.reserved = BigInt(0)
        record.issuance = issuance
        record.updateAtBlock = BigInt(0)
    }

    return record
}

export async function getHourToken(tokenName: string, timestamp: Date) {
    const id = `${tokenName}-${timestamp.getTime()}`

    let record = await HourToken.get(id)

    if (!record) {
        record = new HourToken(id)

        record.tokenId = tokenName
        record.volume = BigInt(0)
        record.reserved = BigInt(0)
        record.timestmap = timestamp
        record.updateAtBlock = BigInt(0)
    }

    return record
}

export async function getDailyToken(tokenName: string, timestamp: Date) {
    const id = `${tokenName}-${timestamp.getTime()}`

    let record = await DailyToken.get(id)

    if (!record) {
        record = new DailyToken(id)

        record.tokenId = tokenName
        record.volume = BigInt(0)
        record.reserved = BigInt(0)
        record.timestmap = timestamp
        record.updateAtBlock = BigInt(0)
    }

    return record
}

export async function getAccount(id: string) {
    let record = await Account.get(id)

    if (!record) {
        const isSystem = isSystemAccount(id)

        record = new Account(id)

        record.address = id
        record.mark = isSystem ? 'system' : 'user'
    }

    return record
}

export async function getAccountBalance(
    address: string,
    tokenName: string,
    blockNumber: bigint
) {
    const id = `${address}-${tokenName}`

    let record = await AccountBalance.get(id)

    if (!record) {
        record = new AccountBalance(id)

        record.accountId = address
        record.tokenId = tokenName

        let free = BigInt(0);
        let reserved = BigInt(0);

        record.total = free + reserved
        record.free = free
        record.reserved = reserved
    }

    record.updateAtBlock = blockNumber

    return record
}

export async function getHourAccountBalance(address: string, tokenName: string, timestamp: Date) {
    const id = `${address}-${tokenName}-${timestamp.getTime()}`

    let record = await HourAccountBalance.get(id)

    if (!record) {
        record = new HourAccountBalance(id)

        // initialize all value
        record.accountId = address
        record.tokenId = tokenName
        record.total = BigInt(0)
        record.free = BigInt(0)
        record.reserved = BigInt(0)
        record.timestamp = timestamp
        record.updateAtBlock = BigInt(0)
    }

    return record
}

export async function getDailyAccountBalance(address: string, tokenName: string, timestamp: Date) {
    const id = `${address}-${tokenName}-${timestamp.getTime()}`

    let record = await DailyAccountBalance.get(id)

    if (!record) {
        record = new DailyAccountBalance(id)

        // initialize all value
        record.accountId = address
        record.tokenId = tokenName
        record.total = BigInt(0)
        record.free = BigInt(0)
        record.reserved = BigInt(0)
        record.timestamp = timestamp
        record.updateAtBlock = BigInt(0)
    }

    return record
}
