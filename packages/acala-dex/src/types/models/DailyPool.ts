// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type DailyPoolProps = Omit<DailyPool, NonNullable<FunctionPropertyNames<DailyPool>>>;

export class DailyPool implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public poolId?: string;

    public timestamp?: Date;

    public token0Id?: string;

    public token1Id?: string;

    public token0Amount?: bigint;

    public token1Amount?: bigint;

    public token0Price?: bigint;

    public token1Price?: bigint;

    public feeRateUSD?: bigint;

    public feeToken0Amount?: bigint;

    public feeToken1Amount?: bigint;

    public dailyToken0TradeVolume?: bigint;

    public dailyToken1TradeVolume?: bigint;

    public dailyTradeVolumeUSD?: bigint;

    public token0TradeVolume?: bigint;

    public token1TradeVolume?: bigint;

    public tradeVolumeUSD?: bigint;

    public token0TVL?: bigint;

    public token1TVL?: bigint;

    public totalTVL?: bigint;

    public txCount?: bigint;

    public token0Open?: bigint;

    public token0High?: bigint;

    public token0Low?: bigint;

    public token0Close?: bigint;

    public token1Open?: bigint;

    public token1High?: bigint;

    public token1Low?: bigint;

    public token1Close?: bigint;

    public updateAtBlockId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save DailyPool entity without an ID");
        await store.set('DailyPool', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DailyPool entity without an ID");
        await store.remove('DailyPool', id.toString());
    }

    static async get(id:string): Promise<DailyPool | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DailyPool entity without an ID");
        const record = await store.get('DailyPool', id.toString());
        if (record){
            return DailyPool.create(record as DailyPoolProps);
        }else{
            return;
        }
    }


    static async getByPoolId(poolId: string): Promise<DailyPool[] | undefined>{
      
      const records = await store.getByField('DailyPool', 'poolId', poolId);
      return records.map(record => DailyPool.create(record as DailyPoolProps));
      
    }

    static async getByToken0Id(token0Id: string): Promise<DailyPool[] | undefined>{
      
      const records = await store.getByField('DailyPool', 'token0Id', token0Id);
      return records.map(record => DailyPool.create(record as DailyPoolProps));
      
    }

    static async getByToken1Id(token1Id: string): Promise<DailyPool[] | undefined>{
      
      const records = await store.getByField('DailyPool', 'token1Id', token1Id);
      return records.map(record => DailyPool.create(record as DailyPoolProps));
      
    }

    static async getByUpdateAtBlockId(updateAtBlockId: string): Promise<DailyPool[] | undefined>{
      
      const records = await store.getByField('DailyPool', 'updateAtBlockId', updateAtBlockId);
      return records.map(record => DailyPool.create(record as DailyPoolProps));
      
    }


    static create(record: DailyPoolProps): DailyPool {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new DailyPool(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
