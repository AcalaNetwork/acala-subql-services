// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type RewardRuleProps = Omit<RewardRule, NonNullable<FunctionPropertyNames<RewardRule>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatRewardRuleProps = Omit<RewardRuleProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class RewardRule implements CompatEntity {

    constructor(
        
        id: string,
        poolId: bigint,
        rewardType: string,
    ) {
        this.id = id;
        this.poolId = poolId;
        this.rewardType = rewardType;
        
    }

    public id: string;
    public poolId: bigint;
    public rewardType: string;
    public rewardRate?: bigint;
    public endTime?: bigint;
    

    get _name(): string {
        return 'RewardRule';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save RewardRule entity without an ID");
        await store.set('RewardRule', id.toString(), this as unknown as CompatRewardRuleProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove RewardRule entity without an ID");
        await store.remove('RewardRule', id.toString());
    }

    static async get(id: string): Promise<RewardRule | undefined> {
        assert((id !== null && id !== undefined), "Cannot get RewardRule entity without an ID");
        const record = await store.get('RewardRule', id.toString());
        if (record) {
            return this.create(record as unknown as RewardRuleProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<RewardRuleProps>[], options: GetOptions<RewardRuleProps>): Promise<RewardRule[]> {
        const records = await store.getByFields<CompatRewardRuleProps>('RewardRule', filter  as unknown as FieldsExpression<CompatRewardRuleProps>[], options as unknown as GetOptions<CompatRewardRuleProps>);
        return records.map(record => this.create(record as unknown as RewardRuleProps));
    }

    static create(record: RewardRuleProps): RewardRule {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.poolId,
            record.rewardType,
        );
        Object.assign(entity,record);
        return entity;
    }
}
