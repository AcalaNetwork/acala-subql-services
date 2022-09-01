import { RedeemedByUnbond } from "../handlers/RedeemedByUnbond";
import { SubstrateEvent } from "@subql/types";
import { currentEraBumped } from "../handlers/currentEraBumped";
import { minted } from "../handlers/minted";
import { redeemRequestCancelled } from "../handlers/redeemRequestCancelled";
import { redeemRequested } from "../handlers/redeemRequested";
import { redeemed } from "../handlers/redeemed";
import { redeemedByFastMatch } from "../handlers/redeemedByFastMatch";
import { requestedRedeem } from "../handlers/requestedRedeem";

export const handleMinted = async (event: SubstrateEvent) => {
  await minted(event);
};
export const handleRedeemRequestCancelled = async (event: SubstrateEvent) => {
  await redeemRequestCancelled(event);
};
export const handleRedeemRequested = async (event: SubstrateEvent) => {
  await redeemRequested(event);
};
export const handleRedeemed = async (event: SubstrateEvent) => {
  await redeemed(event);
};
export const handleRequestedRedeem = async (event: SubstrateEvent) => {
  await requestedRedeem(event);
};
export const handleRedeemedByFastMatch = async (event: SubstrateEvent) => {
  await redeemedByFastMatch(event);
};
export const handleRedeemedByUnbond = async (event: SubstrateEvent) => {
  await RedeemedByUnbond(event);
};
export const handleCurrentEraBumped = async (event: SubstrateEvent) => {
  await currentEraBumped(event);
};
