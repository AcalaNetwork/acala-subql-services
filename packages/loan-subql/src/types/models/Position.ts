// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type PositionProps = Omit<Position, NonNullable<FunctionPropertyNames<Position>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatPositionProps = Omit<PositionProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Position implements CompatEntity {

    constructor(
        
        id: string,
        ownerId: string,
        collateralId: string,
        txCount: number,
        depositAmount: bigint,
        debitAmount: bigint,
        updateAt: Date,
        updateAtBlockId: string,
    ) {
        this.id = id;
        this.ownerId = ownerId;
        this.collateralId = collateralId;
        this.txCount = txCount;
        this.depositAmount = depositAmount;
        this.debitAmount = debitAmount;
        this.updateAt = updateAt;
        this.updateAtBlockId = updateAtBlockId;
        
    }

    public id: string;
    public ownerId: string;
    public collateralId: string;
    public txCount: number;
    public depositAmount: bigint;
    public debitAmount: bigint;
    public updateAt: Date;
    public updateAtBlockId: string;
    

    get _name(): string {
        return 'Position';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Position entity without an ID");
        await store.set('Position', id.toString(), this as unknown as CompatPositionProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Position entity without an ID");
        await store.remove('Position', id.toString());
    }

    static async get(id: string): Promise<Position | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Position entity without an ID");
        const record = await store.get('Position', id.toString());
        if (record) {
            return this.create(record as unknown as PositionProps);
        } else {
            return;
        }
    }

    static async getByOwnerId(ownerId: string, options: GetOptions<CompatPositionProps>): Promise<Position[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatPositionProps>('Position', 'ownerId', ownerId, options);
        return records.map(record => this.create(record as unknown as PositionProps));
    }
    

    static async getByCollateralId(collateralId: string, options: GetOptions<CompatPositionProps>): Promise<Position[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatPositionProps>('Position', 'collateralId', collateralId, options);
        return records.map(record => this.create(record as unknown as PositionProps));
    }
    

    static async getByUpdateAtBlockId(updateAtBlockId: string, options: GetOptions<CompatPositionProps>): Promise<Position[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatPositionProps>('Position', 'updateAtBlockId', updateAtBlockId, options);
        return records.map(record => this.create(record as unknown as PositionProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<PositionProps>[], options: GetOptions<PositionProps>): Promise<Position[]> {
        const records = await store.getByFields<CompatPositionProps>('Position', filter  as unknown as FieldsExpression<CompatPositionProps>[], options as unknown as GetOptions<CompatPositionProps>);
        return records.map(record => this.create(record as unknown as PositionProps));
    }

    static create(record: PositionProps): Position {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.ownerId,
            record.collateralId,
            record.txCount,
            record.depositAmount,
            record.debitAmount,
            record.updateAt,
            record.updateAtBlockId,
        );
        Object.assign(entity,record);
        return entity;
    }
}
