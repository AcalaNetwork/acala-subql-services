// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type HourlyPoolProps = Omit<HourlyPool, NonNullable<FunctionPropertyNames<HourlyPool>>>;

export class HourlyPool implements Entity {

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

    public hourlyToken0TradeVolume?: bigint;

    public hourlyToken1TradeVolume?: bigint;

    public hourlyTradeVolumeUSD?: bigint;

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
        assert(id !== null, "Cannot save HourlyPool entity without an ID");
        await store.set('HourlyPool', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove HourlyPool entity without an ID");
        await store.remove('HourlyPool', id.toString());
    }

    static async get(id:string): Promise<HourlyPool | undefined>{
        assert((id !== null && id !== undefined), "Cannot get HourlyPool entity without an ID");
        const record = await store.get('HourlyPool', id.toString());
        if (record){
            return HourlyPool.create(record as HourlyPoolProps);
        }else{
            return;
        }
    }


    static async getByPoolId(poolId: string): Promise<HourlyPool[] | undefined>{
      
      const records = await store.getByField('HourlyPool', 'poolId', poolId);
      return records.map(record => HourlyPool.create(record as HourlyPoolProps));
      
    }

    static async getByToken0Id(token0Id: string): Promise<HourlyPool[] | undefined>{
      
      const records = await store.getByField('HourlyPool', 'token0Id', token0Id);
      return records.map(record => HourlyPool.create(record as HourlyPoolProps));
      
    }

    static async getByToken1Id(token1Id: string): Promise<HourlyPool[] | undefined>{
      
      const records = await store.getByField('HourlyPool', 'token1Id', token1Id);
      return records.map(record => HourlyPool.create(record as HourlyPoolProps));
      
    }

    static async getByUpdateAtBlockId(updateAtBlockId: string): Promise<HourlyPool[] | undefined>{
      
      const records = await store.getByField('HourlyPool', 'updateAtBlockId', updateAtBlockId);
      return records.map(record => HourlyPool.create(record as HourlyPoolProps));
      
    }


    static create(record: HourlyPoolProps): HourlyPool {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new HourlyPool(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
