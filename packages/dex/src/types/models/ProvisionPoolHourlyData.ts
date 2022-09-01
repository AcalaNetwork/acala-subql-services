// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type ProvisionPoolHourlyDataProps = Omit<ProvisionPoolHourlyData, NonNullable<FunctionPropertyNames<ProvisionPoolHourlyData>>>;

export class ProvisionPoolHourlyData implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public poolId?: string;

    public token0Amount?: bigint;

    public token1Amount?: bigint;

    public price0?: bigint;

    public price1?: bigint;

    public hourlyToken0InAmount?: bigint;

    public hourlyToken1InAmount?: bigint;

    public timestamp?: Date;

    public updateAtBlockId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ProvisionPoolHourlyData entity without an ID");
        await store.set('ProvisionPoolHourlyData', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ProvisionPoolHourlyData entity without an ID");
        await store.remove('ProvisionPoolHourlyData', id.toString());
    }

    static async get(id:string): Promise<ProvisionPoolHourlyData | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ProvisionPoolHourlyData entity without an ID");
        const record = await store.get('ProvisionPoolHourlyData', id.toString());
        if (record){
            return ProvisionPoolHourlyData.create(record as ProvisionPoolHourlyDataProps);
        }else{
            return;
        }
    }


    static async getByPoolId(poolId: string): Promise<ProvisionPoolHourlyData[] | undefined>{
      
      const records = await store.getByField('ProvisionPoolHourlyData', 'poolId', poolId);
      return records.map(record => ProvisionPoolHourlyData.create(record as ProvisionPoolHourlyDataProps));
      
    }

    static async getByUpdateAtBlockId(updateAtBlockId: string): Promise<ProvisionPoolHourlyData[] | undefined>{
      
      const records = await store.getByField('ProvisionPoolHourlyData', 'updateAtBlockId', updateAtBlockId);
      return records.map(record => ProvisionPoolHourlyData.create(record as ProvisionPoolHourlyDataProps));
      
    }


    static create(record: ProvisionPoolHourlyDataProps): ProvisionPoolHourlyData {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ProvisionPoolHourlyData(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
