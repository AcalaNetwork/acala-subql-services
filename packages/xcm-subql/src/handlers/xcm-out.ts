import { SubstrateEvent } from "@subql/types";
import { XCMOut } from "../types";

export async function handleXCMOut (event: SubstrateEvent) {
  const index = event.idx.toString();
  const block = event.block.block.header.number.toNumber();
  const tx = event.extrinsic?.extrinsic.hash.toString();
  const timestamp = event.block.timestamp;
  logger.info(`handle xcm out event at ${block}`);

  const [sender, assets, fee, dest] = event.event.data;
  const eventsFromExtrinsic = event.extrinsic?.events || [];
  const tokensTransferEvents = eventsFromExtrinsic.filter((event) => {
    return event.event.section === 'tokens' && event.event.method === 'Transfer';
  });
  // extract tokens and amount from assets
  const jsonAssets = assets.toJSON();

  // extract to address from dest
  const jsonDest = dest.toJSON();

  logger.info(`${JSON.stringify(jsonAssets)} ${JSON.stringify(jsonDest)}`);

  // ldot
  const ldot = "0x0003000000000000000000000000000000000000000000000000000000000000"

  const asset = jsonAssets[0]?.id?.concrete?.interior?.x2?.[1]?.generalKey?.data
    || jsonAssets[0]?.id?.interior?.x2?.[1]?.generalKey?.data;
  const amountFromXTokensEvent = jsonAssets[0]?.fun?.fungible;

  const moonbeam = "2004";
  const parachain = jsonDest?.["interior"]?.x2?.[0]?.parachain;
  const toAddress = jsonDest?.["interior"]?.x2?.[1]?.accountKey20?.key;

  const senderAddress = sender.toString();
  const moonbeamSibling = "23UvQ3ZQXJ5LfTUSYkcRPkQX2FHgcKxGmqdxYJe9j5e3Lwsi"

  // get transfer event which from senderAddress to moonbeamSibling
  const transferEvent = tokensTransferEvents.find((event) => {
    const [token, from, to] = event.event.data;
    return from.toString() === senderAddress && to.toString() === moonbeamSibling;
  });

  const token = transferEvent?.event?.data[0]?.toString();
  const amountFromTokensEvent = transferEvent?.event?.data[3]?.toString();

  logger.info(`find transfer event ${senderAddress}, ${asset}, ${parachain}, ${toAddress}`);
  // return if asset is not ldot, or parachain is not moonbeam
  if (asset != ldot) return;
  if (parachain != moonbeam) return;

  // save to moonbeam & ldot xcm out event
  const xcmOut = new XCMOut(
    `${block}-${index}`,
    BigInt(block),
    tx,
    senderAddress,
    toAddress,
    token,
    BigInt(amountFromTokensEvent || 0),
    BigInt(amountFromXTokensEvent || 0),
    timestamp
  );

  await xcmOut.save();

  logger.info(`save xcm out event ${senderAddress}, ${parachain} ${amountFromXTokensEvent} ${token} at ${block}`);
}