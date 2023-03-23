// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type SummaryProps = Omit<Summary, NonNullable<FunctionPropertyNames<Summary>>>;

export class Summary implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public toBondPool: bigint;

    public bonded: bigint;

    public liquidIssuance: bigint;

    public totalVoidLiquid: bigint;

    public forceUpdateAt?: bigint;

    public updateAt?: bigint;

    public timestamp?: Date;


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
            return Summary.create(record as SummaryProps);
        }else{
            return;
        }
    }



    static create(record: SummaryProps): Summary {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Summary(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
