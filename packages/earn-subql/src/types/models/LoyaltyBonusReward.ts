// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type LoyaltyBonusRewardProps = Omit<LoyaltyBonusReward, NonNullable<FunctionPropertyNames<LoyaltyBonusReward>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatLoyaltyBonusRewardProps = Omit<LoyaltyBonusRewardProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class LoyaltyBonusReward implements CompatEntity {

    constructor(
        
        id: string,
        poolId: string,
        token: string,
        amount: bigint,
        timestamp: Date,
        updatedAt: bigint,
    ) {
        this.id = id;
        this.poolId = poolId;
        this.token = token;
        this.amount = amount;
        this.timestamp = timestamp;
        this.updatedAt = updatedAt;
        
    }

    public id: string;
    public poolId: string;
    public token: string;
    public amount: bigint;
    public timestamp: Date;
    public updatedAt: bigint;
    

    get _name(): string {
        return 'LoyaltyBonusReward';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save LoyaltyBonusReward entity without an ID");
        await store.set('LoyaltyBonusReward', id.toString(), this as unknown as CompatLoyaltyBonusRewardProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove LoyaltyBonusReward entity without an ID");
        await store.remove('LoyaltyBonusReward', id.toString());
    }

    static async get(id: string): Promise<LoyaltyBonusReward | undefined> {
        assert((id !== null && id !== undefined), "Cannot get LoyaltyBonusReward entity without an ID");
        const record = await store.get('LoyaltyBonusReward', id.toString());
        if (record) {
            return this.create(record as unknown as LoyaltyBonusRewardProps);
        } else {
            return;
        }
    }

    static async getByPoolId(poolId: string, options: GetOptions<CompatLoyaltyBonusRewardProps>): Promise<LoyaltyBonusReward[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatLoyaltyBonusRewardProps>('LoyaltyBonusReward', 'poolId', poolId, options);
        return records.map(record => this.create(record as unknown as LoyaltyBonusRewardProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<LoyaltyBonusRewardProps>[], options: GetOptions<LoyaltyBonusRewardProps>): Promise<LoyaltyBonusReward[]> {
        const records = await store.getByFields<CompatLoyaltyBonusRewardProps>('LoyaltyBonusReward', filter  as unknown as FieldsExpression<CompatLoyaltyBonusRewardProps>[], options as unknown as GetOptions<CompatLoyaltyBonusRewardProps>);
        return records.map(record => this.create(record as unknown as LoyaltyBonusRewardProps));
    }

    static create(record: LoyaltyBonusRewardProps): LoyaltyBonusReward {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.poolId,
            record.token,
            record.amount,
            record.timestamp,
            record.updatedAt,
        );
        Object.assign(entity,record);
        return entity;
    }
}
