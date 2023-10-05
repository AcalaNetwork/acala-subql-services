// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type ClaimRewardsProps = Omit<ClaimRewards, NonNullable<FunctionPropertyNames<ClaimRewards>>| '_name'>;

export class ClaimRewards implements Entity {

    constructor(
        
            id: string,
        
            poolId: string,
        
            address: string,
        
            token: string,
        
            actualAmount: bigint,
        
            deductionAmount: bigint,
        
            block: bigint,
        
            extrinsic: string,
        
            timestamp: Date,
        
    ) {
        
            this.id = id;
        
            this.poolId = poolId;
        
            this.address = address;
        
            this.token = token;
        
            this.actualAmount = actualAmount;
        
            this.deductionAmount = deductionAmount;
        
            this.block = block;
        
            this.extrinsic = extrinsic;
        
            this.timestamp = timestamp;
        
    }


    public id: string;

    public poolId: string;

    public address: string;

    public token: string;

    public actualAmount: bigint;

    public deductionAmount: bigint;

    public block: bigint;

    public extrinsic: string;

    public timestamp: Date;


    get _name(): string {
        return 'ClaimRewards';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ClaimRewards entity without an ID");
        await store.set('ClaimRewards', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ClaimRewards entity without an ID");
        await store.remove('ClaimRewards', id.toString());
    }

    static async get(id:string): Promise<ClaimRewards | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ClaimRewards entity without an ID");
        const record = await store.get('ClaimRewards', id.toString());
        if (record){
            return this.create(record as ClaimRewardsProps);
        }else{
            return;
        }
    }



    static create(record: ClaimRewardsProps): ClaimRewards {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.poolId,
        
            record.address,
        
            record.token,
        
            record.actualAmount,
        
            record.deductionAmount,
        
            record.block,
        
            record.extrinsic,
        
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
