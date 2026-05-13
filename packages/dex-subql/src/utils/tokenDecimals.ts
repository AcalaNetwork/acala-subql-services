import {
	AnyApi,
	forceToCurrencyName,
	getERC20TokenAddressFromName,
	getForeignAssetIdFromName,
	getStableAssetPoolIdFromName,
	isDexShareName,
	isERC20Name,
	isForeignAssetName,
	isLiquidCrowdloanName,
	isStableAssetName,
	unzipDexShareName
} from "@acala-network/sdk-core";

let tokenDecimals: Record<string, number> = {};

const getTokenName = (token: unknown) => forceToCurrencyName(token as any);

const hydrateNativeTokenDecimals = (api: AnyApi) => {
	if (Object.keys(tokenDecimals).length > 0) return;

	tokenDecimals = Object.fromEntries(
		api.registry.chainTokens.map((token: string, index: number) => {
			const decimals = api.registry.chainDecimals[index];
			return [token, Number(decimals.toString())];
		})
	);
};

export async function getTokenDecimals(api: AnyApi, token: unknown) {
	hydrateNativeTokenDecimals(api);

	const name = getTokenName(token);
	const stakingTokenName = getTokenName(
		api.consts?.homaLite?.stakingCurrencyId ||
		api.consts?.homa?.stakingCurrencyId ||
		api.consts?.prices?.getStakingCurrencyId
	);

	if (isDexShareName(name)) {
		const [token0] = unzipDexShareName(name);
		return getTokenDecimals(api, token0);
	}

	if (isLiquidCrowdloanName(name)) {
		return tokenDecimals[stakingTokenName];
	}

	if (isForeignAssetName(name) && api.query.assetRegistry && !tokenDecimals[name]) {
		const metadata = await api.query.assetRegistry.assetMetadatas({ ForeignAssetId: getForeignAssetIdFromName(name) }) as any;
		tokenDecimals[name] = metadata.unwrapOrDefault()?.decimals?.toNumber();
	}

	if (isStableAssetName(name) && api.query.assetRegistry && !tokenDecimals[name]) {
		const metadata = await api.query.assetRegistry.assetMetadatas({ StableAssetId: getStableAssetPoolIdFromName(name) }) as any;
		tokenDecimals[name] = metadata.unwrapOrDefault()?.decimals?.toNumber();
	}

	if (isERC20Name(name) && api.query.assetRegistry && !tokenDecimals[name]) {
		const metadata = await api.query.assetRegistry.assetMetadatas({ Erc20: getERC20TokenAddressFromName(name) }) as any;
		tokenDecimals[name] = metadata.unwrapOrDefault()?.decimals?.toNumber();
	}

	return tokenDecimals[name] || 12;
}
