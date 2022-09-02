// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type RateProps = Omit<Rate, NonNullable<FunctionPropertyNames<Rate>>>;

export class Rate implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public totalStaking?: bigint;

    public totalLiquidity?: bigint;

    public totalVoidLiquid?: bigint;

    public exchangeRate?: bigint;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Rate entity without an ID");
        await store.set('Rate', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Rate entity without an ID");
        await store.remove('Rate', id.toString());
    }

    static async get(id:string): Promise<Rate | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Rate entity without an ID");
        const record = await store.get('Rate', id.toString());
        if (record){
            return Rate.create(record as RateProps);
        }else{
            return;
        }
    }


    static async getByBlockId(blockId: string): Promise<Rate[] | undefined>{
      
      const records = await store.getByField('Rate', 'blockId', blockId);
      return records.map(record => Rate.create(record as RateProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<Rate[] | undefined>{
      
      const records = await store.getByField('Rate', 'extrinsicId', extrinsicId);
      return records.map(record => Rate.create(record as RateProps));
      
    }


    static create(record: RateProps): Rate {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Rate(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
