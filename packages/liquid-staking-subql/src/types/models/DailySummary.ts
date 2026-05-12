// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type DailySummaryProps = Omit<DailySummary, NonNullable<FunctionPropertyNames<DailySummary>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatDailySummaryProps = Omit<DailySummaryProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class DailySummary implements CompatEntity {

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
        return 'DailySummary';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save DailySummary entity without an ID");
        await store.set('DailySummary', id.toString(), this as unknown as CompatDailySummaryProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove DailySummary entity without an ID");
        await store.remove('DailySummary', id.toString());
    }

    static async get(id: string): Promise<DailySummary | undefined> {
        assert((id !== null && id !== undefined), "Cannot get DailySummary entity without an ID");
        const record = await store.get('DailySummary', id.toString());
        if (record) {
            return this.create(record as unknown as DailySummaryProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<DailySummaryProps>[], options: GetOptions<DailySummaryProps>): Promise<DailySummary[]> {
        const records = await store.getByFields<CompatDailySummaryProps>('DailySummary', filter  as unknown as FieldsExpression<CompatDailySummaryProps>[], options as unknown as GetOptions<CompatDailySummaryProps>);
        return records.map(record => this.create(record as unknown as DailySummaryProps));
    }

    static create(record: DailySummaryProps): DailySummary {
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
