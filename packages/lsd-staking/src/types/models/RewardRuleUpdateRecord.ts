// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type RewardRuleUpdateRecordProps = Omit<RewardRuleUpdateRecord, NonNullable<FunctionPropertyNames<RewardRuleUpdateRecord>>| '_name'>;

export class RewardRuleUpdateRecord implements Entity {

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

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save RewardRuleUpdateRecord entity without an ID");
        await store.set('RewardRuleUpdateRecord', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove RewardRuleUpdateRecord entity without an ID");
        await store.remove('RewardRuleUpdateRecord', id.toString());
    }

    static async get(id:string): Promise<RewardRuleUpdateRecord | undefined>{
        assert((id !== null && id !== undefined), "Cannot get RewardRuleUpdateRecord entity without an ID");
        const record = await store.get('RewardRuleUpdateRecord', id.toString());
        if (record){
            return this.create(record as RewardRuleUpdateRecordProps);
        }else{
            return;
        }
    }



    static create(record: RewardRuleUpdateRecordProps): RewardRuleUpdateRecord {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
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
