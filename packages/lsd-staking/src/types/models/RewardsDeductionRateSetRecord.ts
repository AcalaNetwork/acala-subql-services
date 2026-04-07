// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type RewardsDeductionRateSetRecordProps = Omit<RewardsDeductionRateSetRecord, NonNullable<FunctionPropertyNames<RewardsDeductionRateSetRecord>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatRewardsDeductionRateSetRecordProps = Omit<RewardsDeductionRateSetRecordProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class RewardsDeductionRateSetRecord implements CompatEntity {

    constructor(
        
        id: string,
        blockTimestamp: Date,
        from: string,
        poolId: bigint,
        rewardsDeductionRate: bigint,
    ) {
        this.id = id;
        this.blockTimestamp = blockTimestamp;
        this.from = from;
        this.poolId = poolId;
        this.rewardsDeductionRate = rewardsDeductionRate;
        
    }

    public id: string;
    public blockTimestamp: Date;
    public from: string;
    public poolId: bigint;
    public rewardsDeductionRate: bigint;
    

    get _name(): string {
        return 'RewardsDeductionRateSetRecord';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save RewardsDeductionRateSetRecord entity without an ID");
        await store.set('RewardsDeductionRateSetRecord', id.toString(), this as unknown as CompatRewardsDeductionRateSetRecordProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove RewardsDeductionRateSetRecord entity without an ID");
        await store.remove('RewardsDeductionRateSetRecord', id.toString());
    }

    static async get(id: string): Promise<RewardsDeductionRateSetRecord | undefined> {
        assert((id !== null && id !== undefined), "Cannot get RewardsDeductionRateSetRecord entity without an ID");
        const record = await store.get('RewardsDeductionRateSetRecord', id.toString());
        if (record) {
            return this.create(record as unknown as RewardsDeductionRateSetRecordProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<RewardsDeductionRateSetRecordProps>[], options: GetOptions<RewardsDeductionRateSetRecordProps>): Promise<RewardsDeductionRateSetRecord[]> {
        const records = await store.getByFields<CompatRewardsDeductionRateSetRecordProps>('RewardsDeductionRateSetRecord', filter  as unknown as FieldsExpression<CompatRewardsDeductionRateSetRecordProps>[], options as unknown as GetOptions<CompatRewardsDeductionRateSetRecordProps>);
        return records.map(record => this.create(record as unknown as RewardsDeductionRateSetRecordProps));
    }

    static create(record: RewardsDeductionRateSetRecordProps): RewardsDeductionRateSetRecord {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.blockTimestamp,
            record.from,
            record.poolId,
            record.rewardsDeductionRate,
        );
        Object.assign(entity,record);
        return entity;
    }
}
