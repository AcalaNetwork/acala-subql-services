import { beforeEach, expect, test } from "bun:test";
import { ensurePriceBundleBlock } from "../src/utils/queryPrice";

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
