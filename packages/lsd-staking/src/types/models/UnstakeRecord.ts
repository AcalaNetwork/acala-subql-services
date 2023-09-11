// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type UnstakeRecordProps = Omit<UnstakeRecord, NonNullable<FunctionPropertyNames<UnstakeRecord>>| '_name'>;

export class UnstakeRecord implements Entity {

    constructor(
        
            id: string,
        
            blockTimestamp: Date,
        
            from: string,
        
            sender: string,
        
            poolId: bigint,
        
            amount: bigint,
        
    ) {
        
            this.id = id;
        
            this.blockTimestamp = blockTimestamp;
        
            this.from = from;
        
            this.sender = sender;
        
            this.poolId = poolId;
        
            this.amount = amount;
        
    }


    public id: string;

    public blockTimestamp: Date;

    public from: string;

    public sender: string;

    public poolId: bigint;

    public amount: bigint;


    get _name(): string {
        return 'UnstakeRecord';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save UnstakeRecord entity without an ID");
        await store.set('UnstakeRecord', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove UnstakeRecord entity without an ID");
        await store.remove('UnstakeRecord', id.toString());
    }

    static async get(id:string): Promise<UnstakeRecord | undefined>{
        assert((id !== null && id !== undefined), "Cannot get UnstakeRecord entity without an ID");
        const record = await store.get('UnstakeRecord', id.toString());
        if (record){
            return this.create(record as UnstakeRecordProps);
        }else{
            return;
        }
    }



    static create(record: UnstakeRecordProps): UnstakeRecord {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.blockTimestamp,
        
            record.from,
        
            record.sender,
        
            record.poolId,
        
            record.amount,
        );
        Object.assign(entity,record);
        return entity;
    }
}
