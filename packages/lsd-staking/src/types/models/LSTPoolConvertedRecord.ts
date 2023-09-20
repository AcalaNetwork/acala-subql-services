// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type LSTPoolConvertedRecordProps = Omit<LSTPoolConvertedRecord, NonNullable<FunctionPropertyNames<LSTPoolConvertedRecord>>| '_name'>;

export class LSTPoolConvertedRecord implements Entity {

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
        return 'LSTPoolConvertedRecord';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save LSTPoolConvertedRecord entity without an ID");
        await store.set('LSTPoolConvertedRecord', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove LSTPoolConvertedRecord entity without an ID");
        await store.remove('LSTPoolConvertedRecord', id.toString());
    }

    static async get(id:string): Promise<LSTPoolConvertedRecord | undefined>{
        assert((id !== null && id !== undefined), "Cannot get LSTPoolConvertedRecord entity without an ID");
        const record = await store.get('LSTPoolConvertedRecord', id.toString());
        if (record){
            return this.create(record as LSTPoolConvertedRecordProps);
        }else{
            return;
        }
    }



    static create(record: LSTPoolConvertedRecordProps): LSTPoolConvertedRecord {
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
