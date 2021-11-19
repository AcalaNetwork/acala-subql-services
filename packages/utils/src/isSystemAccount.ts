import { u8aToU8a, stringToU8a } from '@polkadot/util'
import { encodeAddress } from '@polkadot/util-crypto'
import { defaults } from '@polkadot/util-crypto/address/defaults'

interface SystemAccountData {
    name: string
    value: string
}

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

const PALLET_ADDRESS = Object.fromEntries(
    Object.entries(PALLET_IDS).map(([k, v]) => [
        getPalletAddress(v, defaults.prefix),
        {
            value: v,
            name: k,
        },
    ])
) as Record<string, SystemAccountData>

export function isSystemAccount(address: string) {
    // format address with 42 as ss58
    const temp = encodeAddress(address, defaults.prefix)

    return PALLET_ADDRESS[temp] ?? false
}
