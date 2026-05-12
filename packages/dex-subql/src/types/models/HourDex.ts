// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type HourDexProps = Omit<HourDex, NonNullable<FunctionPropertyNames<HourDex>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatHourDexProps = Omit<HourDexProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class HourDex implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public poolCount?: number;
    public hourlyTradeVolumeUSD?: bigint;
    public tradeVolumeUSD?: bigint;
    public totalTVL?: bigint;
    public timestamp?: Date;
    public updateAtBlockId?: string;
    

    get _name(): string {
        return 'HourDex';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save HourDex entity without an ID");
        await store.set('HourDex', id.toString(), this as unknown as CompatHourDexProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove HourDex entity without an ID");
        await store.remove('HourDex', id.toString());
    }

    static async get(id: string): Promise<HourDex | undefined> {
        assert((id !== null && id !== undefined), "Cannot get HourDex entity without an ID");
        const record = await store.get('HourDex', id.toString());
        if (record) {
            return this.create(record as unknown as HourDexProps);
        } else {
            return;
        }
    }

    static async getByUpdateAtBlockId(updateAtBlockId: string, options: GetOptions<CompatHourDexProps>): Promise<HourDex[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatHourDexProps>('HourDex', 'updateAtBlockId', updateAtBlockId, options);
        return records.map(record => this.create(record as unknown as HourDexProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<HourDexProps>[], options: GetOptions<HourDexProps>): Promise<HourDex[]> {
        const records = await store.getByFields<CompatHourDexProps>('HourDex', filter  as unknown as FieldsExpression<CompatHourDexProps>[], options as unknown as GetOptions<CompatHourDexProps>);
        return records.map(record => this.create(record as unknown as HourDexProps));
    }

    static create(record: HourDexProps): HourDex {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
