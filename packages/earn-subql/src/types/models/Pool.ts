// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type PoolProps = Omit<Pool, NonNullable<FunctionPropertyNames<Pool>>| '_name'>;

export class Pool implements Entity {

    constructor(
        
            id: string,
        
        
            updatedAt: bigint,
        
            timestamp: Date,
        
    ) {
        
            this.id = id;
        
            this.updatedAt = updatedAt;
        
            this.timestamp = timestamp;
        
    }


    public id: string;

    public totalShares?: bigint;

    public updatedAt: bigint;

    public timestamp: Date;


    get _name(): string {
        return 'Pool';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Pool entity without an ID");
        await store.set('Pool', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Pool entity without an ID");
        await store.remove('Pool', id.toString());
    }

    static async get(id:string): Promise<Pool | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Pool entity without an ID");
        const record = await store.get('Pool', id.toString());
        if (record){
            return this.create(record as PoolProps);
        }else{
            return;
        }
    }



    static create(record: PoolProps): Pool {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.updatedAt,
        
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
