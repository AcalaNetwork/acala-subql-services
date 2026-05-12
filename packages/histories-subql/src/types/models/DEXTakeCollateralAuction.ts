// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type DEXTakeCollateralAuctionProps = Omit<DEXTakeCollateralAuction, NonNullable<FunctionPropertyNames<DEXTakeCollateralAuction>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatDEXTakeCollateralAuctionProps = Omit<DEXTakeCollateralAuctionProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class DEXTakeCollateralAuction implements CompatEntity {

    constructor(
        
        id: string,
        auctionId: string,
        collateral: string,
        amount: bigint,
        supplyCollateralAmount: bigint,
        targetStableAmount: bigint,
        blockNumber: bigint,
        blockHash: string,
    ) {
        this.id = id;
        this.auctionId = auctionId;
        this.collateral = collateral;
        this.amount = amount;
        this.supplyCollateralAmount = supplyCollateralAmount;
        this.targetStableAmount = targetStableAmount;
        this.blockNumber = blockNumber;
        this.blockHash = blockHash;
        
    }

    public id: string;
    public auctionId: string;
    public collateral: string;
    public amount: bigint;
    public supplyCollateralAmount: bigint;
    public targetStableAmount: bigint;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'DEXTakeCollateralAuction';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save DEXTakeCollateralAuction entity without an ID");
        await store.set('DEXTakeCollateralAuction', id.toString(), this as unknown as CompatDEXTakeCollateralAuctionProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove DEXTakeCollateralAuction entity without an ID");
        await store.remove('DEXTakeCollateralAuction', id.toString());
    }

    static async get(id: string): Promise<DEXTakeCollateralAuction | undefined> {
        assert((id !== null && id !== undefined), "Cannot get DEXTakeCollateralAuction entity without an ID");
        const record = await store.get('DEXTakeCollateralAuction', id.toString());
        if (record) {
            return this.create(record as unknown as DEXTakeCollateralAuctionProps);
        } else {
            return;
        }
    }

    static async getByAuctionId(auctionId: string, options: GetOptions<CompatDEXTakeCollateralAuctionProps>): Promise<DEXTakeCollateralAuction[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatDEXTakeCollateralAuctionProps>('DEXTakeCollateralAuction', 'auctionId', auctionId, options);
        return records.map(record => this.create(record as unknown as DEXTakeCollateralAuctionProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<DEXTakeCollateralAuctionProps>[], options: GetOptions<DEXTakeCollateralAuctionProps>): Promise<DEXTakeCollateralAuction[]> {
        const records = await store.getByFields<CompatDEXTakeCollateralAuctionProps>('DEXTakeCollateralAuction', filter  as unknown as FieldsExpression<CompatDEXTakeCollateralAuctionProps>[], options as unknown as GetOptions<CompatDEXTakeCollateralAuctionProps>);
        return records.map(record => this.create(record as unknown as DEXTakeCollateralAuctionProps));
    }

    static create(record: DEXTakeCollateralAuctionProps): DEXTakeCollateralAuction {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.auctionId,
            record.collateral,
            record.amount,
            record.supplyCollateralAmount,
            record.targetStableAmount,
            record.blockNumber,
            record.blockHash,
        );
        Object.assign(entity,record);
        return entity;
    }
}
