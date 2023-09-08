// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type RewardSupplyProps = Omit<RewardSupply, NonNullable<FunctionPropertyNames<RewardSupply>>| '_name'>;

export class RewardSupply implements Entity {

    constructor(
        
            id: string,
        
        
    ) {
        
            this.id = id;
        
    }


    public id: string;

    public amount?: bigint;


    get _name(): string {
        return 'RewardSupply';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save RewardSupply entity without an ID");
        await store.set('RewardSupply', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove RewardSupply entity without an ID");
        await store.remove('RewardSupply', id.toString());
    }

    static async get(id:string): Promise<RewardSupply | undefined>{
        assert((id !== null && id !== undefined), "Cannot get RewardSupply entity without an ID");
        const record = await store.get('RewardSupply', id.toString());
        if (record){
            return this.create(record as RewardSupplyProps);
        }else{
            return;
        }
    }



    static create(record: RewardSupplyProps): RewardSupply {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
