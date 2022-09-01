import { MaybeCurrency, Token, createDexShareName } from "@acala-network/sdk-core";
import { getTokenName } from './getTokenName';

export function getPoolId (tokenA: MaybeCurrency, tokenB: MaybeCurrency): [string, string, string] {
	const [token0, token1] = Token.sortTokenNames(getTokenName(tokenA), getTokenName(tokenB));

	return [createDexShareName(token0, token1), token0, token1];
}