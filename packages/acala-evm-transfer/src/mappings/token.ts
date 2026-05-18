import { Token } from "../types";
import { Erc20__factory } from "../types/contracts";

export type TokenLookupContext = {
  handler?: string;
  blockHeight?: bigint | number | string;
  transactionHash?: string;
  logIndex?: bigint | number | string;
};

type MetadataMethod = "name" | "symbol" | "decimals";

const FALLBACK_SYMBOL = "UNKNOWN";
const FALLBACK_DECIMALS = BigInt(0);

export async function getToken (address: string, context: TokenLookupContext = {}) {
  let token = await Token.get(address);

  if (token) {
    return token;
  }

  const erc20 = Erc20__factory.connect(address, api);
  const name = await readMetadata(address, "name", () => erc20.name(), context);
  const symbol = await readMetadata(address, "symbol", () => erc20.symbol(), context);
  const decimals = await readMetadata(address, "decimals", () => erc20.decimals(), context);

  token = new Token(
    address,
    name ?? fallbackName(address),
    symbol ?? FALLBACK_SYMBOL,
    decimals === undefined ? FALLBACK_DECIMALS : BigInt(decimals.toString())
  );

  await token.save();

  return token;
}

async function readMetadata<T> (
  address: string,
  method: MetadataMethod,
  read: () => Promise<T>,
  context: TokenLookupContext
): Promise<T | undefined> {
  try {
    return await read();
  } catch (error) {
    if (!isContractMetadataFailure(error)) {
      throw error;
    }

    logger.warn(`Failed to read ERC20 metadata: address=${address} method=${method}${formatContext(context)} error=${formatError(error)}`);
    return undefined;
  }
}

function fallbackName (address: string): string {
  return `Unknown Token ${address}`;
}

function formatContext (context: TokenLookupContext): string {
  const parts: string[] = [];

  if (context.handler) parts.push(`handler=${context.handler}`);
  if (context.blockHeight !== undefined) parts.push(`block=${context.blockHeight.toString()}`);
  if (context.transactionHash) parts.push(`tx=${context.transactionHash}`);
  if (context.logIndex !== undefined) parts.push(`logIndex=${context.logIndex.toString()}`);

  return parts.length ? ` ${parts.join(" ")}` : "";
}

function formatError (error: unknown): string {
  const code = errorCode(error);

  if (error instanceof Error) {
    return `${error.name}: ${error.message}${code ? ` code=${code}` : ""}`;
  }

  if (typeof error === "string") {
    return error;
  }

  return code ? `code=${code}` : "unknown";
}

function errorCode (error: unknown): string | undefined {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return undefined;
  }

  const code = error.code;
  return typeof code === "string" ? code : undefined;
}

function isContractMetadataFailure (error: unknown): boolean {
  const code = errorCode(error);

  if (code === "CALL_EXCEPTION" || code === "BAD_DATA") {
    return true;
  }

  if (!(error instanceof Error)) {
    return false;
  }

  if (code !== undefined && code !== "INVALID_ARGUMENT") {
    return false;
  }

  return error.message.includes("data out-of-bounds")
    || error.message.includes("could not decode result data");
}
