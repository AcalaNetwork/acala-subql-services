// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';

import {
    Reward,
} from '../interfaces'




export type LoyaltyBonusPoolProps = Omit<LoyaltyBonusPool, NonNullable<FunctionPropertyNames<LoyaltyBonusPool>>| '_name'>;

export class LoyaltyBonusPool implements Entity {

    constructor(
        
            id: string,
        
            rewards: Reward[],
        
            timestamp: Date,
        
            updatedAt: bigint,
        
    ) {
        
            this.id = id;
        
            this.rewards = rewards;
        
            this.timestamp = timestamp;
        
            this.updatedAt = updatedAt;
        
    }


    public id: string;

    public rewards: Reward[];

    public timestamp: Date;

    public updatedAt: bigint;


    get _name(): string {
        return 'LoyaltyBonusPool';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save LoyaltyBonusPool entity without an ID");
        await store.set('LoyaltyBonusPool', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove LoyaltyBonusPool entity without an ID");
        await store.remove('LoyaltyBonusPool', id.toString());
    }

    static async get(id:string): Promise<LoyaltyBonusPool | undefined>{
        assert((id !== null && id !== undefined), "Cannot get LoyaltyBonusPool entity without an ID");
        const record = await store.get('LoyaltyBonusPool', id.toString());
        if (record){
            return this.create(record as LoyaltyBonusPoolProps);
        }else{
            return;
        }
    }



    static create(record: LoyaltyBonusPoolProps): LoyaltyBonusPool {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.rewards,
        
            record.timestamp,
        
            record.updatedAt,
        );
        Object.assign(entity,record);
        return entity;
    }
}
