import { AnyApi, FixedPointNumber, MaybeCurrency } from '@acala-network/sdk-core';
import { SubstrateBlock } from '@subql/types/dist/interfaces';
export declare const queryPriceFromOracle: (api: AnyApi, block: SubstrateBlock, token: MaybeCurrency) => Promise<FixedPointNumber>;
