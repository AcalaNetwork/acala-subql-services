// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type AddProvisionProps = Omit<AddProvision, NonNullable<FunctionPropertyNames<AddProvision>>>;

export class AddProvision implements Entity {

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

    public price0?: bigint;

    public price1?: bigint;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save AddProvision entity without an ID");
        await store.set('AddProvision', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove AddProvision entity without an ID");
        await store.remove('AddProvision', id.toString());
    }

    static async get(id:string): Promise<AddProvision | undefined>{
        assert((id !== null && id !== undefined), "Cannot get AddProvision entity without an ID");
        const record = await store.get('AddProvision', id.toString());
        if (record){
            return AddProvision.create(record as AddProvisionProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<AddProvision[] | undefined>{
      
      const records = await store.getByField('AddProvision', 'addressId', addressId);
      return records.map(record => AddProvision.create(record as AddProvisionProps));
      
    }

    static async getByPoolId(poolId: string): Promise<AddProvision[] | undefined>{
      
      const records = await store.getByField('AddProvision', 'poolId', poolId);
      return records.map(record => AddProvision.create(record as AddProvisionProps));
      
    }

    static async getByToken0Id(token0Id: string): Promise<AddProvision[] | undefined>{
      
      const records = await store.getByField('AddProvision', 'token0Id', token0Id);
      return records.map(record => AddProvision.create(record as AddProvisionProps));
      
    }

    static async getByToken1Id(token1Id: string): Promise<AddProvision[] | undefined>{
      
      const records = await store.getByField('AddProvision', 'token1Id', token1Id);
      return records.map(record => AddProvision.create(record as AddProvisionProps));
      
    }

    static async getByBlockId(blockId: string): Promise<AddProvision[] | undefined>{
      
      const records = await store.getByField('AddProvision', 'blockId', blockId);
      return records.map(record => AddProvision.create(record as AddProvisionProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<AddProvision[] | undefined>{
      
      const records = await store.getByField('AddProvision', 'extrinsicId', extrinsicId);
      return records.map(record => AddProvision.create(record as AddProvisionProps));
      
    }


    static create(record: AddProvisionProps): AddProvision {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new AddProvision(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
