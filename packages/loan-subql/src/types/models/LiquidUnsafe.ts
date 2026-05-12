// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type LiquidUnsafeProps = Omit<LiquidUnsafe, NonNullable<FunctionPropertyNames<LiquidUnsafe>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatLiquidUnsafeProps = Omit<LiquidUnsafeProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class LiquidUnsafe implements CompatEntity {

    constructor(
        
        id: string,
        senderId: string,
        ownerId: string,
        collateralId: string,
        collateralAmount: bigint,
        collateralVolumeUSD: bigint,
        badDebitVolumeUSD: bigint,
        liquidationStrategy: string,
        price: bigint,
        debitExchangeRate: bigint,
        blockId: string,
        timestamp: Date,
    ) {
        this.id = id;
        this.senderId = senderId;
        this.ownerId = ownerId;
        this.collateralId = collateralId;
        this.collateralAmount = collateralAmount;
        this.collateralVolumeUSD = collateralVolumeUSD;
        this.badDebitVolumeUSD = badDebitVolumeUSD;
        this.liquidationStrategy = liquidationStrategy;
        this.price = price;
        this.debitExchangeRate = debitExchangeRate;
        this.blockId = blockId;
        this.timestamp = timestamp;
        
    }

    public id: string;
    public senderId: string;
    public ownerId: string;
    public collateralId: string;
    public collateralAmount: bigint;
    public collateralVolumeUSD: bigint;
    public badDebitVolumeUSD: bigint;
    public liquidationStrategy: string;
    public price: bigint;
    public debitExchangeRate: bigint;
    public blockId: string;
    public extrinsicId?: string;
    public timestamp: Date;
    

    get _name(): string {
        return 'LiquidUnsafe';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save LiquidUnsafe entity without an ID");
        await store.set('LiquidUnsafe', id.toString(), this as unknown as CompatLiquidUnsafeProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove LiquidUnsafe entity without an ID");
        await store.remove('LiquidUnsafe', id.toString());
    }

    static async get(id: string): Promise<LiquidUnsafe | undefined> {
        assert((id !== null && id !== undefined), "Cannot get LiquidUnsafe entity without an ID");
        const record = await store.get('LiquidUnsafe', id.toString());
        if (record) {
            return this.create(record as unknown as LiquidUnsafeProps);
        } else {
            return;
        }
    }

    static async getBySenderId(senderId: string, options: GetOptions<CompatLiquidUnsafeProps>): Promise<LiquidUnsafe[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatLiquidUnsafeProps>('LiquidUnsafe', 'senderId', senderId, options);
        return records.map(record => this.create(record as unknown as LiquidUnsafeProps));
    }
    

    static async getByOwnerId(ownerId: string, options: GetOptions<CompatLiquidUnsafeProps>): Promise<LiquidUnsafe[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatLiquidUnsafeProps>('LiquidUnsafe', 'ownerId', ownerId, options);
        return records.map(record => this.create(record as unknown as LiquidUnsafeProps));
    }
    

    static async getByCollateralId(collateralId: string, options: GetOptions<CompatLiquidUnsafeProps>): Promise<LiquidUnsafe[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatLiquidUnsafeProps>('LiquidUnsafe', 'collateralId', collateralId, options);
        return records.map(record => this.create(record as unknown as LiquidUnsafeProps));
    }
    

    static async getByBlockId(blockId: string, options: GetOptions<CompatLiquidUnsafeProps>): Promise<LiquidUnsafe[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatLiquidUnsafeProps>('LiquidUnsafe', 'blockId', blockId, options);
        return records.map(record => this.create(record as unknown as LiquidUnsafeProps));
    }
    

    static async getByExtrinsicId(extrinsicId: string, options: GetOptions<CompatLiquidUnsafeProps>): Promise<LiquidUnsafe[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatLiquidUnsafeProps>('LiquidUnsafe', 'extrinsicId', extrinsicId, options);
        return records.map(record => this.create(record as unknown as LiquidUnsafeProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<LiquidUnsafeProps>[], options: GetOptions<LiquidUnsafeProps>): Promise<LiquidUnsafe[]> {
        const records = await store.getByFields<CompatLiquidUnsafeProps>('LiquidUnsafe', filter  as unknown as FieldsExpression<CompatLiquidUnsafeProps>[], options as unknown as GetOptions<CompatLiquidUnsafeProps>);
        return records.map(record => this.create(record as unknown as LiquidUnsafeProps));
    }

    static create(record: LiquidUnsafeProps): LiquidUnsafe {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.senderId,
            record.ownerId,
            record.collateralId,
            record.collateralAmount,
            record.collateralVolumeUSD,
            record.badDebitVolumeUSD,
            record.liquidationStrategy,
            record.price,
            record.debitExchangeRate,
            record.blockId,
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
