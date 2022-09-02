// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type DailyDexProps = Omit<DailyDex, NonNullable<FunctionPropertyNames<DailyDex>>>;

export class DailyDex implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public poolCount?: number;

    public dailyTradeVolumeUSD?: bigint;

    public tradeVolumeUSD?: bigint;

    public totalTVL?: bigint;

    public timestamp?: Date;

    public updateAtBlockId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save DailyDex entity without an ID");
        await store.set('DailyDex', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DailyDex entity without an ID");
        await store.remove('DailyDex', id.toString());
    }

    static async get(id:string): Promise<DailyDex | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DailyDex entity without an ID");
        const record = await store.get('DailyDex', id.toString());
        if (record){
            return DailyDex.create(record as DailyDexProps);
        }else{
            return;
        }
    }


    static async getByUpdateAtBlockId(updateAtBlockId: string): Promise<DailyDex[] | undefined>{
      
      const records = await store.getByField('DailyDex', 'updateAtBlockId', updateAtBlockId);
      return records.map(record => DailyDex.create(record as DailyDexProps));
      
    }


    static create(record: DailyDexProps): DailyDex {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new DailyDex(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
