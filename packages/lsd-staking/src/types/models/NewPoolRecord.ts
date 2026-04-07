// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type NewPoolRecordProps = Omit<NewPoolRecord, NonNullable<FunctionPropertyNames<NewPoolRecord>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatNewPoolRecordProps = Omit<NewPoolRecordProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class NewPoolRecord implements CompatEntity {

    constructor(
        
        id: string,
        blockTimestamp: Date,
        from: string,
        poolId: bigint,
        shareType: string,
    ) {
        this.id = id;
        this.blockTimestamp = blockTimestamp;
        this.from = from;
        this.poolId = poolId;
        this.shareType = shareType;
        
    }

    public id: string;
    public blockTimestamp: Date;
    public from: string;
    public poolId: bigint;
    public shareType: string;
    

    get _name(): string {
        return 'NewPoolRecord';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save NewPoolRecord entity without an ID");
        await store.set('NewPoolRecord', id.toString(), this as unknown as CompatNewPoolRecordProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove NewPoolRecord entity without an ID");
        await store.remove('NewPoolRecord', id.toString());
    }

    static async get(id: string): Promise<NewPoolRecord | undefined> {
        assert((id !== null && id !== undefined), "Cannot get NewPoolRecord entity without an ID");
        const record = await store.get('NewPoolRecord', id.toString());
        if (record) {
            return this.create(record as unknown as NewPoolRecordProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<NewPoolRecordProps>[], options: GetOptions<NewPoolRecordProps>): Promise<NewPoolRecord[]> {
        const records = await store.getByFields<CompatNewPoolRecordProps>('NewPoolRecord', filter  as unknown as FieldsExpression<CompatNewPoolRecordProps>[], options as unknown as GetOptions<CompatNewPoolRecordProps>);
        return records.map(record => this.create(record as unknown as NewPoolRecordProps));
    }

    static create(record: NewPoolRecordProps): NewPoolRecord {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.blockTimestamp,
            record.from,
            record.poolId,
            record.shareType,
        );
        Object.assign(entity,record);
        return entity;
    }
}
