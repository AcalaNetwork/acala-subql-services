import { SubstrateEvent } from "@subql/types";

export function handleTransfer (event: SubstrateEvent) {
  logger.info(JSON.stringify(event.event.data.toJSON()));
}