// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';


import {
    BidType,
} from '../enums';

export type BidProps = Omit<Bid, NonNullable<FunctionPropertyNames<Bid>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatBidProps = Omit<BidProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Bid implements CompatEntity {

    constructor(
        
        id: string,
        type: BidType,
        auctionId: string,
        bidder: string,
        amount: bigint,
        collateralAmount: bigint,
        blockNumber: bigint,
        blockHash: string,
    ) {
        this.id = id;
        this.type = type;
        this.auctionId = auctionId;
        this.bidder = bidder;
        this.amount = amount;
        this.collateralAmount = collateralAmount;
        this.blockNumber = blockNumber;
        this.blockHash = blockHash;
        
    }

    public id: string;
    public type: BidType;
    public auctionId: string;
    public bidder: string;
    public amount: bigint;
    public collateralAmount: bigint;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'Bid';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Bid entity without an ID");
        await store.set('Bid', id.toString(), this as unknown as CompatBidProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Bid entity without an ID");
        await store.remove('Bid', id.toString());
    }

    static async get(id: string): Promise<Bid | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Bid entity without an ID");
        const record = await store.get('Bid', id.toString());
        if (record) {
            return this.create(record as unknown as BidProps);
        } else {
            return;
        }
    }

    static async getByAuctionId(auctionId: string, options: GetOptions<CompatBidProps>): Promise<Bid[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatBidProps>('Bid', 'auctionId', auctionId, options);
        return records.map(record => this.create(record as unknown as BidProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<BidProps>[], options: GetOptions<BidProps>): Promise<Bid[]> {
        const records = await store.getByFields<CompatBidProps>('Bid', filter  as unknown as FieldsExpression<CompatBidProps>[], options as unknown as GetOptions<CompatBidProps>);
        return records.map(record => this.create(record as unknown as BidProps));
    }

    static create(record: BidProps): Bid {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.type,
            record.auctionId,
            record.bidder,
            record.amount,
            record.collateralAmount,
            record.blockNumber,
            record.blockHash,
        );
        Object.assign(entity,record);
        return entity;
    }
}
