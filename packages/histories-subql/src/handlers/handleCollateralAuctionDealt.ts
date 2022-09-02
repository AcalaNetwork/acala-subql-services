import { forceToCurrencyName, MaybeCurrency } from '@acala-network/sdk-core';
import { SubstrateEvent } from '@subql/types';
import { AuctionStatus } from '../types';
import { getCollateralAuction, getCollateralAuctionDealt } from '../records'
import type { Balance } from '@polkadot/types/interfaces/runtime';

export async function handleCollateralAuctionDealt(event: SubstrateEvent) {
    /**
        /// Collateral auction dealt.
        CollateralAuctionDealt {
            auction_id: AuctionId,
            collateral_type: CurrencyId,
            collateral_amount: Balance,
            winner: T::AccountId,
            payment_amount: Balance,
        },
     */
    const eventData = event.event.data;
    const auctionId = eventData[0].toString();
    const collateral = forceToCurrencyName(eventData[1] as unknown as MaybeCurrency);
    const amount = (eventData[2] as Balance).toBigInt();
    const winner = eventData[3].toString();
    const paymentAmount = (eventData[4] as Balance).toBigInt();
    const blockNumber = event.block.block.header.number.toBigInt();
    const blockHash = event.block.block.hash.toString();
    const extrinsic = event.extrinsic ? event.extrinsic.extrinsic.hash.toString() : '';
    const timestamp = event.block.timestamp;
    const eventId = `${blockHash}-${event.idx.toString()}`;

    const auction = await getCollateralAuction(auctionId);
    const collateralAuctionDealt = await getCollateralAuctionDealt(eventId);

    auction.amount = amount;
    auction.winner = winner;
    auction.status = AuctionStatus.DEALT;
    auction.updateAt = timestamp;
    auction.updateAtBlock = blockNumber;
    auction.endAt = timestamp;
    auction.endAtBlock = blockNumber;

    collateralAuctionDealt.auctionId = auction.id;
    collateralAuctionDealt.collateral = collateral;
    collateralAuctionDealt.amount = amount;
    collateralAuctionDealt.winner = winner;
    collateralAuctionDealt.paymentAmount = paymentAmount;
    collateralAuctionDealt.timestamp = timestamp;
    collateralAuctionDealt.blockNumber = blockNumber;
    collateralAuctionDealt.blockHash = blockHash;

    if (extrinsic) {
        collateralAuctionDealt.extrinsic = extrinsic;
    }

    await auction.save();
    await collateralAuctionDealt.save();
}
