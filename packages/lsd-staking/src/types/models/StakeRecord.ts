// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type StakeRecordProps = Omit<StakeRecord, NonNullable<FunctionPropertyNames<StakeRecord>>| '_name'>;

export class StakeRecord implements Entity {

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

    public originShareTokenAmount?: bigint;


    get _name(): string {
        return 'StakeRecord';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save StakeRecord entity without an ID");
        await store.set('StakeRecord', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove StakeRecord entity without an ID");
        await store.remove('StakeRecord', id.toString());
    }

    static async get(id:string): Promise<StakeRecord | undefined>{
        assert((id !== null && id !== undefined), "Cannot get StakeRecord entity without an ID");
        const record = await store.get('StakeRecord', id.toString());
        if (record){
            return this.create(record as StakeRecordProps);
        }else{
            return;
        }
    }



    static create(record: StakeRecordProps): StakeRecord {
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
