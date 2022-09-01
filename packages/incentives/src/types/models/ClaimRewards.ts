// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type ClaimRewardsProps = Omit<ClaimRewards, NonNullable<FunctionPropertyNames<ClaimRewards>>>;

export class ClaimRewards implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public tokenId?: string;

    public pool?: string;

    public actualAmount?: bigint;

    public deductionAmount?: bigint;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ClaimRewards entity without an ID");
        await store.set('ClaimRewards', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ClaimRewards entity without an ID");
        await store.remove('ClaimRewards', id.toString());
    }

    static async get(id:string): Promise<ClaimRewards | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ClaimRewards entity without an ID");
        const record = await store.get('ClaimRewards', id.toString());
        if (record){
            return ClaimRewards.create(record as ClaimRewardsProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<ClaimRewards[] | undefined>{
      
      const records = await store.getByField('ClaimRewards', 'addressId', addressId);
      return records.map(record => ClaimRewards.create(record as ClaimRewardsProps));
      
    }

    static async getByTokenId(tokenId: string): Promise<ClaimRewards[] | undefined>{
      
      const records = await store.getByField('ClaimRewards', 'tokenId', tokenId);
      return records.map(record => ClaimRewards.create(record as ClaimRewardsProps));
      
    }

    static async getByBlockId(blockId: string): Promise<ClaimRewards[] | undefined>{
      
      const records = await store.getByField('ClaimRewards', 'blockId', blockId);
      return records.map(record => ClaimRewards.create(record as ClaimRewardsProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<ClaimRewards[] | undefined>{
      
      const records = await store.getByField('ClaimRewards', 'extrinsicId', extrinsicId);
      return records.map(record => ClaimRewards.create(record as ClaimRewardsProps));
      
    }


    static create(record: ClaimRewardsProps): ClaimRewards {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ClaimRewards(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
