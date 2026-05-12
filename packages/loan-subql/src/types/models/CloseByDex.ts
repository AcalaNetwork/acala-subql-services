// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type CloseByDexProps = Omit<CloseByDex, NonNullable<FunctionPropertyNames<CloseByDex>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatCloseByDexProps = Omit<CloseByDexProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class CloseByDex implements CompatEntity {

    constructor(
        
        id: string,
        ownerId: string,
        collateralId: string,
        soldAmount: bigint,
        refundAmount: bigint,
        debitVolumeUSD: bigint,
        soldVolumeUSD: bigint,
        refundVolumeUSD: bigint,
        price: bigint,
        debitExchangeRate: bigint,
        blockId: string,
        timestamp: Date,
    ) {
        this.id = id;
        this.ownerId = ownerId;
        this.collateralId = collateralId;
        this.soldAmount = soldAmount;
        this.refundAmount = refundAmount;
        this.debitVolumeUSD = debitVolumeUSD;
        this.soldVolumeUSD = soldVolumeUSD;
        this.refundVolumeUSD = refundVolumeUSD;
        this.price = price;
        this.debitExchangeRate = debitExchangeRate;
        this.blockId = blockId;
        this.timestamp = timestamp;
        
    }

    public id: string;
    public ownerId: string;
    public collateralId: string;
    public soldAmount: bigint;
    public refundAmount: bigint;
    public debitVolumeUSD: bigint;
    public soldVolumeUSD: bigint;
    public refundVolumeUSD: bigint;
    public price: bigint;
    public debitExchangeRate: bigint;
    public blockId: string;
    public extrinsicId?: string;
    public timestamp: Date;
    

    get _name(): string {
        return 'CloseByDex';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save CloseByDex entity without an ID");
        await store.set('CloseByDex', id.toString(), this as unknown as CompatCloseByDexProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove CloseByDex entity without an ID");
        await store.remove('CloseByDex', id.toString());
    }

    static async get(id: string): Promise<CloseByDex | undefined> {
        assert((id !== null && id !== undefined), "Cannot get CloseByDex entity without an ID");
        const record = await store.get('CloseByDex', id.toString());
        if (record) {
            return this.create(record as unknown as CloseByDexProps);
        } else {
            return;
        }
    }

    static async getByOwnerId(ownerId: string, options: GetOptions<CompatCloseByDexProps>): Promise<CloseByDex[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatCloseByDexProps>('CloseByDex', 'ownerId', ownerId, options);
        return records.map(record => this.create(record as unknown as CloseByDexProps));
    }
    

    static async getByCollateralId(collateralId: string, options: GetOptions<CompatCloseByDexProps>): Promise<CloseByDex[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatCloseByDexProps>('CloseByDex', 'collateralId', collateralId, options);
        return records.map(record => this.create(record as unknown as CloseByDexProps));
    }
    

    static async getByBlockId(blockId: string, options: GetOptions<CompatCloseByDexProps>): Promise<CloseByDex[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatCloseByDexProps>('CloseByDex', 'blockId', blockId, options);
        return records.map(record => this.create(record as unknown as CloseByDexProps));
    }
    

    static async getByExtrinsicId(extrinsicId: string, options: GetOptions<CompatCloseByDexProps>): Promise<CloseByDex[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatCloseByDexProps>('CloseByDex', 'extrinsicId', extrinsicId, options);
        return records.map(record => this.create(record as unknown as CloseByDexProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<CloseByDexProps>[], options: GetOptions<CloseByDexProps>): Promise<CloseByDex[]> {
        const records = await store.getByFields<CompatCloseByDexProps>('CloseByDex', filter  as unknown as FieldsExpression<CompatCloseByDexProps>[], options as unknown as GetOptions<CompatCloseByDexProps>);
        return records.map(record => this.create(record as unknown as CloseByDexProps));
    }

    static create(record: CloseByDexProps): CloseByDex {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.ownerId,
            record.collateralId,
            record.soldAmount,
            record.refundAmount,
            record.debitVolumeUSD,
            record.soldVolumeUSD,
            record.refundVolumeUSD,
            record.price,
            record.debitExchangeRate,
            record.blockId,
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
