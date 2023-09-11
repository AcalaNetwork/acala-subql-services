// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type RewardsDeductionRateSetRecordProps = Omit<RewardsDeductionRateSetRecord, NonNullable<FunctionPropertyNames<RewardsDeductionRateSetRecord>>| '_name'>;

export class RewardsDeductionRateSetRecord implements Entity {

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

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save RewardsDeductionRateSetRecord entity without an ID");
        await store.set('RewardsDeductionRateSetRecord', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove RewardsDeductionRateSetRecord entity without an ID");
        await store.remove('RewardsDeductionRateSetRecord', id.toString());
    }

    static async get(id:string): Promise<RewardsDeductionRateSetRecord | undefined>{
        assert((id !== null && id !== undefined), "Cannot get RewardsDeductionRateSetRecord entity without an ID");
        const record = await store.get('RewardsDeductionRateSetRecord', id.toString());
        if (record){
            return this.create(record as RewardsDeductionRateSetRecordProps);
        }else{
            return;
        }
    }



    static create(record: RewardsDeductionRateSetRecordProps): RewardsDeductionRateSetRecord {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
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
