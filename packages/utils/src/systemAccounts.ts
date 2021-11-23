import { u8aToU8a, stringToU8a } from '@polkadot/util'
import { encodeAddress } from '@polkadot/util-crypto'
import { defaults } from '@polkadot/util-crypto/address/defaults'
import { SystemAccountNotFound } from './errors'

interface SystemAccountData {
    name: string
    value: string
}

const DEFAULT_PREFIX = api.registry.chainSS58 || defaults.prefix

const PALLET_IDS = {
    TreasuryPalletId: 'aca/trsy',
    LoansPalletId: 'aca/loan',
    DEXPalletId: 'aca/dexm',
    CDPTreasuryPalletId: 'aca/cdpt',
    HonzonTreasuryPalletId: 'aca/hztr',
    HomaTreasuryPalletId: 'aca/hmtr',
    IncentivesPalletId: 'aca/inct',
    CollatorPotId: 'aca/cpot',
    TreasuryReservePalletId: 'aca/reve',
    NftPalletId: 'aca/aNFT',
    UnreleasedNativeVaultAccountId: 'aca/urls',
}

const getPalletAddress = (value: string, ss58: number) => encodeAddress(u8aToU8a(stringToU8a(`modl${value}`.padEnd(32, '\0'))), ss58)

export const PALLET_ADDRESS = Object.fromEntries(
    Object.entries(PALLET_IDS).map(([k, v]) => [
        getPalletAddress(v, DEFAULT_PREFIX),
        {
            value: v,
            name: k,
        },
    ])
) as Record<string, SystemAccountData>

export function isSystemAccount(address: string) {
    // format address with 42 as ss58
    const temp = encodeAddress(address, DEFAULT_PREFIX)

    return PALLET_ADDRESS[temp] ?? false
}

export function getTreasuryAccount(prefix = DEFAULT_PREFIX): string {
    return getPalletAddress(PALLET_IDS['TreasuryPalletId'], prefix)
}

export function getSystemAccount(target: string, prefix = DEFAULT_PREFIX): string {
    const searchResult = PALLET_IDS[target] || Object.entries(PALLET_IDS).find(([k, v]) => k === target || v === target)?.[1]

    if (!searchResult) throw new SystemAccountNotFound(target)

    return getPalletAddress(searchResult, prefix)
}
