import { SubstrateEvent } from '@subql/types'
import { getAccount, getToken, getTokenDailyRecprod, getTransfer, getUserDailyReport, getUserDailyReportGroup } from './record'
import { getDateEndOfDay, isSystemAccount } from '@acala-network/subql-utils'
import { getTokenDecimal } from './token'
import { FixedPointNumber } from '@acala-network/sdk-core'

function isDispatchedBySystem(from: string, to: string) {
    return !!(isSystemAccount(from) || isSystemAccount(to))
}

function getDisplayMessage(fromId: string, toId: string, amount: bigint, tokenName: string) {
    const displayAmount = FixedPointNumber.fromInner(amount.toString(), getTokenDecimal(tokenName)).toString(6)

    return `Transfer ${displayAmount} ${tokenName} from ${fromId} to ${toId}`
}

export async function createTransfer(fromId: string, toId: string, tokenName: string, amount: bigint, event: SubstrateEvent) {
    const txHash = event.extrinsic.extrinsic.hash
    const idx = event.idx
    const block = event.block
    const extrinsic = event.extrinsic
    const fromAccount = await getAccount(fromId)
    const toAccount = await getAccount(toId)
    const tokenRecord = await getToken(tokenName)
    const transfer = await getTransfer(`${txHash}-${idx}`)

    const dateEndOfDay = getDateEndOfDay(block.timestamp).toDate()
    const dispatchedBySystem = isDispatchedBySystem(fromId, toId)

    transfer.fromId = fromAccount.id
    transfer.toId = toAccount.id
    transfer.amount = amount
    transfer.tokenId = tokenRecord.id
    transfer.atBlock = block.block.header.number.toBigInt()
    transfer.atBlockHash = block.block.hash.toString()
    transfer.atExtrinsicHash = extrinsic.extrinsic.hash.toString()
    transfer.timestamp = block.timestamp
    transfer.isDispatchedBySystem = dispatchedBySystem
    transfer.displayMessage = getDisplayMessage(fromId, toId, amount, tokenName)

    const fromAccountDailyReportGroup = await getUserDailyReportGroup(`${fromId}-${dateEndOfDay.getTime()}`)
    const fromAccountDailyReport = await getUserDailyReport(`${fromId}-${tokenName}-${dateEndOfDay.getTime()}`)
    const toAccountDailyReportGroup = await getUserDailyReportGroup(`${toId}-${dateEndOfDay.getTime()}`)
    const toAccountDailyReport = await getUserDailyReport(`${toId}-${tokenName}-${dateEndOfDay.getTime()}`)
    const tokenDailyReport = await getTokenDailyRecprod(`${tokenName}-${dateEndOfDay.getTime()}`)

    tokenRecord.transferCount += dispatchedBySystem ? 0 : 1
    tokenRecord._transferCount += 1

    fromAccount.transferCount += dispatchedBySystem ? 0 : 1
    fromAccount._transferCount += 1

    fromAccountDailyReport.groupId = fromAccountDailyReportGroup.id
    fromAccountDailyReport.accountId = fromId
    fromAccountDailyReport.tokenId = tokenRecord.id
    fromAccountDailyReport._transferCount += 1

    if (!dispatchedBySystem) {
        fromAccountDailyReport.transferCount += 1
        fromAccountDailyReport.out = fromAccountDailyReport.out + transfer.amount
        fromAccountDailyReport.volume = fromAccountDailyReport.volume + transfer.amount
        fromAccountDailyReport.abs = fromAccountDailyReport.abs - transfer.amount
    }

    fromAccountDailyReportGroup.accountId = fromId
    fromAccountDailyReportGroup._transferCount += 1
    fromAccountDailyReportGroup.timestamp = dateEndOfDay

    if (!dispatchedBySystem) {
        fromAccountDailyReportGroup.transferCount += 1
    }

    // only increase the from account transfer count
    toAccountDailyReport.accountId = toId
    toAccountDailyReport.groupId = toAccountDailyReportGroup.id
    toAccountDailyReport.tokenId = tokenRecord.id
    toAccountDailyReport.timestamp = dateEndOfDay

    if (!dispatchedBySystem) {
        toAccountDailyReport.in = toAccountDailyReport.in + transfer.amount
        toAccountDailyReport.volume = toAccountDailyReport.volume + transfer.amount
        toAccountDailyReport.abs = toAccountDailyReport.abs + transfer.amount
    }

    toAccountDailyReportGroup.accountId = toId
    toAccountDailyReportGroup.timestamp = dateEndOfDay

    tokenDailyReport.tokenId = tokenRecord.id
    tokenDailyReport._transferCount += 1
    tokenDailyReport.timestamp = dateEndOfDay

    if (!dispatchedBySystem) {
        tokenDailyReport.volume = tokenDailyReport.volume + transfer.amount
        tokenDailyReport.transferCount += 1
    }

    await fromAccount.save()
    await toAccount.save()
    await tokenRecord.save()
    await transfer.save()
    await fromAccountDailyReportGroup.save()
    await fromAccountDailyReport.save()
    await toAccountDailyReportGroup.save()
    await toAccountDailyReport.save()
    await tokenDailyReport.save()
}
