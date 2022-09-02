import { SubstrateBlock } from "@subql/types";

export function getBlockHash (block: SubstrateBlock) {
  return block.block.hash.toString();
}

export function getBlockNumber (block: SubstrateBlock) {
  return block.block.header.number.toBigInt();
}

export function getBlockTimestamp (block: SubstrateBlock) {
  return block.timestamp;
}