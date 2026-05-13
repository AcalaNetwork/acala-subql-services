import { beforeEach, expect, test } from "bun:test";
import { handleRequestedRedeem } from "../src/handlers/handleRequestedRedeem";

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
    getByFields: async () => [],
  };

  (globalThis as any).logger = {
    warn: () => undefined,
  };
});

test("stores RequestedRedeem allowFastMatch as a primitive boolean", async () => {
  const allowFastMatch = { toString: () => "true" };
  const event = {
    idx: 19,
    event: {
      data: [
        "rWsv8gnehCgrqxSPtz5his5LVW2Pdy9515FmwYJdu3VRU5M",
        { toString: () => "8997241665883" },
        allowFastMatch,
      ],
    },
    block: {
      timestamp: new Date("2026-05-13T00:00:00.000Z"),
      block: {
        hash: { toString: () => "0x73bbe8ae8073e974b18f0fc754e7c2b21872ae1a6fe1fd8ff3d845e812674d1b" },
        header: {
          number: {
            toBigInt: () => 2649734n,
          },
        },
      },
    },
  } as any;

  await handleRequestedRedeem(event);

  const record = getEntityRecords("RequestedRedeem").get("2649734-19");

  expect(record.allowFastMatch).toBe(true);
  expect(typeof record.allowFastMatch).toBe("boolean");
  expect(record.allowFastMatch).not.toBe(allowFastMatch);
});
