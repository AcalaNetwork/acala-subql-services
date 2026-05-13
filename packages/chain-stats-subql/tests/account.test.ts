import { beforeEach, expect, test } from "bun:test";

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

  (globalThis as any).api = {
    consts: {
      currencies: {
        getNativeCurrencyId: "KAR",
      },
    },
  };

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

test("does not throw when a Karura snapshot account has an invalid checksum", async () => {
  const { getAccount, isSystemAccountSafe } = await import("../src/utils/records");

  expect(isSystemAccountSafe("qHz7aFFfQCcVcVVkzeYeNGoaDMivV9jUXLMBqSMLzFYkfmC")).toBe(false);

  const account = await getAccount("qHz7aFFfQCcVcVVkzeYeNGoaDMivV9jUXLMBqSMLzFYkfmC");

  expect(account.address).toBe("qHz7aFFfQCcVcVVkzeYeNGoaDMivV9jUXLMBqSMLzFYkfmC");
  expect(account.mark).toBe("user");
});
