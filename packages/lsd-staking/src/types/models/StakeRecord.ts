// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type StakeRecordProps = Omit<StakeRecord, NonNullable<FunctionPropertyNames<StakeRecord>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatStakeRecordProps = Omit<StakeRecordProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class StakeRecord implements CompatEntity {

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
    public originShareTokenAmount?: bigint;
    

    get _name(): string {
        return 'StakeRecord';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save StakeRecord entity without an ID");
        await store.set('StakeRecord', id.toString(), this as unknown as CompatStakeRecordProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove StakeRecord entity without an ID");
        await store.remove('StakeRecord', id.toString());
    }

    static async get(id: string): Promise<StakeRecord | undefined> {
        assert((id !== null && id !== undefined), "Cannot get StakeRecord entity without an ID");
        const record = await store.get('StakeRecord', id.toString());
        if (record) {
            return this.create(record as unknown as StakeRecordProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<StakeRecordProps>[], options: GetOptions<StakeRecordProps>): Promise<StakeRecord[]> {
        const records = await store.getByFields<CompatStakeRecordProps>('StakeRecord', filter  as unknown as FieldsExpression<CompatStakeRecordProps>[], options as unknown as GetOptions<CompatStakeRecordProps>);
        return records.map(record => this.create(record as unknown as StakeRecordProps));
    }

    static create(record: StakeRecordProps): StakeRecord {
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
