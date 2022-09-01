import { AnyApi } from '@acala-network/sdk-core';
export declare function isTokenEqual(t1: any, t2: any): boolean;
export declare function getTokenName(token: any): string;
export declare function getTokenDecimals(api: AnyApi, token: any): any;
export declare function getStakingCurrency(api: AnyApi): import("@polkadot/types/types").Codec;
export declare function getLiquidCurrency(api: AnyApi): import("@polkadot/types/types").Codec;
export declare function getStableCoinCurrency(api: AnyApi): import("@polkadot/types/types").Codec;
export declare function getNativeCurrency(api: AnyApi): import("@polkadot/types/types").Codec;
