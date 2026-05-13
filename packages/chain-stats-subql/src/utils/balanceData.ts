import { createReadStream, existsSync } from "fs";
import { join } from "path";

export type InitialBalanceRecord = {
  account: string;
  token: string;
  free: string;
  reserved: string;
  frozen: string;
};

type Network = "acala" | "karura";

const DATA_FILES: Record<Network, string[]> = {
  acala: ["acala-1870000-native.json", "acala-1870000-non-native.json"],
  karura: ["karura-2650000-native.json", "karura-2650000-non-native.json"],
};

const getWorkingDirectory = () => {
  const cwd = (globalThis as { process?: { cwd?: unknown } }).process?.cwd;

  return typeof cwd === "function" ? cwd() : "/app";
};

const getDataDirCandidates = () => {
  const cwd = getWorkingDirectory();

  return [
    join(cwd, "dist", "data"),
    join(cwd, "src", "data"),
    join(cwd, "data"),
    join(cwd, "packages", "chain-stats-subql", "dist", "data"),
    join(cwd, "packages", "chain-stats-subql", "src", "data"),
    "/app/dist/data",
    "/app/src/data",
  ];
};

type ReaderState = {
  nextIndex: number;
  iterator: AsyncIterator<InitialBalanceRecord>;
};

const readers = new Map<Network, ReaderState>();

const getDataFilePath = (fileName: string) => {
  for (const directory of getDataDirCandidates()) {
    const filePath = join(directory, fileName);

    if (existsSync(filePath)) {
      return filePath;
    }
  }

  throw new Error(`Unable to locate chain-stats balance data file ${fileName}`);
};

async function* readJsonArrayObjects(filePath: string): AsyncGenerator<InitialBalanceRecord> {
  let buffer = "";
  let depth = 0;
  let inString = false;
  let escaped = false;
  let capturing = false;

  for await (const chunk of createReadStream(filePath, { encoding: "utf8" })) {
    for (const char of chunk) {
      if (!capturing) {
        if (char === "{") {
          capturing = true;
          depth = 1;
          buffer = char;
        }

        continue;
      }

      buffer += char;

      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === "\"") {
        inString = !inString;
        continue;
      }

      if (inString) {
        continue;
      }

      if (char === "{") {
        depth += 1;
      } else if (char === "}") {
        depth -= 1;

        if (depth === 0) {
          yield JSON.parse(buffer) as InitialBalanceRecord;
          buffer = "";
          capturing = false;
        }
      }
    }
  }
}

async function* readNetworkRecords(network: Network): AsyncGenerator<InitialBalanceRecord> {
  for (const fileName of DATA_FILES[network]) {
    yield* readJsonArrayObjects(getDataFilePath(fileName));
  }
}

const getReader = (network: Network, startIndex: number) => {
  const current = readers.get(network);

  if (current && startIndex >= current.nextIndex) {
    return current;
  }

  const next = {
    nextIndex: 0,
    iterator: readNetworkRecords(network)[Symbol.asyncIterator](),
  };

  readers.set(network, next);
  return next;
};

export const getInitialBalanceRecords = async (
  network: Network,
  startIndex: number,
  limit: number,
) => {
  const reader = getReader(network, startIndex);

  while (reader.nextIndex < startIndex) {
    const skipped = await reader.iterator.next();

    if (skipped.done) {
      return [];
    }

    reader.nextIndex += 1;
  }

  const records: InitialBalanceRecord[] = [];

  while (records.length < limit) {
    const next = await reader.iterator.next();

    if (next.done) {
      break;
    }

    records.push(next.value);
    reader.nextIndex += 1;
  }

  return records;
};

export const resetInitialBalanceReadersForTests = () => {
  readers.clear();
};
