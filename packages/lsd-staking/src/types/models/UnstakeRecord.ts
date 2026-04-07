// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type UnstakeRecordProps = Omit<UnstakeRecord, NonNullable<FunctionPropertyNames<UnstakeRecord>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatUnstakeRecordProps = Omit<UnstakeRecordProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class UnstakeRecord implements CompatEntity {

    constructor(
        
        id: string,
        blockTimestamp: Date,
        from: string,
        sender: string,
        poolId: bigint,
        amount: bigint,
    ) {
        this.id = id;
        this.blockTimestamp = blockTimestamp;
        this.from = from;
        this.sender = sender;
        this.poolId = poolId;
        this.amount = amount;
        
    }

    public id: string;
    public blockTimestamp: Date;
    public from: string;
    public sender: string;
    public poolId: bigint;
    public amount: bigint;
    

    get _name(): string {
        return 'UnstakeRecord';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save UnstakeRecord entity without an ID");
        await store.set('UnstakeRecord', id.toString(), this as unknown as CompatUnstakeRecordProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove UnstakeRecord entity without an ID");
        await store.remove('UnstakeRecord', id.toString());
    }

    static async get(id: string): Promise<UnstakeRecord | undefined> {
        assert((id !== null && id !== undefined), "Cannot get UnstakeRecord entity without an ID");
        const record = await store.get('UnstakeRecord', id.toString());
        if (record) {
            return this.create(record as unknown as UnstakeRecordProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<UnstakeRecordProps>[], options: GetOptions<UnstakeRecordProps>): Promise<UnstakeRecord[]> {
        const records = await store.getByFields<CompatUnstakeRecordProps>('UnstakeRecord', filter  as unknown as FieldsExpression<CompatUnstakeRecordProps>[], options as unknown as GetOptions<CompatUnstakeRecordProps>);
        return records.map(record => this.create(record as unknown as UnstakeRecordProps));
    }

    static create(record: UnstakeRecordProps): UnstakeRecord {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.blockTimestamp,
            record.from,
            record.sender,
            record.poolId,
            record.amount,
        );
        Object.assign(entity,record);
        return entity;
    }
}
