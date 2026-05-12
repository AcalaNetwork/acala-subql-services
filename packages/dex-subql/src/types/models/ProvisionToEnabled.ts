// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type ProvisionToEnabledProps = Omit<ProvisionToEnabled, NonNullable<FunctionPropertyNames<ProvisionToEnabled>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatProvisionToEnabledProps = Omit<ProvisionToEnabledProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class ProvisionToEnabled implements CompatEntity {

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
    public totalShareAmount?: bigint;
    public blockId?: string;
    public extrinsicId?: string;
    public timestamp?: Date;
    

    get _name(): string {
        return 'ProvisionToEnabled';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save ProvisionToEnabled entity without an ID");
        await store.set('ProvisionToEnabled', id.toString(), this as unknown as CompatProvisionToEnabledProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove ProvisionToEnabled entity without an ID");
        await store.remove('ProvisionToEnabled', id.toString());
    }

    static async get(id: string): Promise<ProvisionToEnabled | undefined> {
        assert((id !== null && id !== undefined), "Cannot get ProvisionToEnabled entity without an ID");
        const record = await store.get('ProvisionToEnabled', id.toString());
        if (record) {
            return this.create(record as unknown as ProvisionToEnabledProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatProvisionToEnabledProps>): Promise<ProvisionToEnabled[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatProvisionToEnabledProps>('ProvisionToEnabled', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as ProvisionToEnabledProps));
    }
    

    static async getByPoolId(poolId: string, options: GetOptions<CompatProvisionToEnabledProps>): Promise<ProvisionToEnabled[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatProvisionToEnabledProps>('ProvisionToEnabled', 'poolId', poolId, options);
        return records.map(record => this.create(record as unknown as ProvisionToEnabledProps));
    }
    

    static async getByToken0Id(token0Id: string, options: GetOptions<CompatProvisionToEnabledProps>): Promise<ProvisionToEnabled[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatProvisionToEnabledProps>('ProvisionToEnabled', 'token0Id', token0Id, options);
        return records.map(record => this.create(record as unknown as ProvisionToEnabledProps));
    }
    

    static async getByToken1Id(token1Id: string, options: GetOptions<CompatProvisionToEnabledProps>): Promise<ProvisionToEnabled[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatProvisionToEnabledProps>('ProvisionToEnabled', 'token1Id', token1Id, options);
        return records.map(record => this.create(record as unknown as ProvisionToEnabledProps));
    }
    

    static async getByBlockId(blockId: string, options: GetOptions<CompatProvisionToEnabledProps>): Promise<ProvisionToEnabled[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatProvisionToEnabledProps>('ProvisionToEnabled', 'blockId', blockId, options);
        return records.map(record => this.create(record as unknown as ProvisionToEnabledProps));
    }
    

    static async getByExtrinsicId(extrinsicId: string, options: GetOptions<CompatProvisionToEnabledProps>): Promise<ProvisionToEnabled[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatProvisionToEnabledProps>('ProvisionToEnabled', 'extrinsicId', extrinsicId, options);
        return records.map(record => this.create(record as unknown as ProvisionToEnabledProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<ProvisionToEnabledProps>[], options: GetOptions<ProvisionToEnabledProps>): Promise<ProvisionToEnabled[]> {
        const records = await store.getByFields<CompatProvisionToEnabledProps>('ProvisionToEnabled', filter  as unknown as FieldsExpression<CompatProvisionToEnabledProps>[], options as unknown as GetOptions<CompatProvisionToEnabledProps>);
        return records.map(record => this.create(record as unknown as ProvisionToEnabledProps));
    }

    static create(record: ProvisionToEnabledProps): ProvisionToEnabled {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
