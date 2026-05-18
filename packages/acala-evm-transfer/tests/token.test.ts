import { beforeEach, expect, mock, test } from "bun:test";

const records = new Map<string, unknown>();
let warnings: string[] = [];
let erc20Contract: {
  name: () => Promise<string>;
  symbol: () => Promise<string>;
  decimals: () => Promise<number>;
};

mock.module("../src/types/contracts", () => ({
  Erc20__factory: {
    connect: () => erc20Contract,
  },
}));

const { getToken } = await import("../src/mappings/token");

beforeEach(() => {
  records.clear();
  warnings = [];

  Object.assign(globalThis, {
    api: {},
    logger: {
      warn: (message: string) => warnings.push(message),
    },
    store: {
      get: async (entity: string, id: string) => records.get(`${entity}:${id}`),
      set: async (entity: string, id: string, value: unknown) => {
        records.set(`${entity}:${id}`, value);
      },
      remove: async (entity: string, id: string) => {
        records.delete(`${entity}:${id}`);
      },
    },
  });
});

test("persists fallback token metadata when decimals reverts", async () => {
  const address = "0x00000000000000000000000000000000006036414";
  const callException = new Error('call revert exception data="0x"');
  Object.assign(callException, { code: "CALL_EXCEPTION" });

  erc20Contract = {
    name: async () => "Broken Metadata Token",
    symbol: async () => "BMT",
    decimals: async () => {
      throw callException;
    },
  };

  const token = await getToken(address, {
    handler: "handleTransferEvent",
    blockHeight: 6036414,
    transactionHash: "0xdeadbeef",
    logIndex: 12,
  });

  expect(token.id).toBe(address);
  expect(token.name).toBe("Broken Metadata Token");
  expect(token.symbol).toBe("BMT");
  expect(token.decimals).toBe(0n);
  expect(records.get(`Token:${address}`)).toBe(token);
  expect(warnings).toHaveLength(1);
  expect(warnings[0]).toContain(`address=${address}`);
  expect(warnings[0]).toContain("method=decimals");
  expect(warnings[0]).toContain("handler=handleTransferEvent");
  expect(warnings[0]).toContain("block=6036414");
  expect(warnings[0]).toContain("tx=0xdeadbeef");
  expect(warnings[0]).toContain("logIndex=12");
  expect(warnings[0]).toContain("code=CALL_EXCEPTION");
});
