// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type ConfiscatePositionProps = Omit<ConfiscatePosition, NonNullable<FunctionPropertyNames<ConfiscatePosition>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatConfiscatePositionProps = Omit<ConfiscatePositionProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class ConfiscatePosition implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public senderId?: string;
    public ownerId?: string;
    public collateralId?: string;
    public collateralAdjustment?: bigint;
    public debitAdjustment?: bigint;
    public collateralAdjustmentUSD?: bigint;
    public debitAdjustmentUSD?: bigint;
    public debitPool?: bigint;
    public blockId?: string;
    public timestamp?: Date;
    public extrinsicId?: string;
    

    get _name(): string {
        return 'ConfiscatePosition';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save ConfiscatePosition entity without an ID");
        await store.set('ConfiscatePosition', id.toString(), this as unknown as CompatConfiscatePositionProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove ConfiscatePosition entity without an ID");
        await store.remove('ConfiscatePosition', id.toString());
    }

    static async get(id: string): Promise<ConfiscatePosition | undefined> {
        assert((id !== null && id !== undefined), "Cannot get ConfiscatePosition entity without an ID");
        const record = await store.get('ConfiscatePosition', id.toString());
        if (record) {
            return this.create(record as unknown as ConfiscatePositionProps);
        } else {
            return;
        }
    }

    static async getBySenderId(senderId: string, options: GetOptions<CompatConfiscatePositionProps>): Promise<ConfiscatePosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatConfiscatePositionProps>('ConfiscatePosition', 'senderId', senderId, options);
        return records.map(record => this.create(record as unknown as ConfiscatePositionProps));
    }
    

    static async getByOwnerId(ownerId: string, options: GetOptions<CompatConfiscatePositionProps>): Promise<ConfiscatePosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatConfiscatePositionProps>('ConfiscatePosition', 'ownerId', ownerId, options);
        return records.map(record => this.create(record as unknown as ConfiscatePositionProps));
    }
    

    static async getByCollateralId(collateralId: string, options: GetOptions<CompatConfiscatePositionProps>): Promise<ConfiscatePosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatConfiscatePositionProps>('ConfiscatePosition', 'collateralId', collateralId, options);
        return records.map(record => this.create(record as unknown as ConfiscatePositionProps));
    }
    

    static async getByBlockId(blockId: string, options: GetOptions<CompatConfiscatePositionProps>): Promise<ConfiscatePosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatConfiscatePositionProps>('ConfiscatePosition', 'blockId', blockId, options);
        return records.map(record => this.create(record as unknown as ConfiscatePositionProps));
    }
    

    static async getByExtrinsicId(extrinsicId: string, options: GetOptions<CompatConfiscatePositionProps>): Promise<ConfiscatePosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatConfiscatePositionProps>('ConfiscatePosition', 'extrinsicId', extrinsicId, options);
        return records.map(record => this.create(record as unknown as ConfiscatePositionProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<ConfiscatePositionProps>[], options: GetOptions<ConfiscatePositionProps>): Promise<ConfiscatePosition[]> {
        const records = await store.getByFields<CompatConfiscatePositionProps>('ConfiscatePosition', filter  as unknown as FieldsExpression<CompatConfiscatePositionProps>[], options as unknown as GetOptions<CompatConfiscatePositionProps>);
        return records.map(record => this.create(record as unknown as ConfiscatePositionProps));
    }

    static create(record: ConfiscatePositionProps): ConfiscatePosition {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
