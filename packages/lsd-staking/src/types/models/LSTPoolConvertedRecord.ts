// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type LSTPoolConvertedRecordProps = Omit<LSTPoolConvertedRecord, NonNullable<FunctionPropertyNames<LSTPoolConvertedRecord>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatLSTPoolConvertedRecordProps = Omit<LSTPoolConvertedRecordProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class LSTPoolConvertedRecord implements CompatEntity {

    constructor(
        
        id: string,
        blockTimestamp: Date,
        from: string,
        poolId: bigint,
        beforeShareType: string,
        afterShareType: string,
        beforeShareTokenAmount: bigint,
        afterShareTokenAmount: bigint,
    ) {
        this.id = id;
        this.blockTimestamp = blockTimestamp;
        this.from = from;
        this.poolId = poolId;
        this.beforeShareType = beforeShareType;
        this.afterShareType = afterShareType;
        this.beforeShareTokenAmount = beforeShareTokenAmount;
        this.afterShareTokenAmount = afterShareTokenAmount;
        
    }

    public id: string;
    public blockTimestamp: Date;
    public from: string;
    public poolId: bigint;
    public beforeShareType: string;
    public afterShareType: string;
    public beforeShareTokenAmount: bigint;
    public afterShareTokenAmount: bigint;
    

    get _name(): string {
        return 'LSTPoolConvertedRecord';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save LSTPoolConvertedRecord entity without an ID");
        await store.set('LSTPoolConvertedRecord', id.toString(), this as unknown as CompatLSTPoolConvertedRecordProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove LSTPoolConvertedRecord entity without an ID");
        await store.remove('LSTPoolConvertedRecord', id.toString());
    }

    static async get(id: string): Promise<LSTPoolConvertedRecord | undefined> {
        assert((id !== null && id !== undefined), "Cannot get LSTPoolConvertedRecord entity without an ID");
        const record = await store.get('LSTPoolConvertedRecord', id.toString());
        if (record) {
            return this.create(record as unknown as LSTPoolConvertedRecordProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<LSTPoolConvertedRecordProps>[], options: GetOptions<LSTPoolConvertedRecordProps>): Promise<LSTPoolConvertedRecord[]> {
        const records = await store.getByFields<CompatLSTPoolConvertedRecordProps>('LSTPoolConvertedRecord', filter  as unknown as FieldsExpression<CompatLSTPoolConvertedRecordProps>[], options as unknown as GetOptions<CompatLSTPoolConvertedRecordProps>);
        return records.map(record => this.create(record as unknown as LSTPoolConvertedRecordProps));
    }

    static create(record: LSTPoolConvertedRecordProps): LSTPoolConvertedRecord {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.blockTimestamp,
            record.from,
            record.poolId,
            record.beforeShareType,
            record.afterShareType,
            record.beforeShareTokenAmount,
            record.afterShareTokenAmount,
        );
        Object.assign(entity,record);
        return entity;
    }
}
