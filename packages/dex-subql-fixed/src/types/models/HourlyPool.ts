// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type HourlyPoolProps = Omit<HourlyPool, NonNullable<FunctionPropertyNames<HourlyPool>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatHourlyPoolProps = Omit<HourlyPoolProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class HourlyPool implements CompatEntity {

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
    public hourlyToken0TradeVolume?: bigint;
    public hourlyToken1TradeVolume?: bigint;
    public hourlyTradeVolumeUSD?: bigint;
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
        return 'HourlyPool';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save HourlyPool entity without an ID");
        await store.set('HourlyPool', id.toString(), this as unknown as CompatHourlyPoolProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove HourlyPool entity without an ID");
        await store.remove('HourlyPool', id.toString());
    }

    static async get(id: string): Promise<HourlyPool | undefined> {
        assert((id !== null && id !== undefined), "Cannot get HourlyPool entity without an ID");
        const record = await store.get('HourlyPool', id.toString());
        if (record) {
            return this.create(record as unknown as HourlyPoolProps);
        } else {
            return;
        }
    }

    static async getByPoolId(poolId: string, options: GetOptions<CompatHourlyPoolProps>): Promise<HourlyPool[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatHourlyPoolProps>('HourlyPool', 'poolId', poolId, options);
        return records.map(record => this.create(record as unknown as HourlyPoolProps));
    }
    

    static async getByToken0Id(token0Id: string, options: GetOptions<CompatHourlyPoolProps>): Promise<HourlyPool[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatHourlyPoolProps>('HourlyPool', 'token0Id', token0Id, options);
        return records.map(record => this.create(record as unknown as HourlyPoolProps));
    }
    

    static async getByToken1Id(token1Id: string, options: GetOptions<CompatHourlyPoolProps>): Promise<HourlyPool[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatHourlyPoolProps>('HourlyPool', 'token1Id', token1Id, options);
        return records.map(record => this.create(record as unknown as HourlyPoolProps));
    }
    

    static async getByUpdateAtBlockId(updateAtBlockId: string, options: GetOptions<CompatHourlyPoolProps>): Promise<HourlyPool[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatHourlyPoolProps>('HourlyPool', 'updateAtBlockId', updateAtBlockId, options);
        return records.map(record => this.create(record as unknown as HourlyPoolProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<HourlyPoolProps>[], options: GetOptions<HourlyPoolProps>): Promise<HourlyPool[]> {
        const records = await store.getByFields<CompatHourlyPoolProps>('HourlyPool', filter  as unknown as FieldsExpression<CompatHourlyPoolProps>[], options as unknown as GetOptions<CompatHourlyPoolProps>);
        return records.map(record => this.create(record as unknown as HourlyPoolProps));
    }

    static create(record: HourlyPoolProps): HourlyPool {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
