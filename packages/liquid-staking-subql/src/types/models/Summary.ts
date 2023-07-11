// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type SummaryProps = Omit<Summary, NonNullable<FunctionPropertyNames<Summary>>| '_name'>;

export class Summary implements Entity {

    constructor(
        
            id: string,
        
            toBondPool: bigint,
        
            bonded: bigint,
        
            liquidIssuance: bigint,
        
            totalVoidLiquid: bigint,
        
            exchangeRate: bigint,
        
        
        
        
    ) {
        
            this.id = id;
        
            this.toBondPool = toBondPool;
        
            this.bonded = bonded;
        
            this.liquidIssuance = liquidIssuance;
        
            this.totalVoidLiquid = totalVoidLiquid;
        
            this.exchangeRate = exchangeRate;
        
    }


    public id: string;

    public toBondPool: bigint;

    public bonded: bigint;

    public liquidIssuance: bigint;

    public totalVoidLiquid: bigint;

    public exchangeRate: bigint;

    public forceUpdateAt?: bigint;

    public updateAt?: bigint;

    public timestamp?: Date;


    get _name(): string {
        return 'Summary';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Summary entity without an ID");
        await store.set('Summary', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Summary entity without an ID");
        await store.remove('Summary', id.toString());
    }

    static async get(id:string): Promise<Summary | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Summary entity without an ID");
        const record = await store.get('Summary', id.toString());
        if (record){
            return this.create(record as SummaryProps);
        }else{
            return;
        }
    }



    static create(record: SummaryProps): Summary {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.toBondPool,
        
            record.bonded,
        
            record.liquidIssuance,
        
            record.totalVoidLiquid,
        
            record.exchangeRate,
        );
        Object.assign(entity,record);
        return entity;
    }
}
