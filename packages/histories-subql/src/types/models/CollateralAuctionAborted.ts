// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type CollateralAuctionAbortedProps = Omit<CollateralAuctionAborted, NonNullable<FunctionPropertyNames<CollateralAuctionAborted>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatCollateralAuctionAbortedProps = Omit<CollateralAuctionAbortedProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class CollateralAuctionAborted implements CompatEntity {

    constructor(
        
        id: string,
        auctionId: string,
        collateral: string,
        amount: bigint,
        targetStableAmount: bigint,
        refundRecipient: string,
        blockNumber: bigint,
        blockHash: string,
    ) {
        this.id = id;
        this.auctionId = auctionId;
        this.collateral = collateral;
        this.amount = amount;
        this.targetStableAmount = targetStableAmount;
        this.refundRecipient = refundRecipient;
        this.blockNumber = blockNumber;
        this.blockHash = blockHash;
        
    }

    public id: string;
    public auctionId: string;
    public collateral: string;
    public amount: bigint;
    public targetStableAmount: bigint;
    public refundRecipient: string;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'CollateralAuctionAborted';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save CollateralAuctionAborted entity without an ID");
        await store.set('CollateralAuctionAborted', id.toString(), this as unknown as CompatCollateralAuctionAbortedProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove CollateralAuctionAborted entity without an ID");
        await store.remove('CollateralAuctionAborted', id.toString());
    }

    static async get(id: string): Promise<CollateralAuctionAborted | undefined> {
        assert((id !== null && id !== undefined), "Cannot get CollateralAuctionAborted entity without an ID");
        const record = await store.get('CollateralAuctionAborted', id.toString());
        if (record) {
            return this.create(record as unknown as CollateralAuctionAbortedProps);
        } else {
            return;
        }
    }

    static async getByAuctionId(auctionId: string, options: GetOptions<CompatCollateralAuctionAbortedProps>): Promise<CollateralAuctionAborted[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatCollateralAuctionAbortedProps>('CollateralAuctionAborted', 'auctionId', auctionId, options);
        return records.map(record => this.create(record as unknown as CollateralAuctionAbortedProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<CollateralAuctionAbortedProps>[], options: GetOptions<CollateralAuctionAbortedProps>): Promise<CollateralAuctionAborted[]> {
        const records = await store.getByFields<CompatCollateralAuctionAbortedProps>('CollateralAuctionAborted', filter  as unknown as FieldsExpression<CompatCollateralAuctionAbortedProps>[], options as unknown as GetOptions<CompatCollateralAuctionAbortedProps>);
        return records.map(record => this.create(record as unknown as CollateralAuctionAbortedProps));
    }

    static create(record: CollateralAuctionAbortedProps): CollateralAuctionAborted {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.auctionId,
            record.collateral,
            record.amount,
            record.targetStableAmount,
            record.refundRecipient,
            record.blockNumber,
            record.blockHash,
        );
        Object.assign(entity,record);
        return entity;
    }
}
