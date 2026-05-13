import { beforeEach, expect, test } from "bun:test";
import { getAccount, isSystemAccountSafe } from "../src/records/common";
import { AccountType } from "../src/types";

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

test("classifies the Karura history system account without crashing", async () => {
  const account = await getAccount("qmmNufxeWaAVN8EJK58yYNW1HDcpSLpqGThui55eT3Dfr1a");

  expect(account.type).toBe(AccountType.SYSTEM);
  expect(account.address).toBe("qmmNufxeWaAVN8EJK58yYNW1HDcpSLpqGThui55eT3Dfr1a");
});

test("falls back to a non-system account when an address cannot be decoded", () => {
  expect(isSystemAccountSafe("not-an-address")).toBe(false);
});
