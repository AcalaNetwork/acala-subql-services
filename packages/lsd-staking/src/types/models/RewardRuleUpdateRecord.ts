// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type RewardRuleUpdateRecordProps = Omit<RewardRuleUpdateRecord, NonNullable<FunctionPropertyNames<RewardRuleUpdateRecord>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatRewardRuleUpdateRecordProps = Omit<RewardRuleUpdateRecordProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class RewardRuleUpdateRecord implements CompatEntity {

    constructor(
        
        id: string,
        blockTimestamp: Date,
        from: string,
        poolId: bigint,
        rewardType: string,
        rewardRate: bigint,
        endTime: bigint,
    ) {
        this.id = id;
        this.blockTimestamp = blockTimestamp;
        this.from = from;
        this.poolId = poolId;
        this.rewardType = rewardType;
        this.rewardRate = rewardRate;
        this.endTime = endTime;
        
    }

    public id: string;
    public blockTimestamp: Date;
    public from: string;
    public poolId: bigint;
    public rewardType: string;
    public rewardRate: bigint;
    public endTime: bigint;
    

    get _name(): string {
        return 'RewardRuleUpdateRecord';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save RewardRuleUpdateRecord entity without an ID");
        await store.set('RewardRuleUpdateRecord', id.toString(), this as unknown as CompatRewardRuleUpdateRecordProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove RewardRuleUpdateRecord entity without an ID");
        await store.remove('RewardRuleUpdateRecord', id.toString());
    }

    static async get(id: string): Promise<RewardRuleUpdateRecord | undefined> {
        assert((id !== null && id !== undefined), "Cannot get RewardRuleUpdateRecord entity without an ID");
        const record = await store.get('RewardRuleUpdateRecord', id.toString());
        if (record) {
            return this.create(record as unknown as RewardRuleUpdateRecordProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<RewardRuleUpdateRecordProps>[], options: GetOptions<RewardRuleUpdateRecordProps>): Promise<RewardRuleUpdateRecord[]> {
        const records = await store.getByFields<CompatRewardRuleUpdateRecordProps>('RewardRuleUpdateRecord', filter  as unknown as FieldsExpression<CompatRewardRuleUpdateRecordProps>[], options as unknown as GetOptions<CompatRewardRuleUpdateRecordProps>);
        return records.map(record => this.create(record as unknown as RewardRuleUpdateRecordProps));
    }

    static create(record: RewardRuleUpdateRecordProps): RewardRuleUpdateRecord {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.blockTimestamp,
            record.from,
            record.poolId,
            record.rewardType,
            record.rewardRate,
            record.endTime,
        );
        Object.assign(entity,record);
        return entity;
    }
}
