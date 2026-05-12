// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type StableAssetPoolHourlyDataProps = Omit<StableAssetPoolHourlyData, NonNullable<FunctionPropertyNames<StableAssetPoolHourlyData>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatStableAssetPoolHourlyDataProps = Omit<StableAssetPoolHourlyDataProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class StableAssetPoolHourlyData implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public poolId?: number;
    public totalTx?: number;
    public timestamp?: Date;
    public token0Id?: string;
    public token1Id?: string;
    public hourlyToken0TradeVolume?: bigint;
    public hourlyToken1TradeVolume?: bigint;
    public lastPrice?: bigint;
    public priceHigh?: bigint;
    public priceLow?: bigint;
    public updateAtBlockId?: string;
    

    get _name(): string {
        return 'StableAssetPoolHourlyData';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save StableAssetPoolHourlyData entity without an ID");
        await store.set('StableAssetPoolHourlyData', id.toString(), this as unknown as CompatStableAssetPoolHourlyDataProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove StableAssetPoolHourlyData entity without an ID");
        await store.remove('StableAssetPoolHourlyData', id.toString());
    }

    static async get(id: string): Promise<StableAssetPoolHourlyData | undefined> {
        assert((id !== null && id !== undefined), "Cannot get StableAssetPoolHourlyData entity without an ID");
        const record = await store.get('StableAssetPoolHourlyData', id.toString());
        if (record) {
            return this.create(record as unknown as StableAssetPoolHourlyDataProps);
        } else {
            return;
        }
    }

    static async getByToken0Id(token0Id: string, options: GetOptions<CompatStableAssetPoolHourlyDataProps>): Promise<StableAssetPoolHourlyData[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatStableAssetPoolHourlyDataProps>('StableAssetPoolHourlyData', 'token0Id', token0Id, options);
        return records.map(record => this.create(record as unknown as StableAssetPoolHourlyDataProps));
    }
    

    static async getByToken1Id(token1Id: string, options: GetOptions<CompatStableAssetPoolHourlyDataProps>): Promise<StableAssetPoolHourlyData[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatStableAssetPoolHourlyDataProps>('StableAssetPoolHourlyData', 'token1Id', token1Id, options);
        return records.map(record => this.create(record as unknown as StableAssetPoolHourlyDataProps));
    }
    

    static async getByUpdateAtBlockId(updateAtBlockId: string, options: GetOptions<CompatStableAssetPoolHourlyDataProps>): Promise<StableAssetPoolHourlyData[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatStableAssetPoolHourlyDataProps>('StableAssetPoolHourlyData', 'updateAtBlockId', updateAtBlockId, options);
        return records.map(record => this.create(record as unknown as StableAssetPoolHourlyDataProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<StableAssetPoolHourlyDataProps>[], options: GetOptions<StableAssetPoolHourlyDataProps>): Promise<StableAssetPoolHourlyData[]> {
        const records = await store.getByFields<CompatStableAssetPoolHourlyDataProps>('StableAssetPoolHourlyData', filter  as unknown as FieldsExpression<CompatStableAssetPoolHourlyDataProps>[], options as unknown as GetOptions<CompatStableAssetPoolHourlyDataProps>);
        return records.map(record => this.create(record as unknown as StableAssetPoolHourlyDataProps));
    }

    static create(record: StableAssetPoolHourlyDataProps): StableAssetPoolHourlyData {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
