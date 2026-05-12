// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type SummaryProps = Omit<Summary, NonNullable<FunctionPropertyNames<Summary>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatSummaryProps = Omit<SummaryProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Summary implements CompatEntity {

    constructor(
        
        id: string,
        toBondPool: bigint,
        bonded: bigint,
        liquidIssuance: bigint,
        totalVoidLiquid: bigint,
        exchangeRate: bigint,
    ) {
        this.id = id;
        this.toBondPool = toBondPool;
        this.bonded = bonded;
        this.liquidIssuance = liquidIssuance;
        this.totalVoidLiquid = totalVoidLiquid;
        this.exchangeRate = exchangeRate;
        
    }

    public id: string;
    public toBondPool: bigint;
    public bonded: bigint;
    public liquidIssuance: bigint;
    public totalVoidLiquid: bigint;
    public exchangeRate: bigint;
    public forceUpdateAt?: bigint;
    public updateAt?: bigint;
    public timestamp?: Date;
    

    get _name(): string {
        return 'Summary';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Summary entity without an ID");
        await store.set('Summary', id.toString(), this as unknown as CompatSummaryProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Summary entity without an ID");
        await store.remove('Summary', id.toString());
    }

    static async get(id: string): Promise<Summary | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Summary entity without an ID");
        const record = await store.get('Summary', id.toString());
        if (record) {
            return this.create(record as unknown as SummaryProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<SummaryProps>[], options: GetOptions<SummaryProps>): Promise<Summary[]> {
        const records = await store.getByFields<CompatSummaryProps>('Summary', filter  as unknown as FieldsExpression<CompatSummaryProps>[], options as unknown as GetOptions<CompatSummaryProps>);
        return records.map(record => this.create(record as unknown as SummaryProps));
    }

    static create(record: SummaryProps): Summary {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.toBondPool,
            record.bonded,
            record.liquidIssuance,
            record.totalVoidLiquid,
            record.exchangeRate,
        );
        Object.assign(entity,record);
        return entity;
    }
}
