import { forceToCurrencyName, MaybeCurrency } from '@acala-network/sdk-core';
import { SubstrateEvent } from '@subql/types';
import { AuctionStatus } from '../types';
import { getCollateralAuction, getCollateralAuctionAborted } from '../utils/records'
import type { Balance } from '@polkadot/types/interfaces/runtime';

export async function handleCollateralAuctionAborted (event: SubstrateEvent) {
    /**
        /// Collateral auction aborted.
		CollateralAuctionAborted {
			auction_id: AuctionId,
			collateral_type: CurrencyId,
			collateral_amount: Balance,
			target_stable_amount: Balance,
			refund_recipient: T::AccountId,
		},
     */
    const eventData = event.event.data;
    const auctionId = eventData[0].toString();
    const collateral = forceToCurrencyName(eventData[1] as any as MaybeCurrency);
    const amount = (eventData[2] as Balance).toBigInt();
    const targetStableAmount = (eventData[3] as Balance).toBigInt();
    const refundRecipient = eventData[4].toString();
    const blockNumber = event.block.block.header.number.toBigInt();
    const blockHash = event.block.block.hash.toString();
    const extrinsic = event.extrinsic ? event.extrinsic.extrinsic.hash.toString() : '';
    const timestamp = event.block.timestamp;
    const eventId = `${blockHash}-${event.idx.toString()}`;

    const auction = await getCollateralAuction(auctionId);
    const collateralAuctionAborted = await getCollateralAuctionAborted(eventId);

    auction.status = AuctionStatus.ABORT;
    auction.updateAt = timestamp;
    auction.updateAtBlock = blockNumber;
    auction.endAt = timestamp;
    auction.endAtBlock = blockNumber;

    collateralAuctionAborted.auctionId = auction.id;
    collateralAuctionAborted.collateral = collateral;
    collateralAuctionAborted.amount = amount;
    collateralAuctionAborted.targetStableAmount = targetStableAmount;
    collateralAuctionAborted.refundRecipient = refundRecipient;
    collateralAuctionAborted.timestamp = timestamp;
    collateralAuctionAborted.blockNumber = blockNumber;
    collateralAuctionAborted.blockHash = blockHash;

    if (extrinsic) {
        collateralAuctionAborted.extrinsic = extrinsic;
    }

    await auction.save();
    await collateralAuctionAborted.save();
}
