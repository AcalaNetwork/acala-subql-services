// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type PoolProps = Omit<Pool, NonNullable<FunctionPropertyNames<Pool>>>;

export class Pool implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public token0Id?: string;

    public token1Id?: string;

    public token0Amount?: bigint;

    public token1Amount?: bigint;

    public token0Price?: bigint;

    public token1Price?: bigint;

    public feeRate?: bigint;

    public feeToken0Amount?: bigint;

    public feeToken1Amount?: bigint;

    public token0TradeVolume?: bigint;

    public token1TradeVolume?: bigint;

    public tradeVolumeUSD?: bigint;

    public token0TVL?: bigint;

    public token1TVL?: bigint;

    public totalTVL?: bigint;

    public txCount?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Pool entity without an ID");
        await store.set('Pool', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Pool entity without an ID");
        await store.remove('Pool', id.toString());
    }

    static async get(id:string): Promise<Pool | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Pool entity without an ID");
        const record = await store.get('Pool', id.toString());
        if (record){
            return Pool.create(record as PoolProps);
        }else{
            return;
        }
    }


    static async getByToken0Id(token0Id: string): Promise<Pool[] | undefined>{
      
      const records = await store.getByField('Pool', 'token0Id', token0Id);
      return records.map(record => Pool.create(record as PoolProps));
      
    }

    static async getByToken1Id(token1Id: string): Promise<Pool[] | undefined>{
      
      const records = await store.getByField('Pool', 'token1Id', token1Id);
      return records.map(record => Pool.create(record as PoolProps));
      
    }


    static create(record: PoolProps): Pool {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Pool(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
