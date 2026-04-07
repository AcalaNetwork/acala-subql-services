// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type DailyPoolProps = Omit<DailyPool, NonNullable<FunctionPropertyNames<DailyPool>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatDailyPoolProps = Omit<DailyPoolProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class DailyPool implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public poolId?: string;
    public timestamp?: Date;
    public token0Id?: string;
    public token1Id?: string;
    public token0Amount?: bigint;
    public token1Amount?: bigint;
    public token0Price?: bigint;
    public token1Price?: bigint;
    public feeRateUSD?: bigint;
    public feeToken0Amount?: bigint;
    public feeToken1Amount?: bigint;
    public dailyToken0TradeVolume?: bigint;
    public dailyToken1TradeVolume?: bigint;
    public dailyTradeVolumeUSD?: bigint;
    public token0TradeVolume?: bigint;
    public token1TradeVolume?: bigint;
    public tradeVolumeUSD?: bigint;
    public token0TVL?: bigint;
    public token1TVL?: bigint;
    public totalTVL?: bigint;
    public txCount?: bigint;
    public token0Open?: bigint;
    public token0High?: bigint;
    public token0Low?: bigint;
    public token0Close?: bigint;
    public token1Open?: bigint;
    public token1High?: bigint;
    public token1Low?: bigint;
    public token1Close?: bigint;
    public updateAtBlockId?: string;
    

    get _name(): string {
        return 'DailyPool';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save DailyPool entity without an ID");
        await store.set('DailyPool', id.toString(), this as unknown as CompatDailyPoolProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove DailyPool entity without an ID");
        await store.remove('DailyPool', id.toString());
    }

    static async get(id: string): Promise<DailyPool | undefined> {
        assert((id !== null && id !== undefined), "Cannot get DailyPool entity without an ID");
        const record = await store.get('DailyPool', id.toString());
        if (record) {
            return this.create(record as unknown as DailyPoolProps);
        } else {
            return;
        }
    }

    static async getByPoolId(poolId: string, options: GetOptions<CompatDailyPoolProps>): Promise<DailyPool[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatDailyPoolProps>('DailyPool', 'poolId', poolId, options);
        return records.map(record => this.create(record as unknown as DailyPoolProps));
    }
    

    static async getByToken0Id(token0Id: string, options: GetOptions<CompatDailyPoolProps>): Promise<DailyPool[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatDailyPoolProps>('DailyPool', 'token0Id', token0Id, options);
        return records.map(record => this.create(record as unknown as DailyPoolProps));
    }
    

    static async getByToken1Id(token1Id: string, options: GetOptions<CompatDailyPoolProps>): Promise<DailyPool[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatDailyPoolProps>('DailyPool', 'token1Id', token1Id, options);
        return records.map(record => this.create(record as unknown as DailyPoolProps));
    }
    

    static async getByUpdateAtBlockId(updateAtBlockId: string, options: GetOptions<CompatDailyPoolProps>): Promise<DailyPool[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatDailyPoolProps>('DailyPool', 'updateAtBlockId', updateAtBlockId, options);
        return records.map(record => this.create(record as unknown as DailyPoolProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<DailyPoolProps>[], options: GetOptions<DailyPoolProps>): Promise<DailyPool[]> {
        const records = await store.getByFields<CompatDailyPoolProps>('DailyPool', filter  as unknown as FieldsExpression<CompatDailyPoolProps>[], options as unknown as GetOptions<CompatDailyPoolProps>);
        return records.map(record => this.create(record as unknown as DailyPoolProps));
    }

    static create(record: DailyPoolProps): DailyPool {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
