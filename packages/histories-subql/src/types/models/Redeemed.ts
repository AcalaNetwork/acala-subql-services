// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type RedeemedProps = Omit<Redeemed, NonNullable<FunctionPropertyNames<Redeemed>>>;

export class Redeemed implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public stakingAmountRedeemed?: bigint;

    public liquidAmountDeducted?: bigint;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Redeemed entity without an ID");
        await store.set('Redeemed', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Redeemed entity without an ID");
        await store.remove('Redeemed', id.toString());
    }

    static async get(id:string): Promise<Redeemed | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Redeemed entity without an ID");
        const record = await store.get('Redeemed', id.toString());
        if (record){
            return Redeemed.create(record as RedeemedProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<Redeemed[] | undefined>{
      
      const records = await store.getByField('Redeemed', 'addressId', addressId);
      return records.map(record => Redeemed.create(record as RedeemedProps));
      
    }

    static async getByBlockId(blockId: string): Promise<Redeemed[] | undefined>{
      
      const records = await store.getByField('Redeemed', 'blockId', blockId);
      return records.map(record => Redeemed.create(record as RedeemedProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<Redeemed[] | undefined>{
      
      const records = await store.getByField('Redeemed', 'extrinsicId', extrinsicId);
      return records.map(record => Redeemed.create(record as RedeemedProps));
      
    }


    static create(record: RedeemedProps): Redeemed {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Redeemed(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
