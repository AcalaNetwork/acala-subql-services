// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type AddProvisionProps = Omit<AddProvision, NonNullable<FunctionPropertyNames<AddProvision>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatAddProvisionProps = Omit<AddProvisionProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class AddProvision implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public addressId?: string;
    public poolId?: string;
    public token0Id?: string;
    public token1Id?: string;
    public token0Amount?: bigint;
    public token1Amount?: bigint;
    public price0?: bigint;
    public price1?: bigint;
    public blockId?: string;
    public extrinsicId?: string;
    public timestamp?: Date;
    

    get _name(): string {
        return 'AddProvision';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save AddProvision entity without an ID");
        await store.set('AddProvision', id.toString(), this as unknown as CompatAddProvisionProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove AddProvision entity without an ID");
        await store.remove('AddProvision', id.toString());
    }

    static async get(id: string): Promise<AddProvision | undefined> {
        assert((id !== null && id !== undefined), "Cannot get AddProvision entity without an ID");
        const record = await store.get('AddProvision', id.toString());
        if (record) {
            return this.create(record as unknown as AddProvisionProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatAddProvisionProps>): Promise<AddProvision[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatAddProvisionProps>('AddProvision', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as AddProvisionProps));
    }
    

    static async getByPoolId(poolId: string, options: GetOptions<CompatAddProvisionProps>): Promise<AddProvision[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatAddProvisionProps>('AddProvision', 'poolId', poolId, options);
        return records.map(record => this.create(record as unknown as AddProvisionProps));
    }
    

    static async getByToken0Id(token0Id: string, options: GetOptions<CompatAddProvisionProps>): Promise<AddProvision[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatAddProvisionProps>('AddProvision', 'token0Id', token0Id, options);
        return records.map(record => this.create(record as unknown as AddProvisionProps));
    }
    

    static async getByToken1Id(token1Id: string, options: GetOptions<CompatAddProvisionProps>): Promise<AddProvision[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatAddProvisionProps>('AddProvision', 'token1Id', token1Id, options);
        return records.map(record => this.create(record as unknown as AddProvisionProps));
    }
    

    static async getByBlockId(blockId: string, options: GetOptions<CompatAddProvisionProps>): Promise<AddProvision[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatAddProvisionProps>('AddProvision', 'blockId', blockId, options);
        return records.map(record => this.create(record as unknown as AddProvisionProps));
    }
    

    static async getByExtrinsicId(extrinsicId: string, options: GetOptions<CompatAddProvisionProps>): Promise<AddProvision[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatAddProvisionProps>('AddProvision', 'extrinsicId', extrinsicId, options);
        return records.map(record => this.create(record as unknown as AddProvisionProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<AddProvisionProps>[], options: GetOptions<AddProvisionProps>): Promise<AddProvision[]> {
        const records = await store.getByFields<CompatAddProvisionProps>('AddProvision', filter  as unknown as FieldsExpression<CompatAddProvisionProps>[], options as unknown as GetOptions<CompatAddProvisionProps>);
        return records.map(record => this.create(record as unknown as AddProvisionProps));
    }

    static create(record: AddProvisionProps): AddProvision {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
