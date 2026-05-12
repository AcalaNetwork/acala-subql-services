// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type PoolProps = Omit<Pool, NonNullable<FunctionPropertyNames<Pool>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatPoolProps = Omit<PoolProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Pool implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public token0Id?: string;
    public token1Id?: string;
    public token0Amount?: bigint;
    public token1Amount?: bigint;
    public token0Price?: bigint;
    public token1Price?: bigint;
    public feeRate?: bigint;
    public feeToken0Amount?: bigint;
    public feeToken1Amount?: bigint;
    public token0TradeVolume?: bigint;
    public token1TradeVolume?: bigint;
    public tradeVolumeUSD?: bigint;
    public token0TVL?: bigint;
    public token1TVL?: bigint;
    public totalTVL?: bigint;
    public txCount?: bigint;
    public updateAtBlockId?: string;
    

    get _name(): string {
        return 'Pool';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Pool entity without an ID");
        await store.set('Pool', id.toString(), this as unknown as CompatPoolProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Pool entity without an ID");
        await store.remove('Pool', id.toString());
    }

    static async get(id: string): Promise<Pool | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Pool entity without an ID");
        const record = await store.get('Pool', id.toString());
        if (record) {
            return this.create(record as unknown as PoolProps);
        } else {
            return;
        }
    }

    static async getByToken0Id(token0Id: string, options: GetOptions<CompatPoolProps>): Promise<Pool[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatPoolProps>('Pool', 'token0Id', token0Id, options);
        return records.map(record => this.create(record as unknown as PoolProps));
    }
    

    static async getByToken1Id(token1Id: string, options: GetOptions<CompatPoolProps>): Promise<Pool[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatPoolProps>('Pool', 'token1Id', token1Id, options);
        return records.map(record => this.create(record as unknown as PoolProps));
    }
    

    static async getByUpdateAtBlockId(updateAtBlockId: string, options: GetOptions<CompatPoolProps>): Promise<Pool[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatPoolProps>('Pool', 'updateAtBlockId', updateAtBlockId, options);
        return records.map(record => this.create(record as unknown as PoolProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<PoolProps>[], options: GetOptions<PoolProps>): Promise<Pool[]> {
        const records = await store.getByFields<CompatPoolProps>('Pool', filter  as unknown as FieldsExpression<CompatPoolProps>[], options as unknown as GetOptions<CompatPoolProps>);
        return records.map(record => this.create(record as unknown as PoolProps));
    }

    static create(record: PoolProps): Pool {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
