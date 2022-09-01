export declare function getPalletAddress(value: string, prefix?: number): string;
/** get address public key */
export declare function getPublicKey(address: string): `0x${string}`;
/** return true when the address is a system address */
export declare function isSystemAccount(address: string): boolean;
/** return system pallet id */
export declare function getSystemAccountName(address: string): string;
/** return treasury account address */
export declare function getTreasuryAccount(prefix?: number): string;
