// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type PayoutRewardsProps = Omit<PayoutRewards, NonNullable<FunctionPropertyNames<PayoutRewards>>>;

export class PayoutRewards implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public tokenId?: string;

    public pool?: string;

    public rewardCurrencyTypeId?: string;

    public actualPayout?: bigint;

    public deductionAmount?: bigint;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save PayoutRewards entity without an ID");
        await store.set('PayoutRewards', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove PayoutRewards entity without an ID");
        await store.remove('PayoutRewards', id.toString());
    }

    static async get(id:string): Promise<PayoutRewards | undefined>{
        assert((id !== null && id !== undefined), "Cannot get PayoutRewards entity without an ID");
        const record = await store.get('PayoutRewards', id.toString());
        if (record){
            return PayoutRewards.create(record as PayoutRewardsProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<PayoutRewards[] | undefined>{
      
      const records = await store.getByField('PayoutRewards', 'addressId', addressId);
      return records.map(record => PayoutRewards.create(record as PayoutRewardsProps));
      
    }

    static async getByTokenId(tokenId: string): Promise<PayoutRewards[] | undefined>{
      
      const records = await store.getByField('PayoutRewards', 'tokenId', tokenId);
      return records.map(record => PayoutRewards.create(record as PayoutRewardsProps));
      
    }

    static async getByRewardCurrencyTypeId(rewardCurrencyTypeId: string): Promise<PayoutRewards[] | undefined>{
      
      const records = await store.getByField('PayoutRewards', 'rewardCurrencyTypeId', rewardCurrencyTypeId);
      return records.map(record => PayoutRewards.create(record as PayoutRewardsProps));
      
    }

    static async getByBlockId(blockId: string): Promise<PayoutRewards[] | undefined>{
      
      const records = await store.getByField('PayoutRewards', 'blockId', blockId);
      return records.map(record => PayoutRewards.create(record as PayoutRewardsProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<PayoutRewards[] | undefined>{
      
      const records = await store.getByField('PayoutRewards', 'extrinsicId', extrinsicId);
      return records.map(record => PayoutRewards.create(record as PayoutRewardsProps));
      
    }


    static create(record: PayoutRewardsProps): PayoutRewards {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new PayoutRewards(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
