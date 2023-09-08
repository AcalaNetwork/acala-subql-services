// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type ClaimedRewardProps = Omit<ClaimedReward, NonNullable<FunctionPropertyNames<ClaimedReward>>| '_name'>;

export class ClaimedReward implements Entity {

    constructor(
        
            id: string,
        
        
    ) {
        
            this.id = id;
        
    }


    public id: string;

    public totalAmount?: bigint;


    get _name(): string {
        return 'ClaimedReward';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ClaimedReward entity without an ID");
        await store.set('ClaimedReward', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ClaimedReward entity without an ID");
        await store.remove('ClaimedReward', id.toString());
    }

    static async get(id:string): Promise<ClaimedReward | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ClaimedReward entity without an ID");
        const record = await store.get('ClaimedReward', id.toString());
        if (record){
            return this.create(record as ClaimedRewardProps);
        }else{
            return;
        }
    }



    static create(record: ClaimedRewardProps): ClaimedReward {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
