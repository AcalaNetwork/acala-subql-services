import { SubstrateEvent } from "@subql/types";

export const getBlockNumber = (event: SubstrateEvent) => {
  return event.block.block.header.number.toBigInt();
};

export const getExtrinsicHash = (event: SubstrateEvent) => {
  return event.extrinsic?.extrinsic?.hash?.toString() || "";
};
