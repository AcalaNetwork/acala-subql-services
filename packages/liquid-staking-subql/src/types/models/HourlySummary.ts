// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type HourlySummaryProps = Omit<HourlySummary, NonNullable<FunctionPropertyNames<HourlySummary>>>;

export class HourlySummary implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public toBondPool: bigint;

    public bonded?: bigint;

    public liquidIssuance?: bigint;

    public totalVoidLiquid?: bigint;

    public timestamp: Date;


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
            return HourlySummary.create(record as HourlySummaryProps);
        }else{
            return;
        }
    }



    static create(record: HourlySummaryProps): HourlySummary {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new HourlySummary(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
