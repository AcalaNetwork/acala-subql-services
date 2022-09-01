// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type SwapProps = Omit<Swap, NonNullable<FunctionPropertyNames<Swap>>>;

export class Swap implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public poolId?: string;

    public token0Id?: string;

    public token1Id?: string;

    public token0InAmount?: bigint;

    public token1OutAmount?: bigint;

    public tradePath?: string;

    public price0?: bigint;

    public price1?: bigint;

    public amounts?: string;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Swap entity without an ID");
        await store.set('Swap', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Swap entity without an ID");
        await store.remove('Swap', id.toString());
    }

    static async get(id:string): Promise<Swap | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Swap entity without an ID");
        const record = await store.get('Swap', id.toString());
        if (record){
            return Swap.create(record as SwapProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<Swap[] | undefined>{
      
      const records = await store.getByField('Swap', 'addressId', addressId);
      return records.map(record => Swap.create(record as SwapProps));
      
    }

    static async getByPoolId(poolId: string): Promise<Swap[] | undefined>{
      
      const records = await store.getByField('Swap', 'poolId', poolId);
      return records.map(record => Swap.create(record as SwapProps));
      
    }

    static async getByToken0Id(token0Id: string): Promise<Swap[] | undefined>{
      
      const records = await store.getByField('Swap', 'token0Id', token0Id);
      return records.map(record => Swap.create(record as SwapProps));
      
    }

    static async getByToken1Id(token1Id: string): Promise<Swap[] | undefined>{
      
      const records = await store.getByField('Swap', 'token1Id', token1Id);
      return records.map(record => Swap.create(record as SwapProps));
      
    }

    static async getByBlockId(blockId: string): Promise<Swap[] | undefined>{
      
      const records = await store.getByField('Swap', 'blockId', blockId);
      return records.map(record => Swap.create(record as SwapProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<Swap[] | undefined>{
      
      const records = await store.getByField('Swap', 'extrinsicId', extrinsicId);
      return records.map(record => Swap.create(record as SwapProps));
      
    }


    static create(record: SwapProps): Swap {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Swap(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
