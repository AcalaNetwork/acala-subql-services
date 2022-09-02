import { forceToCurrencyName, MaybeCurrency } from '@acala-network/sdk-core';
import { SubstrateEvent } from '@subql/types';
import { AuctionStatus, BidType } from '../types';
import { getBid, getCollateralAuction, getDEXTakeCollateralAuction } from '../utils/records'
import type { Balance } from '@polkadot/types/interfaces/runtime';

export async function handleDEXTakeCollateralAuction (event: SubstrateEvent) {
    /**
  		/// Dex take collateral auction.
		DEXTakeCollateralAuction {
			auction_id: AuctionId,
			collateral_type: CurrencyId,
			collateral_amount: Balance,
			supply_collateral_amount: Balance,
			target_stable_amount: Balance,
		},
     */
    const oldVersion = event.event.data.length === 4;
    const eventData = event.event.data;
    const auctionId = eventData[0].toString();
    const collateral = forceToCurrencyName(eventData[1] as unknown as MaybeCurrency);
    const amount = (eventData[2] as Balance).toBigInt();
    const supplyCollateralAmount = oldVersion ? BigInt(0) : (eventData[3] as Balance).toBigInt();
    const targetStableAmount = oldVersion ? (eventData[3] as Balance).toBigInt() : (eventData[4] as Balance).toBigInt();
    const blockNumber = event.block.block.header.number.toBigInt();
    const blockHash = event.block.block.hash.toString();
    const extrinsic = event.extrinsic ? event.extrinsic.extrinsic.hash.toString() : '';
    const timestamp = event.block.timestamp;
    const eventId = `${blockHash}-${event.idx.toString()}`;

    const auction = await getCollateralAuction(auctionId);
    const dexTakeCollateralAuction = await getDEXTakeCollateralAuction(eventId);
    const bid = await getBid(eventId);

    auction.status = AuctionStatus.DEX_TAKE;
    auction.winner = 'DEX';
    auction.lastBid = targetStableAmount;
    auction.amount = supplyCollateralAmount;
    auction.updateAt = timestamp;
    auction.updateAtBlock = blockNumber;
    auction.endAt = timestamp;
    auction.endAtBlock = blockNumber;

    dexTakeCollateralAuction.auctionId = auction.id;
    dexTakeCollateralAuction.collateral = collateral;
    dexTakeCollateralAuction.amount = amount;
    dexTakeCollateralAuction.supplyCollateralAmount = supplyCollateralAmount;
    dexTakeCollateralAuction.targetStableAmount = targetStableAmount;
    dexTakeCollateralAuction.timestamp = timestamp;
    dexTakeCollateralAuction.blockNumber = blockNumber;
    dexTakeCollateralAuction.blockHash = blockHash;

    // insert a virtual bid action when dex take collateral
    bid.auctionId = auction.id;
    bid.type = BidType.DEX_TAKE;
    bid.bidder = '';
    bid.amount = targetStableAmount;
    bid.collateralAmount = supplyCollateralAmount;
    bid.timestamp = timestamp;
    bid.blockNumber = blockNumber;
    bid.blockHash = blockHash;
    bid.eventIndex = Number(event.idx.toString());

    if (extrinsic) {
        dexTakeCollateralAuction.extrinsic = extrinsic;
        bid.extrinsic = extrinsic;
    }


    await auction.save();
    await dexTakeCollateralAuction.save();
    await bid.save();
}
