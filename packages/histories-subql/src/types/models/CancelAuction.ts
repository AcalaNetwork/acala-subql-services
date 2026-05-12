// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type CancelAuctionProps = Omit<CancelAuction, NonNullable<FunctionPropertyNames<CancelAuction>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatCancelAuctionProps = Omit<CancelAuctionProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class CancelAuction implements CompatEntity {

    constructor(
        
        id: string,
        auctionId: string,
        blockNumber: bigint,
        blockHash: string,
    ) {
        this.id = id;
        this.auctionId = auctionId;
        this.blockNumber = blockNumber;
        this.blockHash = blockHash;
        
    }

    public id: string;
    public auctionId: string;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'CancelAuction';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save CancelAuction entity without an ID");
        await store.set('CancelAuction', id.toString(), this as unknown as CompatCancelAuctionProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove CancelAuction entity without an ID");
        await store.remove('CancelAuction', id.toString());
    }

    static async get(id: string): Promise<CancelAuction | undefined> {
        assert((id !== null && id !== undefined), "Cannot get CancelAuction entity without an ID");
        const record = await store.get('CancelAuction', id.toString());
        if (record) {
            return this.create(record as unknown as CancelAuctionProps);
        } else {
            return;
        }
    }

    static async getByAuctionId(auctionId: string, options: GetOptions<CompatCancelAuctionProps>): Promise<CancelAuction[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatCancelAuctionProps>('CancelAuction', 'auctionId', auctionId, options);
        return records.map(record => this.create(record as unknown as CancelAuctionProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<CancelAuctionProps>[], options: GetOptions<CancelAuctionProps>): Promise<CancelAuction[]> {
        const records = await store.getByFields<CompatCancelAuctionProps>('CancelAuction', filter  as unknown as FieldsExpression<CompatCancelAuctionProps>[], options as unknown as GetOptions<CompatCancelAuctionProps>);
        return records.map(record => this.create(record as unknown as CancelAuctionProps));
    }

    static create(record: CancelAuctionProps): CancelAuction {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.auctionId,
            record.blockNumber,
            record.blockHash,
        );
        Object.assign(entity,record);
        return entity;
    }
}
