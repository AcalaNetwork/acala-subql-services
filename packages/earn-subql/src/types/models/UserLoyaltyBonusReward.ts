// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type UserLoyaltyBonusRewardProps = Omit<UserLoyaltyBonusReward, NonNullable<FunctionPropertyNames<UserLoyaltyBonusReward>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatUserLoyaltyBonusRewardProps = Omit<UserLoyaltyBonusRewardProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class UserLoyaltyBonusReward implements CompatEntity {

    constructor(
        
        id: string,
        userId: string,
        token: string,
        amount: bigint,
        timestamp: Date,
        updatedAt: bigint,
    ) {
        this.id = id;
        this.userId = userId;
        this.token = token;
        this.amount = amount;
        this.timestamp = timestamp;
        this.updatedAt = updatedAt;
        
    }

    public id: string;
    public userId: string;
    public token: string;
    public amount: bigint;
    public timestamp: Date;
    public updatedAt: bigint;
    

    get _name(): string {
        return 'UserLoyaltyBonusReward';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save UserLoyaltyBonusReward entity without an ID");
        await store.set('UserLoyaltyBonusReward', id.toString(), this as unknown as CompatUserLoyaltyBonusRewardProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove UserLoyaltyBonusReward entity without an ID");
        await store.remove('UserLoyaltyBonusReward', id.toString());
    }

    static async get(id: string): Promise<UserLoyaltyBonusReward | undefined> {
        assert((id !== null && id !== undefined), "Cannot get UserLoyaltyBonusReward entity without an ID");
        const record = await store.get('UserLoyaltyBonusReward', id.toString());
        if (record) {
            return this.create(record as unknown as UserLoyaltyBonusRewardProps);
        } else {
            return;
        }
    }

    static async getByUserId(userId: string, options: GetOptions<CompatUserLoyaltyBonusRewardProps>): Promise<UserLoyaltyBonusReward[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatUserLoyaltyBonusRewardProps>('UserLoyaltyBonusReward', 'userId', userId, options);
        return records.map(record => this.create(record as unknown as UserLoyaltyBonusRewardProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<UserLoyaltyBonusRewardProps>[], options: GetOptions<UserLoyaltyBonusRewardProps>): Promise<UserLoyaltyBonusReward[]> {
        const records = await store.getByFields<CompatUserLoyaltyBonusRewardProps>('UserLoyaltyBonusReward', filter  as unknown as FieldsExpression<CompatUserLoyaltyBonusRewardProps>[], options as unknown as GetOptions<CompatUserLoyaltyBonusRewardProps>);
        return records.map(record => this.create(record as unknown as UserLoyaltyBonusRewardProps));
    }

    static create(record: UserLoyaltyBonusRewardProps): UserLoyaltyBonusReward {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.userId,
            record.token,
            record.amount,
            record.timestamp,
            record.updatedAt,
        );
        Object.assign(entity,record);
        return entity;
    }
}
