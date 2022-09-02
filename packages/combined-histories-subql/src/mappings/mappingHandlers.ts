import { SubstrateEvent } from "@subql/types"
import { currentEraBumped } from '../handlers/currentEraBumped';
import { minted } from "../handlers/minted";
import { redeemed } from "../handlers/redeemed";
import { redeemedByFastMatch } from "../handlers/redeemedByFastMatch";
import { RedeemedByUnbond } from "../handlers/RedeemedByUnbond";
import { redeemRequestCancelled } from "../handlers/redeemRequestCancelled";
import { redeemRequested } from "../handlers/redeemRequested";
import { requestedRedeem } from "../handlers/requestedRedeem";
import { handleTransfer } from '../handles/handleTransfer'
import { getNativeCurrency, getTokenName } from '@acala-network/subql-utils'

/** homa */
export const handleMinted = async (event: SubstrateEvent) => {
  await minted(event);
}
export const handleRedeemRequestCancelled = async (event: SubstrateEvent) => {
  await redeemRequestCancelled(event);
}
export const handleRedeemRequested = async (event: SubstrateEvent) => {
  await redeemRequested(event);
}
export const handleRedeemed = async (event: SubstrateEvent) => {
  await redeemed(event);
}
export const handleRequestedRedeem = async (event: SubstrateEvent) => {
  await requestedRedeem(event);
}
export const handleRedeemedByFastMatch = async (event: SubstrateEvent) => {
  await redeemedByFastMatch(event);
}
export const handleRedeemedByUnbond = async (event: SubstrateEvent) => {
  await RedeemedByUnbond(event);
}
export const handleCurrentEraBumped = async (event: SubstrateEvent) => {
  await currentEraBumped(event);
}


/** transfer */
const nativeToken = getNativeCurrency(api as any);

// handle balances.Transfer
export async function handleBalancesTransfer(event: SubstrateEvent) {
    const [from, to, value] = event.event.data
    const fromId = from.toString()
    const toId = to.toString()
    const amount = BigInt(value.toString())
    const tokenName = getTokenName(nativeToken)

    await handleTransfer(tokenName, fromId, toId, amount, event)
}


// handle currencies.Transferred
export async function handleCurrenciesTransfer(event: SubstrateEvent) {
    const [currency, from, to, value] = event.event.data
    const fromId = from.toString()
    const toId = to.toString()
    const amount = BigInt(value.toString())
    const tokenName = getTokenName(currency)
    const nativeName = getTokenName(nativeToken)

    // don't handle native token here
    if (tokenName === nativeName) return;

    await handleTransfer(tokenName, fromId, toId, amount, event)
}

/** incentive */
export const handleDepositDexShare = async (event: SubstrateEvent) => {
  await depositDexShare(event);
}
export const handleWithdrawDexShare = async (event: SubstrateEvent) => {
  await whithdrawDexShare(event);
}
export const handlePayoutRewards = async (event: SubstrateEvent) => {
  await payoutRewards(event);
}
export const handleClaimRewards = async (event: SubstrateEvent) => {
  await claimRewards(event);
}