import { u8aToU8a, stringToU8a, stringToHex, u8aToHex, hexToString } from '@polkadot/util'
import { encodeAddress, decodeAddress } from '@polkadot/util-crypto'
import { defaults } from '@polkadot/util-crypto/address/defaults'
import { NotSystemAccount } from './errors'

const DEFAULT_PREFIX = api.registry.chainSS58 || defaults.prefix

export function getPalletAddress(value: string, prefix = DEFAULT_PREFIX) {
    return encodeAddress(u8aToU8a(stringToU8a(`modl${value}`.padEnd(32, '\0'))), prefix)
}

/** get address public key */
export function getPublicKey(address: string) {
    return u8aToHex(decodeAddress(address));
}

/** return true when the address is a system address */
export function isSystemAccount(address: string): boolean {
    const publicKey = getPublicKey(address);

    return publicKey.startsWith(stringToHex('modl'));
}

/** return system pallet id */
export function getSystemAccountName(address: string): string {
    if (!isSystemAccount(address)) throw new NotSystemAccount(address);

    const publicKey = getPublicKey(address);

    // should remove all tail zero
    return hexToString(publicKey.replace(/0+$/, ''));
}

/** return treasury account address */
export function getTreasuryAccount(prefix = DEFAULT_PREFIX): string {
    return getPalletAddress('aca/trsy', prefix)
}
