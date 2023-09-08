// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type LSDPoolConvertedRecordProps = Omit<LSDPoolConvertedRecord, NonNullable<FunctionPropertyNames<LSDPoolConvertedRecord>>| '_name'>;

export class LSDPoolConvertedRecord implements Entity {

    constructor(
        
            id: string,
        
            blockTimestamp: Date,
        
            from: string,
        
            poolId: bigint,
        
            beforeShareType: string,
        
            afterShareType: string,
        
            beforeShareTokenAmount: bigint,
        
            afterShareTokenAmount: bigint,
        
    ) {
        
            this.id = id;
        
            this.blockTimestamp = blockTimestamp;
        
            this.from = from;
        
            this.poolId = poolId;
        
            this.beforeShareType = beforeShareType;
        
            this.afterShareType = afterShareType;
        
            this.beforeShareTokenAmount = beforeShareTokenAmount;
        
            this.afterShareTokenAmount = afterShareTokenAmount;
        
    }


    public id: string;

    public blockTimestamp: Date;

    public from: string;

    public poolId: bigint;

    public beforeShareType: string;

    public afterShareType: string;

    public beforeShareTokenAmount: bigint;

    public afterShareTokenAmount: bigint;


    get _name(): string {
        return 'LSDPoolConvertedRecord';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save LSDPoolConvertedRecord entity without an ID");
        await store.set('LSDPoolConvertedRecord', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove LSDPoolConvertedRecord entity without an ID");
        await store.remove('LSDPoolConvertedRecord', id.toString());
    }

    static async get(id:string): Promise<LSDPoolConvertedRecord | undefined>{
        assert((id !== null && id !== undefined), "Cannot get LSDPoolConvertedRecord entity without an ID");
        const record = await store.get('LSDPoolConvertedRecord', id.toString());
        if (record){
            return this.create(record as LSDPoolConvertedRecordProps);
        }else{
            return;
        }
    }



    static create(record: LSDPoolConvertedRecordProps): LSDPoolConvertedRecord {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.blockTimestamp,
        
            record.from,
        
            record.poolId,
        
            record.beforeShareType,
        
            record.afterShareType,
        
            record.beforeShareTokenAmount,
        
            record.afterShareTokenAmount,
        );
        Object.assign(entity,record);
        return entity;
    }
}
