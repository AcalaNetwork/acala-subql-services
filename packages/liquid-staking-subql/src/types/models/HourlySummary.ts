// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type HourlySummaryProps = Omit<HourlySummary, NonNullable<FunctionPropertyNames<HourlySummary>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatHourlySummaryProps = Omit<HourlySummaryProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class HourlySummary implements CompatEntity {

    constructor(
        
        id: string,
        toBondPool: bigint,
        exchangeRate: bigint,
        timestamp: Date,
        updateAt: bigint,
    ) {
        this.id = id;
        this.toBondPool = toBondPool;
        this.exchangeRate = exchangeRate;
        this.timestamp = timestamp;
        this.updateAt = updateAt;
        
    }

    public id: string;
    public toBondPool: bigint;
    public bonded?: bigint;
    public liquidIssuance?: bigint;
    public totalVoidLiquid?: bigint;
    public exchangeRate: bigint;
    public timestamp: Date;
    public updateAt: bigint;
    

    get _name(): string {
        return 'HourlySummary';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save HourlySummary entity without an ID");
        await store.set('HourlySummary', id.toString(), this as unknown as CompatHourlySummaryProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove HourlySummary entity without an ID");
        await store.remove('HourlySummary', id.toString());
    }

    static async get(id: string): Promise<HourlySummary | undefined> {
        assert((id !== null && id !== undefined), "Cannot get HourlySummary entity without an ID");
        const record = await store.get('HourlySummary', id.toString());
        if (record) {
            return this.create(record as unknown as HourlySummaryProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<HourlySummaryProps>[], options: GetOptions<HourlySummaryProps>): Promise<HourlySummary[]> {
        const records = await store.getByFields<CompatHourlySummaryProps>('HourlySummary', filter  as unknown as FieldsExpression<CompatHourlySummaryProps>[], options as unknown as GetOptions<CompatHourlySummaryProps>);
        return records.map(record => this.create(record as unknown as HourlySummaryProps));
    }

    static create(record: HourlySummaryProps): HourlySummary {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.toBondPool,
            record.exchangeRate,
            record.timestamp,
            record.updateAt,
        );
        Object.assign(entity,record);
        return entity;
    }
}
