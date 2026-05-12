// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type TransferPositionProps = Omit<TransferPosition, NonNullable<FunctionPropertyNames<TransferPosition>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatTransferPositionProps = Omit<TransferPositionProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class TransferPosition implements CompatEntity {

    constructor(
        
        id: string,
        collateralId: string,
        fromId: string,
        toId: string,
        blockId: string,
        timestamp: Date,
    ) {
        this.id = id;
        this.collateralId = collateralId;
        this.fromId = fromId;
        this.toId = toId;
        this.blockId = blockId;
        this.timestamp = timestamp;
        
    }

    public id: string;
    public collateralId: string;
    public fromId: string;
    public toId: string;
    public blockId: string;
    public extrinsicId?: string;
    public timestamp: Date;
    

    get _name(): string {
        return 'TransferPosition';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save TransferPosition entity without an ID");
        await store.set('TransferPosition', id.toString(), this as unknown as CompatTransferPositionProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove TransferPosition entity without an ID");
        await store.remove('TransferPosition', id.toString());
    }

    static async get(id: string): Promise<TransferPosition | undefined> {
        assert((id !== null && id !== undefined), "Cannot get TransferPosition entity without an ID");
        const record = await store.get('TransferPosition', id.toString());
        if (record) {
            return this.create(record as unknown as TransferPositionProps);
        } else {
            return;
        }
    }

    static async getByCollateralId(collateralId: string, options: GetOptions<CompatTransferPositionProps>): Promise<TransferPosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatTransferPositionProps>('TransferPosition', 'collateralId', collateralId, options);
        return records.map(record => this.create(record as unknown as TransferPositionProps));
    }
    

    static async getByFromId(fromId: string, options: GetOptions<CompatTransferPositionProps>): Promise<TransferPosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatTransferPositionProps>('TransferPosition', 'fromId', fromId, options);
        return records.map(record => this.create(record as unknown as TransferPositionProps));
    }
    

    static async getByToId(toId: string, options: GetOptions<CompatTransferPositionProps>): Promise<TransferPosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatTransferPositionProps>('TransferPosition', 'toId', toId, options);
        return records.map(record => this.create(record as unknown as TransferPositionProps));
    }
    

    static async getByBlockId(blockId: string, options: GetOptions<CompatTransferPositionProps>): Promise<TransferPosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatTransferPositionProps>('TransferPosition', 'blockId', blockId, options);
        return records.map(record => this.create(record as unknown as TransferPositionProps));
    }
    

    static async getByExtrinsicId(extrinsicId: string, options: GetOptions<CompatTransferPositionProps>): Promise<TransferPosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatTransferPositionProps>('TransferPosition', 'extrinsicId', extrinsicId, options);
        return records.map(record => this.create(record as unknown as TransferPositionProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<TransferPositionProps>[], options: GetOptions<TransferPositionProps>): Promise<TransferPosition[]> {
        const records = await store.getByFields<CompatTransferPositionProps>('TransferPosition', filter  as unknown as FieldsExpression<CompatTransferPositionProps>[], options as unknown as GetOptions<CompatTransferPositionProps>);
        return records.map(record => this.create(record as unknown as TransferPositionProps));
    }

    static create(record: TransferPositionProps): TransferPosition {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.collateralId,
            record.fromId,
            record.toId,
            record.blockId,
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
