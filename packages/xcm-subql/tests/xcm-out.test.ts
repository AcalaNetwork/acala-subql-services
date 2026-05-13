import { beforeEach, expect, test } from "bun:test";
import { handleXCMOut } from "../src/handlers/xcm-out";

const records = new Map<string, Map<string, any>>();
const savedLogs: string[] = [];

const senderAddress = "25b7KcQUAL4UKqTb7sF5FDXuDZcwKdqbYLEG5BT8P32tgm2z";
const moonbeamSibling = "23UvQ3ZQXJ5LfTUSYkcRPkQX2FHgcKxGmqdxYJe9j5e3Lwsi";
const amount = "10000000000";
const ldotGeneralKey = "0x0003000000000000000000000000000000000000000000000000000000000000";

function getEntityRecords (entity: string) {
  let entityRecords = records.get(entity);

  if (!entityRecords) {
    entityRecords = new Map<string, any>();
    records.set(entity, entityRecords);
  }

  return entityRecords;
}

function codec (value: unknown) {
  return {
    toJSON: () => value,
    toString: () => typeof value === "string" ? value : JSON.stringify(value),
  };
}

function runtimeEvent (section: string, method: string, data: unknown[]) {
  return {
    event: {
      section,
      method,
      data,
    },
  };
}

function xcmOutEvent (extrinsicEvents: any[]) {
  const assets = [
    {
      id: {
        concrete: {
          interior: {
            x2: [
              { palletInstance: 3 },
              {
                generalKey: {
                  data: ldotGeneralKey,
                },
              },
            ],
          },
        },
      },
      fun: {
        fungible: amount,
      },
    },
  ];
  const dest = {
    interior: {
      x2: [
        { parachain: 2004 },
        {
          accountKey20: {
            key: "0x8a4f41e9f7801f827a69b1bce37c22c4497de3f2",
          },
        },
      ],
    },
  };

  return {
    idx: 6,
    block: {
      block: {
        header: {
          number: {
            toNumber: () => 9776847,
          },
        },
      },
      timestamp: new Date("2026-05-14T00:00:00.000Z"),
    },
    extrinsic: {
      extrinsic: {
        hash: codec("0x9776847"),
      },
      events: extrinsicEvents,
    },
    event: {
      data: [
        codec(senderAddress),
        codec(assets),
        codec(amount),
        codec(dest),
      ],
    },
  } as any;
}

beforeEach(() => {
  records.clear();
  savedLogs.length = 0;

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
    info: (message: string) => savedLogs.push(message),
    warn: (message: string) => savedLogs.push(message),
  };
});

test("indexes outbound LDOT to Moonbeam from withdrawn and deposited token events", async () => {
  const token = codec({ token: "LDOT" });
  const extrinsicEvents = [
    runtimeEvent("tokens", "Withdrawn", [token, codec(senderAddress), codec(amount)]),
    runtimeEvent("tokens", "Deposited", [token, codec(moonbeamSibling), codec(amount)]),
    runtimeEvent("xTokens", "TransferredAssets", []),
  ];

  await handleXCMOut(xcmOutEvent(extrinsicEvents));

  const stored = getEntityRecords("XCMOut").get("9776847-6");

  expect(stored.token).toBe('{"token":"LDOT"}');
  expect(stored.fromAddress).toBe(senderAddress);
  expect(stored.amountFromTokensEvent).toBe(10000000000n);
  expect(stored.amountFromXTokensEvent).toBe(10000000000n);
});

test("does not save supported outbound LDOT when no token event can be matched", async () => {
  await handleXCMOut(xcmOutEvent([
    runtimeEvent("xTokens", "TransferredAssets", []),
  ]));

  expect(getEntityRecords("XCMOut").get("9776847-6")).toBeUndefined();
  expect(savedLogs.some((message) => message.includes("skip xcm out event with missing token or amount"))).toBe(true);
});
