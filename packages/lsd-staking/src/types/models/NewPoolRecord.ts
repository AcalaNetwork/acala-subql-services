// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type NewPoolRecordProps = Omit<NewPoolRecord, NonNullable<FunctionPropertyNames<NewPoolRecord>>| '_name'>;

export class NewPoolRecord implements Entity {

    constructor(
        
            id: string,
        
            blockTimestamp: Date,
        
            from: string,
        
            poolId: bigint,
        
            shareType: string,
        
    ) {
        
            this.id = id;
        
            this.blockTimestamp = blockTimestamp;
        
            this.from = from;
        
            this.poolId = poolId;
        
            this.shareType = shareType;
        
    }


    public id: string;

    public blockTimestamp: Date;

    public from: string;

    public poolId: bigint;

    public shareType: string;


    get _name(): string {
        return 'NewPoolRecord';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save NewPoolRecord entity without an ID");
        await store.set('NewPoolRecord', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove NewPoolRecord entity without an ID");
        await store.remove('NewPoolRecord', id.toString());
    }

    static async get(id:string): Promise<NewPoolRecord | undefined>{
        assert((id !== null && id !== undefined), "Cannot get NewPoolRecord entity without an ID");
        const record = await store.get('NewPoolRecord', id.toString());
        if (record){
            return this.create(record as NewPoolRecordProps);
        }else{
            return;
        }
    }



    static create(record: NewPoolRecordProps): NewPoolRecord {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.blockTimestamp,
        
            record.from,
        
            record.poolId,
        
            record.shareType,
        );
        Object.assign(entity,record);
        return entity;
    }
}
