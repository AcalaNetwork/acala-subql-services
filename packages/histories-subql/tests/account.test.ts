import { beforeEach, expect, test } from "bun:test";
import { stringToU8a } from "@polkadot/util";
import { encodeAddress } from "@polkadot/util-crypto";
import { getAccount, isSystemAccountSafe } from "../src/records/common";
import { AccountType } from "../src/types";

const records = new Map<string, Map<string, any>>();
const ACALA_PREFIX = 10;
const KARURA_PREFIX = 8;

let warnings: string[] = [];

const userAddress = (prefix: number, value: number) => encodeAddress(new Uint8Array(32).fill(value), prefix);
const systemAddress = (prefix: number, pallet: string) => encodeAddress(stringToU8a(`modl${pallet}`.padEnd(32, "\0")), prefix);

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
  warnings = [];

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
    warn: (message: string) => {
      warnings.push(message);
    },
  };
});

test("classifies Acala and Karura user addresses without throwing", () => {
  expect(isSystemAccountSafe(userAddress(ACALA_PREFIX, 1))).toBe(false);
  expect(isSystemAccountSafe(userAddress(KARURA_PREFIX, 2))).toBe(false);
});

test("does not warn when classifying a normal non-system account", async () => {
  const address = userAddress(KARURA_PREFIX, 3);
  const account = await getAccount(address);

  expect(account.type).toBe(AccountType.USER);
  expect(warnings).toEqual([]);
});

test("classifies the Karura history system account without crashing", async () => {
  const account = await getAccount("qmmNufxeWaAVN8EJK58yYNW1HDcpSLpqGThui55eT3Dfr1a");

  expect(account.type).toBe(AccountType.SYSTEM);
  expect(account.address).toBe("qmmNufxeWaAVN8EJK58yYNW1HDcpSLpqGThui55eT3Dfr1a");
});

test("detects modl public keys as system accounts across Acala and Karura prefixes", () => {
  expect(isSystemAccountSafe(systemAddress(ACALA_PREFIX, "aca/trsy"))).toBe(true);
  expect(isSystemAccountSafe(systemAddress(KARURA_PREFIX, "aca/trsy"))).toBe(true);
});

test("falls back to a non-system account when an address cannot be decoded", () => {
  expect(isSystemAccountSafe("not-an-address")).toBe(false);
  expect(warnings).toEqual([]);
});
