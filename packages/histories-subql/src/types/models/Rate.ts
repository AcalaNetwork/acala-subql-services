// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type RateProps = Omit<Rate, NonNullable<FunctionPropertyNames<Rate>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatRateProps = Omit<RateProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Rate implements CompatEntity {

    constructor(
        
        id: string,
        blockNumber: bigint,
        blockHash: string,
    ) {
        this.id = id;
        this.blockNumber = blockNumber;
        this.blockHash = blockHash;
        
    }

    public id: string;
    public totalStaking?: bigint;
    public totalLiquidity?: bigint;
    public totalVoidLiquid?: bigint;
    public exchangeRate?: bigint;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'Rate';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Rate entity without an ID");
        await store.set('Rate', id.toString(), this as unknown as CompatRateProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Rate entity without an ID");
        await store.remove('Rate', id.toString());
    }

    static async get(id: string): Promise<Rate | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Rate entity without an ID");
        const record = await store.get('Rate', id.toString());
        if (record) {
            return this.create(record as unknown as RateProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<RateProps>[], options: GetOptions<RateProps>): Promise<Rate[]> {
        const records = await store.getByFields<CompatRateProps>('Rate', filter  as unknown as FieldsExpression<CompatRateProps>[], options as unknown as GetOptions<CompatRateProps>);
        return records.map(record => this.create(record as unknown as RateProps));
    }

    static create(record: RateProps): Rate {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.blockNumber,
            record.blockHash,
        );
        Object.assign(entity,record);
        return entity;
    }
}
