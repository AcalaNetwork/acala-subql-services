import { forceToCurrencyName, MaybeCurrency } from '@acala-network/sdk-core';
import { SubstrateEvent } from '@subql/types';
import { AuctionStatus, BidType } from '../types';
import { getBid, getCollateralAuction, getNewCollateralAuction } from '../records'
import type { Balance } from '@polkadot/types/interfaces/runtime';
import { getExtrinsicHashFromEvent } from '../utils/extrinsic';
import { getBlockHash, getBlockNumber, getBlockTimestamp } from '../utils/block';

export async function handleNewCollateralAuction (event: SubstrateEvent) {
    /**
     * 	NewCollateralAuction {
			auction_id: AuctionId,
			collateral_type: CurrencyId,
			collateral_amount: Balance,
			target_bid_price: Balance,
		}
     */
    const eventData = event.event.data;
    const auctionId = eventData[0].toString();
    const collateral = forceToCurrencyName(eventData[1] as any as MaybeCurrency);
    const amount = (eventData[2] as Balance).toBigInt();
    const target = (eventData[3] as Balance).toBigInt();
    const blockNumber = getBlockNumber(event.block);
    const blockHash = getBlockHash(event.block);
    const extrinsic = getExtrinsicHashFromEvent(event);
    const timestamp = getBlockTimestamp(event.block);
    const eventId = `${blockHash}-${event.idx.toString()}`;

    const auction = await getCollateralAuction(auctionId);
    const newCollateralAuction = await getNewCollateralAuction(eventId);
    const bid = await getBid(eventId);

    // query auction data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const auctionData = (await api.query.auctionManager.collateralAuctions(auctionId) as any).unwrapOrDefault();

    auction.collateral = collateral;
    auction.amount = amount;
    auction.initAmount = amount;
    auction.target = target;
    auction.status = AuctionStatus.IN_PROGRESS;
    auction.createAt = timestamp;
    auction.updateAt = timestamp;
    auction.createAtBlock = blockNumber;
    auction.updateAtBlock = blockNumber;
    auction.refundRecipient = auctionData.refundRecipient.toString();

    newCollateralAuction.auctionId = auction.id;
    newCollateralAuction.collateral = collateral;
    newCollateralAuction.amount = amount;
    newCollateralAuction.target = target;
    newCollateralAuction.timestamp = timestamp;
    newCollateralAuction.blockNumber = blockNumber;
    newCollateralAuction.blockHash = blockHash;

    if (extrinsic) {
        newCollateralAuction.extrinsic = extrinsic;
    }

    bid.auctionId = auction.id;
    bid.type = BidType.KICK;
    bid.bidder = '';
    bid.amount = target;
    bid.timestamp = timestamp;
    bid.collateralAmount = amount;
    bid.blockNumber = blockNumber;
    bid.blockHash = blockHash;
    bid.eventIndex = Number(event.idx.toString());

    await auction.save();
    await newCollateralAuction.save();
    await bid.save();
}
