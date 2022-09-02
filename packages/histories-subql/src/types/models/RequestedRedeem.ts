// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type RequestedRedeemProps = Omit<RequestedRedeem, NonNullable<FunctionPropertyNames<RequestedRedeem>>>;

export class RequestedRedeem implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public amount?: bigint;

    public allowFastMatch?: boolean;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save RequestedRedeem entity without an ID");
        await store.set('RequestedRedeem', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove RequestedRedeem entity without an ID");
        await store.remove('RequestedRedeem', id.toString());
    }

    static async get(id:string): Promise<RequestedRedeem | undefined>{
        assert((id !== null && id !== undefined), "Cannot get RequestedRedeem entity without an ID");
        const record = await store.get('RequestedRedeem', id.toString());
        if (record){
            return RequestedRedeem.create(record as RequestedRedeemProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<RequestedRedeem[] | undefined>{
      
      const records = await store.getByField('RequestedRedeem', 'addressId', addressId);
      return records.map(record => RequestedRedeem.create(record as RequestedRedeemProps));
      
    }

    static async getByBlockId(blockId: string): Promise<RequestedRedeem[] | undefined>{
      
      const records = await store.getByField('RequestedRedeem', 'blockId', blockId);
      return records.map(record => RequestedRedeem.create(record as RequestedRedeemProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<RequestedRedeem[] | undefined>{
      
      const records = await store.getByField('RequestedRedeem', 'extrinsicId', extrinsicId);
      return records.map(record => RequestedRedeem.create(record as RequestedRedeemProps));
      
    }


    static create(record: RequestedRedeemProps): RequestedRedeem {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new RequestedRedeem(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
