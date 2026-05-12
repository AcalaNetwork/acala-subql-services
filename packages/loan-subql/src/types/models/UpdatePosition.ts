// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type UpdatePositionProps = Omit<UpdatePosition, NonNullable<FunctionPropertyNames<UpdatePosition>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatUpdatePositionProps = Omit<UpdatePositionProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class UpdatePosition implements CompatEntity {

    constructor(
        
        id: string,
        ownerId: string,
        collateralId: string,
        collateralAdjustment: bigint,
        debitAdjustment: bigint,
        collateralAdjustmentUSD: bigint,
        debitAdjustmentUSD: bigint,
        price: bigint,
        debitExchangeRate: bigint,
        isDerived: boolean,
        blockId: string,
        timestamp: Date,
    ) {
        this.id = id;
        this.ownerId = ownerId;
        this.collateralId = collateralId;
        this.collateralAdjustment = collateralAdjustment;
        this.debitAdjustment = debitAdjustment;
        this.collateralAdjustmentUSD = collateralAdjustmentUSD;
        this.debitAdjustmentUSD = debitAdjustmentUSD;
        this.price = price;
        this.debitExchangeRate = debitExchangeRate;
        this.isDerived = isDerived;
        this.blockId = blockId;
        this.timestamp = timestamp;
        
    }

    public id: string;
    public ownerId: string;
    public collateralId: string;
    public collateralAdjustment: bigint;
    public debitAdjustment: bigint;
    public collateralAdjustmentUSD: bigint;
    public debitAdjustmentUSD: bigint;
    public price: bigint;
    public debitExchangeRate: bigint;
    public isDerived: boolean;
    public blockId: string;
    public extrinsicId?: string;
    public timestamp: Date;
    

    get _name(): string {
        return 'UpdatePosition';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save UpdatePosition entity without an ID");
        await store.set('UpdatePosition', id.toString(), this as unknown as CompatUpdatePositionProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove UpdatePosition entity without an ID");
        await store.remove('UpdatePosition', id.toString());
    }

    static async get(id: string): Promise<UpdatePosition | undefined> {
        assert((id !== null && id !== undefined), "Cannot get UpdatePosition entity without an ID");
        const record = await store.get('UpdatePosition', id.toString());
        if (record) {
            return this.create(record as unknown as UpdatePositionProps);
        } else {
            return;
        }
    }

    static async getByOwnerId(ownerId: string, options: GetOptions<CompatUpdatePositionProps>): Promise<UpdatePosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatUpdatePositionProps>('UpdatePosition', 'ownerId', ownerId, options);
        return records.map(record => this.create(record as unknown as UpdatePositionProps));
    }
    

    static async getByCollateralId(collateralId: string, options: GetOptions<CompatUpdatePositionProps>): Promise<UpdatePosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatUpdatePositionProps>('UpdatePosition', 'collateralId', collateralId, options);
        return records.map(record => this.create(record as unknown as UpdatePositionProps));
    }
    

    static async getByBlockId(blockId: string, options: GetOptions<CompatUpdatePositionProps>): Promise<UpdatePosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatUpdatePositionProps>('UpdatePosition', 'blockId', blockId, options);
        return records.map(record => this.create(record as unknown as UpdatePositionProps));
    }
    

    static async getByExtrinsicId(extrinsicId: string, options: GetOptions<CompatUpdatePositionProps>): Promise<UpdatePosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatUpdatePositionProps>('UpdatePosition', 'extrinsicId', extrinsicId, options);
        return records.map(record => this.create(record as unknown as UpdatePositionProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<UpdatePositionProps>[], options: GetOptions<UpdatePositionProps>): Promise<UpdatePosition[]> {
        const records = await store.getByFields<CompatUpdatePositionProps>('UpdatePosition', filter  as unknown as FieldsExpression<CompatUpdatePositionProps>[], options as unknown as GetOptions<CompatUpdatePositionProps>);
        return records.map(record => this.create(record as unknown as UpdatePositionProps));
    }

    static create(record: UpdatePositionProps): UpdatePosition {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.ownerId,
            record.collateralId,
            record.collateralAdjustment,
            record.debitAdjustment,
            record.collateralAdjustmentUSD,
            record.debitAdjustmentUSD,
            record.price,
            record.debitExchangeRate,
            record.isDerived,
            record.blockId,
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
