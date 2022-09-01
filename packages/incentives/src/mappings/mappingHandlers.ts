import { SubstrateEvent } from "@subql/types"
import { claimRewards } from "../handlers/claimRewards";
import { depositDexShare } from "../handlers/depositDexShare";
import { payoutRewards } from "../handlers/payoutRewards";
import { whithdrawDexShare } from "../handlers/whithdrawDexShare";

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