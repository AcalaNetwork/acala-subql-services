// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type UserLoyaltyBonusRewardProps = Omit<UserLoyaltyBonusReward, NonNullable<FunctionPropertyNames<UserLoyaltyBonusReward>>| '_name'>;

export class UserLoyaltyBonusReward implements Entity {

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

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save UserLoyaltyBonusReward entity without an ID");
        await store.set('UserLoyaltyBonusReward', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove UserLoyaltyBonusReward entity without an ID");
        await store.remove('UserLoyaltyBonusReward', id.toString());
    }

    static async get(id:string): Promise<UserLoyaltyBonusReward | undefined>{
        assert((id !== null && id !== undefined), "Cannot get UserLoyaltyBonusReward entity without an ID");
        const record = await store.get('UserLoyaltyBonusReward', id.toString());
        if (record){
            return this.create(record as UserLoyaltyBonusRewardProps);
        }else{
            return;
        }
    }


    static async getByUserId(userId: string): Promise<UserLoyaltyBonusReward[] | undefined>{
      
      const records = await store.getByField('UserLoyaltyBonusReward', 'userId', userId);
      return records.map(record => this.create(record as UserLoyaltyBonusRewardProps));
      
    }


    static create(record: UserLoyaltyBonusRewardProps): UserLoyaltyBonusReward {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
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
