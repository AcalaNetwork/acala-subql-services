import { expect, test } from "bun:test";
import { getInitialBalanceRecords, resetInitialBalanceReadersForTests } from "../src/utils/balanceData";

test("streams only the requested Acala initial-balance batch", async () => {
  resetInitialBalanceReadersForTests();

  const records = await getInitialBalanceRecords("acala", 0, 3);

  expect(records).toHaveLength(3);
  expect(records[0].account).toBeString();
  expect(records[0].token).toBe("ACA");
  expect(records[0].free).toBeString();
});

test("streams Karura batches without loading the full snapshot into the bundle", async () => {
  resetInitialBalanceReadersForTests();

  const firstBatch = await getInitialBalanceRecords("karura", 0, 2);
  const secondBatch = await getInitialBalanceRecords("karura", 2, 2);

  expect(firstBatch).toHaveLength(2);
  expect(secondBatch).toHaveLength(2);
  expect(secondBatch[0].account).not.toBe(firstBatch[0].account);
  expect(secondBatch[0].token).toBe("KAR");
});
