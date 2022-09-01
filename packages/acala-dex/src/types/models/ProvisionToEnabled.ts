// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type ProvisionToEnabledProps = Omit<ProvisionToEnabled, NonNullable<FunctionPropertyNames<ProvisionToEnabled>>>;

export class ProvisionToEnabled implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public poolId?: string;

    public token0Id?: string;

    public token1Id?: string;

    public token0Amount?: bigint;

    public token1Amount?: bigint;

    public totalShareAmount?: bigint;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ProvisionToEnabled entity without an ID");
        await store.set('ProvisionToEnabled', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ProvisionToEnabled entity without an ID");
        await store.remove('ProvisionToEnabled', id.toString());
    }

    static async get(id:string): Promise<ProvisionToEnabled | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ProvisionToEnabled entity without an ID");
        const record = await store.get('ProvisionToEnabled', id.toString());
        if (record){
            return ProvisionToEnabled.create(record as ProvisionToEnabledProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<ProvisionToEnabled[] | undefined>{
      
      const records = await store.getByField('ProvisionToEnabled', 'addressId', addressId);
      return records.map(record => ProvisionToEnabled.create(record as ProvisionToEnabledProps));
      
    }

    static async getByPoolId(poolId: string): Promise<ProvisionToEnabled[] | undefined>{
      
      const records = await store.getByField('ProvisionToEnabled', 'poolId', poolId);
      return records.map(record => ProvisionToEnabled.create(record as ProvisionToEnabledProps));
      
    }

    static async getByToken0Id(token0Id: string): Promise<ProvisionToEnabled[] | undefined>{
      
      const records = await store.getByField('ProvisionToEnabled', 'token0Id', token0Id);
      return records.map(record => ProvisionToEnabled.create(record as ProvisionToEnabledProps));
      
    }

    static async getByToken1Id(token1Id: string): Promise<ProvisionToEnabled[] | undefined>{
      
      const records = await store.getByField('ProvisionToEnabled', 'token1Id', token1Id);
      return records.map(record => ProvisionToEnabled.create(record as ProvisionToEnabledProps));
      
    }

    static async getByBlockId(blockId: string): Promise<ProvisionToEnabled[] | undefined>{
      
      const records = await store.getByField('ProvisionToEnabled', 'blockId', blockId);
      return records.map(record => ProvisionToEnabled.create(record as ProvisionToEnabledProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<ProvisionToEnabled[] | undefined>{
      
      const records = await store.getByField('ProvisionToEnabled', 'extrinsicId', extrinsicId);
      return records.map(record => ProvisionToEnabled.create(record as ProvisionToEnabledProps));
      
    }


    static create(record: ProvisionToEnabledProps): ProvisionToEnabled {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ProvisionToEnabled(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
