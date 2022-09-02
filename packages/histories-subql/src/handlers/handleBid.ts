import { SubstrateEvent } from '@subql/types';
import { AuctionStatus, BidType } from '../types';
import { getBid, getCollateralAuction } from '../records'
import type { Balance } from '@polkadot/types/interfaces/runtime';

export async function handleBid (event: SubstrateEvent) {
    /**
        /// A bid is placed
		Bid {
			auction_id: T::AuctionId,
			bidder: T::AccountId,
			amount: T::Balance,
		}
     */
    const eventData = event.event.data;
    const auctionId = eventData[0].toString();
    const bidder = eventData[1].toString();
    const amount = (eventData[2] as Balance).toBigInt();
    const blockNumber = event.block.block.header.number.toBigInt();
    const blockHash = event.block.block.hash.toString();
    const extrinsic = event.extrinsic ? event.extrinsic.extrinsic.hash.toString() : '';
    const timestamp = event.block.timestamp;
    const eventId = `${blockHash}-${event.idx.toString()}`;

    const auction = await getCollateralAuction(auctionId);
    const bid = await getBid(eventId);

    auction.status = AuctionStatus.IN_PROGRESS;
    auction.winner = bidder;

    const inReverseStage = auction.target !== BigInt(0) && amount > auction.target;

    logger.info(amount.toString())
    logger.info(auction.target.toString())

    bid.auctionId = auction.id;
    bid.type = BidType.DENT;
    bid.bidder = bidder;
    bid.amount = amount;
    bid.timestamp = timestamp;
    bid.blockNumber = blockNumber;
    bid.blockHash = blockHash;
    bid.eventIndex = Number(event.idx.toString());

    if (inReverseStage) {
        const lastBid = (auction.lastBid && auction.lastBid > auction.target) ? auction.lastBid : auction.target;
        const collateralAmount = auction.amount * (lastBid * BigInt(10 ** 18) / amount ) / BigInt( 10**18 );

        // reflash collateral amount in reverse stage
        auction.amount = collateralAmount;
    }

    // update bidders
    auction.bidder = [...new Set([bidder, ...(auction.bidder || [])])]
    auction.lastBid = amount;
    bid.collateralAmount = auction.amount;

    if (extrinsic) {
        bid.extrinsic = extrinsic;
    }

    await auction.save();
    await bid.save();
}
