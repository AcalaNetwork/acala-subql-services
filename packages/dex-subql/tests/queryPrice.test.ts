import { beforeEach, expect, test } from "bun:test";
import { queryPrice, ensurePriceBundleBlock, toSafePriceChainData } from "../src/utils/queryPrice";

const records = new Map<string, Map<string, any>>();

const getEntityRecords = (entity: string) => {
	let entityRecords = records.get(entity);

	if (!entityRecords) {
		entityRecords = new Map<string, any>();
		records.set(entity, entityRecords);
	}

	return entityRecords;
};

beforeEach(() => {
	records.clear();

	(globalThis as any).store = {
		get: async (entity: string, id: string) => getEntityRecords(entity).get(id),
		set: async (entity: string, id: string, value: any) => {
			getEntityRecords(entity).set(id, { ...value });
		},
		remove: async (entity: string, id: string) => {
			getEntityRecords(entity).delete(id);
		},
		getByField: async () => [],
		getByFields: async () => []
	};

	(globalThis as any).logger = {
		warn: () => undefined,
		info: () => undefined,
	};
});

test("ensurePriceBundleBlock saves the referenced block before PriceBundle writes use it", async () => {
	const block = {
		block: {
			header: {
				number: {
					toString: () => "42"
				}
			},
			hash: {
				toString: () => "0xblockhash"
			}
		},
		timestamp: new Date("2026-05-13T00:00:00.000Z")
	} as any;

	const savedBlock = await ensurePriceBundleBlock(block);
	const storedBlock = getEntityRecords("Block").get("42");

	expect(savedBlock.id).toBe("42");
	expect(storedBlock.hash).toBe("0xblockhash");
	expect(storedBlock.number).toBe(42n);
	expect(storedBlock.timestamp.toISOString()).toBe("2026-05-13T00:00:00.000Z");
});

test("toSafePriceChainData defaults invalid fixed-point output to zero", () => {
	const logger = {
		warn() {
			if (this !== logger) {
				throw new Error("logger called without binding");
			}
		},
	};

	(globalThis as any).logger = logger;

	const invalidPrice = {
		toChainData: () => "NaN",
	} as any;

	expect(toSafePriceChainData(invalidPrice, "Karura block 2649603")).toBe(0n);
});

test("Karura block 2649603 stores zero instead of crashing when KUSD pool inputs are unavailable", async () => {
	(globalThis as any).api = {
		registry: {
			createType: (_type: string, value: unknown) => value,
		},
		consts: {
			dex: {
				getExchangeFee: [1, 1000],
			},
			prices: {
				getStakingCurrencyId: "KAR",
				getStableCurrencyId: "KUSD",
			},
		},
		query: {
			oracle: {
				values: async () => ({
					unwrapOrDefault: () => ({
						value: {
							toString: () => "0",
						},
					}),
				}),
			},
		},
	};

	getEntityRecords("Token").set("KAR", {
		id: "KAR",
		name: "KAR",
		decimals: 12,
		price: 0n,
	});
	getEntityRecords("Token").set("KUSD", {
		id: "KUSD",
		name: "KUSD",
		decimals: 12,
		price: 0n,
	});

	const block = {
		block: {
			header: {
				number: {
					toString: () => "2649603",
				},
			},
			hash: {
				toString: () => "0xkarura",
			},
		},
		timestamp: new Date("2026-05-13T00:00:00.000Z"),
	} as any;

	await queryPrice((globalThis as any).api, block, "KUSD");

	expect(getEntityRecords("Token").get("KUSD").price).toBe(0n);
	expect(getEntityRecords("PriceBundle").get("2649603-KUSD").price).toBe(0n);
});
