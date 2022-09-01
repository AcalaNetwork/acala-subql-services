// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type ListProvisionProps = Omit<ListProvision, NonNullable<FunctionPropertyNames<ListProvision>>>;

export class ListProvision implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public poolId?: string;

    public token0Id?: string;

    public token1Id?: string;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ListProvision entity without an ID");
        await store.set('ListProvision', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ListProvision entity without an ID");
        await store.remove('ListProvision', id.toString());
    }

    static async get(id:string): Promise<ListProvision | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ListProvision entity without an ID");
        const record = await store.get('ListProvision', id.toString());
        if (record){
            return ListProvision.create(record as ListProvisionProps);
        }else{
            return;
        }
    }


    static async getByPoolId(poolId: string): Promise<ListProvision[] | undefined>{
      
      const records = await store.getByField('ListProvision', 'poolId', poolId);
      return records.map(record => ListProvision.create(record as ListProvisionProps));
      
    }

    static async getByToken0Id(token0Id: string): Promise<ListProvision[] | undefined>{
      
      const records = await store.getByField('ListProvision', 'token0Id', token0Id);
      return records.map(record => ListProvision.create(record as ListProvisionProps));
      
    }

    static async getByToken1Id(token1Id: string): Promise<ListProvision[] | undefined>{
      
      const records = await store.getByField('ListProvision', 'token1Id', token1Id);
      return records.map(record => ListProvision.create(record as ListProvisionProps));
      
    }

    static async getByBlockId(blockId: string): Promise<ListProvision[] | undefined>{
      
      const records = await store.getByField('ListProvision', 'blockId', blockId);
      return records.map(record => ListProvision.create(record as ListProvisionProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<ListProvision[] | undefined>{
      
      const records = await store.getByField('ListProvision', 'extrinsicId', extrinsicId);
      return records.map(record => ListProvision.create(record as ListProvisionProps));
      
    }


    static create(record: ListProvisionProps): ListProvision {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ListProvision(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
