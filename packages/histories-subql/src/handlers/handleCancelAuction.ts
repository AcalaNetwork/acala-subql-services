import { SubstrateEvent } from '@subql/types';
import { AuctionStatus } from '../types';
import { getCancelAuction, getCollateralAuction } from '../records'

export async function handleCancelAuction (event: SubstrateEvent) {
    /**
     * /// Active auction cancelled.
		CancelAuction { auction_id: AuctionId },
     */
    const eventData = event.event.data;
    const auctionId = eventData[0].toString();
    const blockNumber = event.block.block.header.number.toBigInt();
    const blockHash = event.block.block.hash.toString();
    const extrinsic = event.extrinsic ? event.extrinsic.extrinsic.hash.toString() : '';
    const timestamp = event.block.timestamp;
    const eventId = `${blockHash}-${event.idx.toString()}`;

    const auction = await getCollateralAuction(auctionId);
    const cancelAuction = await getCancelAuction(eventId);

    auction.status = AuctionStatus.CANCELL;
    auction.updateAt = timestamp;
    auction.updateAtBlock = blockNumber;
    auction.endAt = timestamp;
    auction.endAtBlock = blockNumber;

    cancelAuction.auctionId = auction.id;
    cancelAuction.timestamp = timestamp;
    cancelAuction.blockNumber = blockNumber;
    cancelAuction.blockHash = blockHash;

    if (extrinsic) {
        cancelAuction.extrinsic = extrinsic;
    }

    await auction.save();
    await cancelAuction.save();
}
