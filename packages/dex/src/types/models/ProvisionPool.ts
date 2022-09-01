// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type ProvisionPoolProps = Omit<ProvisionPool, NonNullable<FunctionPropertyNames<ProvisionPool>>>;

export class ProvisionPool implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public token0Id?: string;

    public token1Id?: string;

    public token0Amount?: bigint;

    public token1Amount?: bigint;

    public initializeShare?: bigint;

    public startAt?: Date;

    public startAtBlockId?: string;

    public endAt?: Date;

    public endAtBlockId?: string;

    public txCount?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ProvisionPool entity without an ID");
        await store.set('ProvisionPool', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ProvisionPool entity without an ID");
        await store.remove('ProvisionPool', id.toString());
    }

    static async get(id:string): Promise<ProvisionPool | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ProvisionPool entity without an ID");
        const record = await store.get('ProvisionPool', id.toString());
        if (record){
            return ProvisionPool.create(record as ProvisionPoolProps);
        }else{
            return;
        }
    }


    static async getByToken0Id(token0Id: string): Promise<ProvisionPool[] | undefined>{
      
      const records = await store.getByField('ProvisionPool', 'token0Id', token0Id);
      return records.map(record => ProvisionPool.create(record as ProvisionPoolProps));
      
    }

    static async getByToken1Id(token1Id: string): Promise<ProvisionPool[] | undefined>{
      
      const records = await store.getByField('ProvisionPool', 'token1Id', token1Id);
      return records.map(record => ProvisionPool.create(record as ProvisionPoolProps));
      
    }

    static async getByStartAtBlockId(startAtBlockId: string): Promise<ProvisionPool[] | undefined>{
      
      const records = await store.getByField('ProvisionPool', 'startAtBlockId', startAtBlockId);
      return records.map(record => ProvisionPool.create(record as ProvisionPoolProps));
      
    }

    static async getByEndAtBlockId(endAtBlockId: string): Promise<ProvisionPool[] | undefined>{
      
      const records = await store.getByField('ProvisionPool', 'endAtBlockId', endAtBlockId);
      return records.map(record => ProvisionPool.create(record as ProvisionPoolProps));
      
    }


    static create(record: ProvisionPoolProps): ProvisionPool {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ProvisionPool(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
