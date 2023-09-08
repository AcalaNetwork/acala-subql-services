// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type ClaimRewardRecordProps = Omit<ClaimRewardRecord, NonNullable<FunctionPropertyNames<ClaimRewardRecord>>| '_name'>;

export class ClaimRewardRecord implements Entity {

    constructor(
        
            id: string,
        
            blockTimestamp: Date,
        
            from: string,
        
            sender: string,
        
            poolId: bigint,
        
            rewardType: string,
        
            amount: bigint,
        
    ) {
        
            this.id = id;
        
            this.blockTimestamp = blockTimestamp;
        
            this.from = from;
        
            this.sender = sender;
        
            this.poolId = poolId;
        
            this.rewardType = rewardType;
        
            this.amount = amount;
        
    }


    public id: string;

    public blockTimestamp: Date;

    public from: string;

    public sender: string;

    public poolId: bigint;

    public rewardType: string;

    public amount: bigint;


    get _name(): string {
        return 'ClaimRewardRecord';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ClaimRewardRecord entity without an ID");
        await store.set('ClaimRewardRecord', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ClaimRewardRecord entity without an ID");
        await store.remove('ClaimRewardRecord', id.toString());
    }

    static async get(id:string): Promise<ClaimRewardRecord | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ClaimRewardRecord entity without an ID");
        const record = await store.get('ClaimRewardRecord', id.toString());
        if (record){
            return this.create(record as ClaimRewardRecordProps);
        }else{
            return;
        }
    }



    static create(record: ClaimRewardRecordProps): ClaimRewardRecord {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.blockTimestamp,
        
            record.from,
        
            record.sender,
        
            record.poolId,
        
            record.rewardType,
        
            record.amount,
        );
        Object.assign(entity,record);
        return entity;
    }
}
