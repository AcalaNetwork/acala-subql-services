// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type LoyaltyBonusRewardProps = Omit<LoyaltyBonusReward, NonNullable<FunctionPropertyNames<LoyaltyBonusReward>>| '_name'>;

export class LoyaltyBonusReward implements Entity {

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

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save LoyaltyBonusReward entity without an ID");
        await store.set('LoyaltyBonusReward', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove LoyaltyBonusReward entity without an ID");
        await store.remove('LoyaltyBonusReward', id.toString());
    }

    static async get(id:string): Promise<LoyaltyBonusReward | undefined>{
        assert((id !== null && id !== undefined), "Cannot get LoyaltyBonusReward entity without an ID");
        const record = await store.get('LoyaltyBonusReward', id.toString());
        if (record){
            return this.create(record as LoyaltyBonusRewardProps);
        }else{
            return;
        }
    }


    static async getByPoolId(poolId: string): Promise<LoyaltyBonusReward[] | undefined>{
      
      const records = await store.getByField('LoyaltyBonusReward', 'poolId', poolId);
      return records.map(record => this.create(record as LoyaltyBonusRewardProps));
      
    }


    static create(record: LoyaltyBonusRewardProps): LoyaltyBonusReward {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
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
