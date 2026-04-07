// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type ProvisionPoolHourlyDataProps = Omit<ProvisionPoolHourlyData, NonNullable<FunctionPropertyNames<ProvisionPoolHourlyData>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatProvisionPoolHourlyDataProps = Omit<ProvisionPoolHourlyDataProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class ProvisionPoolHourlyData implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public poolId?: string;
    public token0Amount?: bigint;
    public token1Amount?: bigint;
    public price0?: bigint;
    public price1?: bigint;
    public hourlyToken0InAmount?: bigint;
    public hourlyToken1InAmount?: bigint;
    public timestamp?: Date;
    public updateAtBlockId?: string;
    

    get _name(): string {
        return 'ProvisionPoolHourlyData';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save ProvisionPoolHourlyData entity without an ID");
        await store.set('ProvisionPoolHourlyData', id.toString(), this as unknown as CompatProvisionPoolHourlyDataProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove ProvisionPoolHourlyData entity without an ID");
        await store.remove('ProvisionPoolHourlyData', id.toString());
    }

    static async get(id: string): Promise<ProvisionPoolHourlyData | undefined> {
        assert((id !== null && id !== undefined), "Cannot get ProvisionPoolHourlyData entity without an ID");
        const record = await store.get('ProvisionPoolHourlyData', id.toString());
        if (record) {
            return this.create(record as unknown as ProvisionPoolHourlyDataProps);
        } else {
            return;
        }
    }

    static async getByPoolId(poolId: string, options: GetOptions<CompatProvisionPoolHourlyDataProps>): Promise<ProvisionPoolHourlyData[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatProvisionPoolHourlyDataProps>('ProvisionPoolHourlyData', 'poolId', poolId, options);
        return records.map(record => this.create(record as unknown as ProvisionPoolHourlyDataProps));
    }
    

    static async getByUpdateAtBlockId(updateAtBlockId: string, options: GetOptions<CompatProvisionPoolHourlyDataProps>): Promise<ProvisionPoolHourlyData[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatProvisionPoolHourlyDataProps>('ProvisionPoolHourlyData', 'updateAtBlockId', updateAtBlockId, options);
        return records.map(record => this.create(record as unknown as ProvisionPoolHourlyDataProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<ProvisionPoolHourlyDataProps>[], options: GetOptions<ProvisionPoolHourlyDataProps>): Promise<ProvisionPoolHourlyData[]> {
        const records = await store.getByFields<CompatProvisionPoolHourlyDataProps>('ProvisionPoolHourlyData', filter  as unknown as FieldsExpression<CompatProvisionPoolHourlyDataProps>[], options as unknown as GetOptions<CompatProvisionPoolHourlyDataProps>);
        return records.map(record => this.create(record as unknown as ProvisionPoolHourlyDataProps));
    }

    static create(record: ProvisionPoolHourlyDataProps): ProvisionPoolHourlyData {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
