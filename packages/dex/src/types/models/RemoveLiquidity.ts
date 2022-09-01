// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type RemoveLiquidityProps = Omit<RemoveLiquidity, NonNullable<FunctionPropertyNames<RemoveLiquidity>>>;

export class RemoveLiquidity implements Entity {

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

    public shareAmount?: bigint;

    public price0?: bigint;

    public price1?: bigint;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save RemoveLiquidity entity without an ID");
        await store.set('RemoveLiquidity', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove RemoveLiquidity entity without an ID");
        await store.remove('RemoveLiquidity', id.toString());
    }

    static async get(id:string): Promise<RemoveLiquidity | undefined>{
        assert((id !== null && id !== undefined), "Cannot get RemoveLiquidity entity without an ID");
        const record = await store.get('RemoveLiquidity', id.toString());
        if (record){
            return RemoveLiquidity.create(record as RemoveLiquidityProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<RemoveLiquidity[] | undefined>{
      
      const records = await store.getByField('RemoveLiquidity', 'addressId', addressId);
      return records.map(record => RemoveLiquidity.create(record as RemoveLiquidityProps));
      
    }

    static async getByPoolId(poolId: string): Promise<RemoveLiquidity[] | undefined>{
      
      const records = await store.getByField('RemoveLiquidity', 'poolId', poolId);
      return records.map(record => RemoveLiquidity.create(record as RemoveLiquidityProps));
      
    }

    static async getByToken0Id(token0Id: string): Promise<RemoveLiquidity[] | undefined>{
      
      const records = await store.getByField('RemoveLiquidity', 'token0Id', token0Id);
      return records.map(record => RemoveLiquidity.create(record as RemoveLiquidityProps));
      
    }

    static async getByToken1Id(token1Id: string): Promise<RemoveLiquidity[] | undefined>{
      
      const records = await store.getByField('RemoveLiquidity', 'token1Id', token1Id);
      return records.map(record => RemoveLiquidity.create(record as RemoveLiquidityProps));
      
    }

    static async getByBlockId(blockId: string): Promise<RemoveLiquidity[] | undefined>{
      
      const records = await store.getByField('RemoveLiquidity', 'blockId', blockId);
      return records.map(record => RemoveLiquidity.create(record as RemoveLiquidityProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<RemoveLiquidity[] | undefined>{
      
      const records = await store.getByField('RemoveLiquidity', 'extrinsicId', extrinsicId);
      return records.map(record => RemoveLiquidity.create(record as RemoveLiquidityProps));
      
    }


    static create(record: RemoveLiquidityProps): RemoveLiquidity {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new RemoveLiquidity(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
