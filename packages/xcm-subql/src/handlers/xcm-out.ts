import { SubstrateEvent } from "@subql/types";
import { XCMOut } from "../types";

const LDOT_GENERAL_KEY = "0x0003000000000000000000000000000000000000000000000000000000000000";
const MOONBEAM_PARACHAIN_ID = "2004";
const MOONBEAM_SIBLING = "23UvQ3ZQXJ5LfTUSYkcRPkQX2FHgcKxGmqdxYJe9j5e3Lwsi";

type TokenAmountEvent = {
  token: string;
  who: string;
  amount: bigint;
};

function toBigInt (value: unknown): bigint | undefined {
  if (value === undefined || value === null) return undefined;

  try {
    return BigInt(value.toString());
  } catch {
    return undefined;
  }
}

function toStringValue (value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;

  return value.toString();
}

function tokenAmountEvents (events: any[], method: string): TokenAmountEvent[] {
  return events
    .filter((event) => event.event.section === "tokens" && event.event.method === method)
    .map((event) => {
      const [token, who, amount] = event.event.data;

      return {
        token: toStringValue(token),
        who: toStringValue(who),
        amount: toBigInt(amount),
      };
    })
    .filter((event): event is TokenAmountEvent => {
      return event.token !== undefined && event.who !== undefined && event.amount !== undefined;
    });
}

function tokenEventLogValues (events: TokenAmountEvent[]) {
  return events.map((event) => ({
    token: event.token,
    who: event.who,
    amount: event.amount.toString(),
  }));
}

export async function handleXCMOut (event: SubstrateEvent) {
  const index = event.idx.toString();
  const block = event.block.block.header.number.toNumber();
  const tx = event.extrinsic?.extrinsic.hash.toString();
  const timestamp = event.block.timestamp;
  logger.info(`handle xcm out event at ${block}`);

  const [sender, assets, fee, dest] = event.event.data;
  const eventsFromExtrinsic = event.extrinsic?.events || [];
  // extract tokens and amount from assets
  const jsonAssets = assets.toJSON();

  // extract to address from dest
  const jsonDest = dest.toJSON();

  logger.info(`${JSON.stringify(jsonAssets)} ${JSON.stringify(jsonDest)}`);

  const asset = toStringValue(jsonAssets[0]?.id?.concrete?.interior?.x2?.[1]?.generalKey?.data
    || jsonAssets[0]?.id?.interior?.x2?.[1]?.generalKey?.data);
  const amountFromXTokensEvent = toBigInt(jsonAssets[0]?.fun?.fungible);

  const parachain = toStringValue(jsonDest?.["interior"]?.x2?.[0]?.parachain);
  const toAddress = jsonDest?.["interior"]?.x2?.[1]?.accountKey20?.key;

  const senderAddress = sender.toString();

  logger.info(`find xcm out event ${senderAddress}, ${asset}, ${parachain}, ${toAddress}`);
  // return if asset is not ldot, or parachain is not moonbeam
  if (asset != LDOT_GENERAL_KEY) return;
  if (parachain != MOONBEAM_PARACHAIN_ID) return;

  const withdrawnEvents = tokenAmountEvents(eventsFromExtrinsic, "Withdrawn");
  const depositedEvents = tokenAmountEvents(eventsFromExtrinsic, "Deposited");

  const withdrawnEvent = withdrawnEvents.find((event) => {
    return event.who === senderAddress && (
      amountFromXTokensEvent === undefined || event.amount === amountFromXTokensEvent
    );
  });
  const depositedEvent = depositedEvents.find((event) => {
    return event.who === MOONBEAM_SIBLING
      && event.amount === (withdrawnEvent?.amount ?? amountFromXTokensEvent)
      && (!withdrawnEvent || event.token === withdrawnEvent.token);
  });

  const tokensEvent = withdrawnEvent || depositedEvent;

  if (!tokensEvent || amountFromXTokensEvent === undefined) {
    logger.warn(`skip xcm out event with missing token or amount: block=${block}, index=${index}, tx=${tx}, sender=${senderAddress}, asset=${asset}, parachain=${parachain}, xTokensAmount=${amountFromXTokensEvent?.toString()}, withdrawn=${JSON.stringify(tokenEventLogValues(withdrawnEvents))}, deposited=${JSON.stringify(tokenEventLogValues(depositedEvents))}`);
    return;
  }

  // save to moonbeam & ldot xcm out event
  const xcmOut = new XCMOut(
    `${block}-${index}`,
    BigInt(block),
    tx,
    senderAddress,
    toAddress,
    tokensEvent.token,
    tokensEvent.amount,
    amountFromXTokensEvent,
    timestamp
  );

  await xcmOut.save();

  logger.info(`save xcm out event ${senderAddress}, ${parachain} ${amountFromXTokensEvent} ${tokensEvent.token} at ${block}`);
}
