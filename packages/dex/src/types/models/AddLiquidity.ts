// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type AddLiquidityProps = Omit<AddLiquidity, NonNullable<FunctionPropertyNames<AddLiquidity>>>;

export class AddLiquidity implements Entity {

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
        assert(id !== null, "Cannot save AddLiquidity entity without an ID");
        await store.set('AddLiquidity', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove AddLiquidity entity without an ID");
        await store.remove('AddLiquidity', id.toString());
    }

    static async get(id:string): Promise<AddLiquidity | undefined>{
        assert((id !== null && id !== undefined), "Cannot get AddLiquidity entity without an ID");
        const record = await store.get('AddLiquidity', id.toString());
        if (record){
            return AddLiquidity.create(record as AddLiquidityProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<AddLiquidity[] | undefined>{
      
      const records = await store.getByField('AddLiquidity', 'addressId', addressId);
      return records.map(record => AddLiquidity.create(record as AddLiquidityProps));
      
    }

    static async getByPoolId(poolId: string): Promise<AddLiquidity[] | undefined>{
      
      const records = await store.getByField('AddLiquidity', 'poolId', poolId);
      return records.map(record => AddLiquidity.create(record as AddLiquidityProps));
      
    }

    static async getByToken0Id(token0Id: string): Promise<AddLiquidity[] | undefined>{
      
      const records = await store.getByField('AddLiquidity', 'token0Id', token0Id);
      return records.map(record => AddLiquidity.create(record as AddLiquidityProps));
      
    }

    static async getByToken1Id(token1Id: string): Promise<AddLiquidity[] | undefined>{
      
      const records = await store.getByField('AddLiquidity', 'token1Id', token1Id);
      return records.map(record => AddLiquidity.create(record as AddLiquidityProps));
      
    }

    static async getByBlockId(blockId: string): Promise<AddLiquidity[] | undefined>{
      
      const records = await store.getByField('AddLiquidity', 'blockId', blockId);
      return records.map(record => AddLiquidity.create(record as AddLiquidityProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<AddLiquidity[] | undefined>{
      
      const records = await store.getByField('AddLiquidity', 'extrinsicId', extrinsicId);
      return records.map(record => AddLiquidity.create(record as AddLiquidityProps));
      
    }


    static create(record: AddLiquidityProps): AddLiquidity {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new AddLiquidity(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
