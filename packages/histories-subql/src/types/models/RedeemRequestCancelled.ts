// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type RedeemRequestCancelledProps = Omit<RedeemRequestCancelled, NonNullable<FunctionPropertyNames<RedeemRequestCancelled>>>;

export class RedeemRequestCancelled implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public amount?: bigint;

    public blockNumber: bigint;

    public blockHash: string;

    public extrinsic?: string;

    public timestamp?: Date;

    public eventIndex?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save RedeemRequestCancelled entity without an ID");
        await store.set('RedeemRequestCancelled', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove RedeemRequestCancelled entity without an ID");
        await store.remove('RedeemRequestCancelled', id.toString());
    }

    static async get(id:string): Promise<RedeemRequestCancelled | undefined>{
        assert((id !== null && id !== undefined), "Cannot get RedeemRequestCancelled entity without an ID");
        const record = await store.get('RedeemRequestCancelled', id.toString());
        if (record){
            return RedeemRequestCancelled.create(record as RedeemRequestCancelledProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<RedeemRequestCancelled[] | undefined>{
      
      const records = await store.getByField('RedeemRequestCancelled', 'addressId', addressId);
      return records.map(record => RedeemRequestCancelled.create(record as RedeemRequestCancelledProps));
      
    }


    static create(record: RedeemRequestCancelledProps): RedeemRequestCancelled {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new RedeemRequestCancelled(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
