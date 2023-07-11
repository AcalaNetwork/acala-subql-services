// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type HourlySummaryProps = Omit<HourlySummary, NonNullable<FunctionPropertyNames<HourlySummary>>| '_name'>;

export class HourlySummary implements Entity {

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
        return 'HourlySummary';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save HourlySummary entity without an ID");
        await store.set('HourlySummary', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove HourlySummary entity without an ID");
        await store.remove('HourlySummary', id.toString());
    }

    static async get(id:string): Promise<HourlySummary | undefined>{
        assert((id !== null && id !== undefined), "Cannot get HourlySummary entity without an ID");
        const record = await store.get('HourlySummary', id.toString());
        if (record){
            return this.create(record as HourlySummaryProps);
        }else{
            return;
        }
    }



    static create(record: HourlySummaryProps): HourlySummary {
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
