// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type ClaimRewardRecordProps = Omit<ClaimRewardRecord, NonNullable<FunctionPropertyNames<ClaimRewardRecord>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatClaimRewardRecordProps = Omit<ClaimRewardRecordProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class ClaimRewardRecord implements CompatEntity {

    constructor(
        
        id: string,
        blockTimestamp: Date,
        from: string,
        sender: string,
        poolId: bigint,
        rewardType: string,
        amount: bigint,
    ) {
        this.id = id;
        this.blockTimestamp = blockTimestamp;
        this.from = from;
        this.sender = sender;
        this.poolId = poolId;
        this.rewardType = rewardType;
        this.amount = amount;
        
    }

    public id: string;
    public blockTimestamp: Date;
    public from: string;
    public sender: string;
    public poolId: bigint;
    public rewardType: string;
    public amount: bigint;
    

    get _name(): string {
        return 'ClaimRewardRecord';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save ClaimRewardRecord entity without an ID");
        await store.set('ClaimRewardRecord', id.toString(), this as unknown as CompatClaimRewardRecordProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove ClaimRewardRecord entity without an ID");
        await store.remove('ClaimRewardRecord', id.toString());
    }

    static async get(id: string): Promise<ClaimRewardRecord | undefined> {
        assert((id !== null && id !== undefined), "Cannot get ClaimRewardRecord entity without an ID");
        const record = await store.get('ClaimRewardRecord', id.toString());
        if (record) {
            return this.create(record as unknown as ClaimRewardRecordProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<ClaimRewardRecordProps>[], options: GetOptions<ClaimRewardRecordProps>): Promise<ClaimRewardRecord[]> {
        const records = await store.getByFields<CompatClaimRewardRecordProps>('ClaimRewardRecord', filter  as unknown as FieldsExpression<CompatClaimRewardRecordProps>[], options as unknown as GetOptions<CompatClaimRewardRecordProps>);
        return records.map(record => this.create(record as unknown as ClaimRewardRecordProps));
    }

    static create(record: ClaimRewardRecordProps): ClaimRewardRecord {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.blockTimestamp,
            record.from,
            record.sender,
            record.poolId,
            record.rewardType,
            record.amount,
        );
        Object.assign(entity,record);
        return entity;
    }
}
