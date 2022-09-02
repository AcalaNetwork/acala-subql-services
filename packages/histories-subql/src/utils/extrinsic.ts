import { SubstrateEvent } from "@subql/types";

export function getExtrinsicHashFromEvent (event: SubstrateEvent) {
  return event.extrinsic?.extrinsic?.hash?.toString();
}