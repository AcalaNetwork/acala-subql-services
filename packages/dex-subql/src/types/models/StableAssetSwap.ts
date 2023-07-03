// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type StableAssetSwapProps = Omit<StableAssetSwap, NonNullable<FunctionPropertyNames<StableAssetSwap>>>;

export class StableAssetSwap implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public poolId: number;

    public a?: number;

    public inputTokenId?: string;

    public outputTokenId?: string;

    public inputAmount?: bigint;

    public minOutputAmount?: bigint;

    public balances?: string;

    public totalSupply?: bigint;

    public yieldAmount?: bigint;

    public feeAmount?: bigint;

    public outputAmount?: bigint;

    public price?: bigint;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;

    public exchangeRate: number;

    public totalStaking: bigint;

    public totalLiquidity: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save StableAssetSwap entity without an ID");
        await store.set('StableAssetSwap', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove StableAssetSwap entity without an ID");
        await store.remove('StableAssetSwap', id.toString());
    }

    static async get(id:string): Promise<StableAssetSwap | undefined>{
        assert((id !== null && id !== undefined), "Cannot get StableAssetSwap entity without an ID");
        const record = await store.get('StableAssetSwap', id.toString());
        if (record){
            return StableAssetSwap.create(record as StableAssetSwapProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<StableAssetSwap[] | undefined>{
      
      const records = await store.getByField('StableAssetSwap', 'addressId', addressId);
      return records.map(record => StableAssetSwap.create(record as StableAssetSwapProps));
      
    }

    static async getByBlockId(blockId: string): Promise<StableAssetSwap[] | undefined>{
      
      const records = await store.getByField('StableAssetSwap', 'blockId', blockId);
      return records.map(record => StableAssetSwap.create(record as StableAssetSwapProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<StableAssetSwap[] | undefined>{
      
      const records = await store.getByField('StableAssetSwap', 'extrinsicId', extrinsicId);
      return records.map(record => StableAssetSwap.create(record as StableAssetSwapProps));
      
    }


    static create(record: StableAssetSwapProps): StableAssetSwap {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new StableAssetSwap(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
