// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type DailySummaryProps = Omit<DailySummary, NonNullable<FunctionPropertyNames<DailySummary>>| '_name'>;

export class DailySummary implements Entity {

    constructor(
        
            id: string,
        
            toBondPool: bigint,
        
        
        
        
            exchangeRate: bigint,
        
            timestamp: Date,
        
            updateAt: bigint,
        
    ) {
        
            this.id = id;
        
            this.toBondPool = toBondPool;
        
            this.exchangeRate = exchangeRate;
        
            this.timestamp = timestamp;
        
            this.updateAt = updateAt;
        
    }


    public id: string;

    public toBondPool: bigint;

    public bonded?: bigint;

    public liquidIssuance?: bigint;

    public totalVoidLiquid?: bigint;

    public exchangeRate: bigint;

    public timestamp: Date;

    public updateAt: bigint;


    get _name(): string {
        return 'DailySummary';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save DailySummary entity without an ID");
        await store.set('DailySummary', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DailySummary entity without an ID");
        await store.remove('DailySummary', id.toString());
    }

    static async get(id:string): Promise<DailySummary | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DailySummary entity without an ID");
        const record = await store.get('DailySummary', id.toString());
        if (record){
            return this.create(record as DailySummaryProps);
        }else{
            return;
        }
    }



    static create(record: DailySummaryProps): DailySummary {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.toBondPool,
        
            record.exchangeRate,
        
            record.timestamp,
        
            record.updateAt,
        );
        Object.assign(entity,record);
        return entity;
    }
}
