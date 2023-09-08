// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type RewardRuleProps = Omit<RewardRule, NonNullable<FunctionPropertyNames<RewardRule>>| '_name'>;

export class RewardRule implements Entity {

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

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save RewardRule entity without an ID");
        await store.set('RewardRule', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove RewardRule entity without an ID");
        await store.remove('RewardRule', id.toString());
    }

    static async get(id:string): Promise<RewardRule | undefined>{
        assert((id !== null && id !== undefined), "Cannot get RewardRule entity without an ID");
        const record = await store.get('RewardRule', id.toString());
        if (record){
            return this.create(record as RewardRuleProps);
        }else{
            return;
        }
    }



    static create(record: RewardRuleProps): RewardRule {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.poolId,
        
            record.rewardType,
        );
        Object.assign(entity,record);
        return entity;
    }
}
