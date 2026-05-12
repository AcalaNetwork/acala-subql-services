// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type ListProvisionProps = Omit<ListProvision, NonNullable<FunctionPropertyNames<ListProvision>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatListProvisionProps = Omit<ListProvisionProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class ListProvision implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public poolId?: string;
    public token0Id?: string;
    public token1Id?: string;
    public blockId?: string;
    public extrinsicId?: string;
    public timestamp?: Date;
    

    get _name(): string {
        return 'ListProvision';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save ListProvision entity without an ID");
        await store.set('ListProvision', id.toString(), this as unknown as CompatListProvisionProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove ListProvision entity without an ID");
        await store.remove('ListProvision', id.toString());
    }

    static async get(id: string): Promise<ListProvision | undefined> {
        assert((id !== null && id !== undefined), "Cannot get ListProvision entity without an ID");
        const record = await store.get('ListProvision', id.toString());
        if (record) {
            return this.create(record as unknown as ListProvisionProps);
        } else {
            return;
        }
    }

    static async getByPoolId(poolId: string, options: GetOptions<CompatListProvisionProps>): Promise<ListProvision[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatListProvisionProps>('ListProvision', 'poolId', poolId, options);
        return records.map(record => this.create(record as unknown as ListProvisionProps));
    }
    

    static async getByToken0Id(token0Id: string, options: GetOptions<CompatListProvisionProps>): Promise<ListProvision[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatListProvisionProps>('ListProvision', 'token0Id', token0Id, options);
        return records.map(record => this.create(record as unknown as ListProvisionProps));
    }
    

    static async getByToken1Id(token1Id: string, options: GetOptions<CompatListProvisionProps>): Promise<ListProvision[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatListProvisionProps>('ListProvision', 'token1Id', token1Id, options);
        return records.map(record => this.create(record as unknown as ListProvisionProps));
    }
    

    static async getByBlockId(blockId: string, options: GetOptions<CompatListProvisionProps>): Promise<ListProvision[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatListProvisionProps>('ListProvision', 'blockId', blockId, options);
        return records.map(record => this.create(record as unknown as ListProvisionProps));
    }
    

    static async getByExtrinsicId(extrinsicId: string, options: GetOptions<CompatListProvisionProps>): Promise<ListProvision[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatListProvisionProps>('ListProvision', 'extrinsicId', extrinsicId, options);
        return records.map(record => this.create(record as unknown as ListProvisionProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<ListProvisionProps>[], options: GetOptions<ListProvisionProps>): Promise<ListProvision[]> {
        const records = await store.getByFields<CompatListProvisionProps>('ListProvision', filter  as unknown as FieldsExpression<CompatListProvisionProps>[], options as unknown as GetOptions<CompatListProvisionProps>);
        return records.map(record => this.create(record as unknown as ListProvisionProps));
    }

    static create(record: ListProvisionProps): ListProvision {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
