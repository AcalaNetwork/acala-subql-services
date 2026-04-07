// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type DailyDexProps = Omit<DailyDex, NonNullable<FunctionPropertyNames<DailyDex>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatDailyDexProps = Omit<DailyDexProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class DailyDex implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public poolCount?: number;
    public dailyTradeVolumeUSD?: bigint;
    public tradeVolumeUSD?: bigint;
    public totalTVL?: bigint;
    public timestamp?: Date;
    public updateAtBlockId?: string;
    

    get _name(): string {
        return 'DailyDex';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save DailyDex entity without an ID");
        await store.set('DailyDex', id.toString(), this as unknown as CompatDailyDexProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove DailyDex entity without an ID");
        await store.remove('DailyDex', id.toString());
    }

    static async get(id: string): Promise<DailyDex | undefined> {
        assert((id !== null && id !== undefined), "Cannot get DailyDex entity without an ID");
        const record = await store.get('DailyDex', id.toString());
        if (record) {
            return this.create(record as unknown as DailyDexProps);
        } else {
            return;
        }
    }

    static async getByUpdateAtBlockId(updateAtBlockId: string, options: GetOptions<CompatDailyDexProps>): Promise<DailyDex[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatDailyDexProps>('DailyDex', 'updateAtBlockId', updateAtBlockId, options);
        return records.map(record => this.create(record as unknown as DailyDexProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<DailyDexProps>[], options: GetOptions<DailyDexProps>): Promise<DailyDex[]> {
        const records = await store.getByFields<CompatDailyDexProps>('DailyDex', filter  as unknown as FieldsExpression<CompatDailyDexProps>[], options as unknown as GetOptions<CompatDailyDexProps>);
        return records.map(record => this.create(record as unknown as DailyDexProps));
    }

    static create(record: DailyDexProps): DailyDex {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
