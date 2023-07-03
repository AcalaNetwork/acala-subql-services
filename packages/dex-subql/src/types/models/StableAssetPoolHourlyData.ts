// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type StableAssetPoolHourlyDataProps = Omit<StableAssetPoolHourlyData, NonNullable<FunctionPropertyNames<StableAssetPoolHourlyData>>>;

export class StableAssetPoolHourlyData implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public poolId?: number;

    public totalTx?: number;

    public timestamp?: Date;

    public token0Id?: string;

    public token1Id?: string;

    public hourlyToken0TradeVolume?: bigint;

    public hourlyToken1TradeVolume?: bigint;

    public lastPrice?: bigint;

    public priceHigh?: bigint;

    public priceLow?: bigint;

    public updateAtBlockId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save StableAssetPoolHourlyData entity without an ID");
        await store.set('StableAssetPoolHourlyData', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove StableAssetPoolHourlyData entity without an ID");
        await store.remove('StableAssetPoolHourlyData', id.toString());
    }

    static async get(id:string): Promise<StableAssetPoolHourlyData | undefined>{
        assert((id !== null && id !== undefined), "Cannot get StableAssetPoolHourlyData entity without an ID");
        const record = await store.get('StableAssetPoolHourlyData', id.toString());
        if (record){
            return StableAssetPoolHourlyData.create(record as StableAssetPoolHourlyDataProps);
        }else{
            return;
        }
    }


    static async getByToken0Id(token0Id: string): Promise<StableAssetPoolHourlyData[] | undefined>{
      
      const records = await store.getByField('StableAssetPoolHourlyData', 'token0Id', token0Id);
      return records.map(record => StableAssetPoolHourlyData.create(record as StableAssetPoolHourlyDataProps));
      
    }

    static async getByToken1Id(token1Id: string): Promise<StableAssetPoolHourlyData[] | undefined>{
      
      const records = await store.getByField('StableAssetPoolHourlyData', 'token1Id', token1Id);
      return records.map(record => StableAssetPoolHourlyData.create(record as StableAssetPoolHourlyDataProps));
      
    }

    static async getByUpdateAtBlockId(updateAtBlockId: string): Promise<StableAssetPoolHourlyData[] | undefined>{
      
      const records = await store.getByField('StableAssetPoolHourlyData', 'updateAtBlockId', updateAtBlockId);
      return records.map(record => StableAssetPoolHourlyData.create(record as StableAssetPoolHourlyDataProps));
      
    }


    static create(record: StableAssetPoolHourlyDataProps): StableAssetPoolHourlyData {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new StableAssetPoolHourlyData(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
