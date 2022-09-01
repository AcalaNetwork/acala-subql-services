import { AuctionStatus, Bid, BidType, CancelAuction, CollateralAuction, CollateralAuctionDealt, NewCollateralAuction } from '../types'
import { CollateralAuctionAborted } from '../types/models/CollateralAuctionAborted';
import { DEXTakeCollateralAuction } from '../types/models/DEXTakeCollateralAuction';


export async function getCollateralAuction (id: string) {
    let record = await CollateralAuction.get(id);

    if (!record) {
        record = new CollateralAuction(id);
        record.collateral = '';
        record.amount = BigInt(0);
        record.initAmount = BigInt(0);
        record.target = BigInt(0);
        record.status = AuctionStatus.IN_PROGRESS;
        record.createAt = new Date(0);
        record.updateAt = new Date(0);
        record.createAtBlock = BigInt(0);
        record.updateAtBlock = BigInt(0);
        record.refundRecipient = '';
        record.bidder = [];
    }

    return record
}

export async function getNewCollateralAuction (id: string) {
    let record = await NewCollateralAuction.get(id);

    if (!record) {
        record = new NewCollateralAuction(id);
        record.auctionId = '';
        record.collateral = '';
        record.amount = BigInt(0);
        record.target = BigInt(0);
        record.timestamp = new Date(0);
        record.blockNumber = BigInt(0);
        record.blockHash = '';
    }

    return record
}

export async function getCancelAuction (id: string) {
    let record = await CancelAuction.get(id);

    if (!record) {
        record = new CancelAuction(id)
        record.auctionId = '';
        record.timestamp = new Date(0);
        record.blockNumber = BigInt(0);
        record.blockHash = '';
    }

    return record
}

export async function getCollateralAuctionDealt (id: string) {
    let record = await CollateralAuctionDealt.get(id);

    if (!record) {
        record = new CollateralAuctionDealt(id)
        record.auctionId = '';
        record.collateral = '';
        record.amount = BigInt(0);
        record.winner = '';
        record.paymentAmount = BigInt(0);
        record.timestamp = new Date(0);
        record.blockNumber = BigInt(0);
        record.blockHash = '';
    }

    return record
}

export async function getDEXTakeCollateralAuction (id: string) {
    let record = await DEXTakeCollateralAuction.get(id);

    if (!record) {
        record = new DEXTakeCollateralAuction(id)
        record.auctionId = '';
        record.collateral = '';
        record.amount = BigInt(0);
        record.supplyCollateralAmount = BigInt(0);
        record.targetStableAmount = BigInt(0);
        record.timestamp = new Date(0);
        record.blockNumber = BigInt(0);
        record.blockHash = '';
    }

    return record
}

export async function getCollateralAuctionAborted (id: string) {
    let record = await CollateralAuctionAborted.get(id);

    if (!record) {
        record = new CollateralAuctionAborted(id)
        record.auctionId = '';
        record.collateral = '';
        record.amount = BigInt(0);
        record.targetStableAmount = BigInt(0);
        record.refundRecipient = '';
        record.timestamp = new Date(0);
        record.blockNumber = BigInt(0);
        record.blockHash = '';
    }

    return record
}

export async function getBid (id: string) {
    let record = await Bid.get(id);

    if (!record) {
        record = new Bid(id)
        record.auctionId = '';
        record.type = BidType.DENT;
        record.bidder = '';
        record.amount = BigInt(0);
        record.timestamp = new Date(0);
        record.blockNumber = BigInt(0);
        record.blockHash = '';
    }

    return record
}