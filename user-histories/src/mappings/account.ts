import { SubstrateEvent } from "@subql/types";
import { Account } from "../types";
import { decodeAddress } from "@polkadot/util-crypto";
import { u8aToHex, stringToHex } from "@polkadot/util";

// the address is a system account when the public key starts with "modl"
function isSystemAccount(id: string) {
  return u8aToHex(decodeAddress(id)).startsWith(stringToHex("modl"));
}

export async function checkAndGetAccount(id: string, blockNumber: number) {
  let account = await Account.get(id.toLowerCase());

  // create the account if it doesn't exist
  if (!account) {
    account = Account.create({
      id: id.toLowerCase(),
      publicKey: decodeAddress(id).toString().toLowerCase(),
      firstActiveBlock: blockNumber,
      lastActiveBlock: blockNumber,
      isSystem: isSystemAccount(id),
    });
  }

  // update the last active block
  account.lastActiveBlock = blockNumber;

  return account;
}
