import { SubstrateBlock } from "@subql/types";
import { Block } from "../types";

export async function checkAndGetBlock(block: SubstrateBlock) {
  let blockEntity = await Block.get(block.block.header.number.toString());

  if (!blockEntity) {
    blockEntity = Block.create({
      id: block.block.header.number.toString(),
      number: block.block.header.number.toNumber(),
      hash: block.block.hash.toString(),
      timestamp: block.timestamp ?? new Date(),
    });
  }

  return blockEntity;
}
