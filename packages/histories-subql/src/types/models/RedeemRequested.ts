// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type RedeemRequestedProps = Omit<RedeemRequested, NonNullable<FunctionPropertyNames<RedeemRequested>>>;

export class RedeemRequested implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public amount?: bigint;

    public extraFee?: bigint;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save RedeemRequested entity without an ID");
        await store.set('RedeemRequested', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove RedeemRequested entity without an ID");
        await store.remove('RedeemRequested', id.toString());
    }

    static async get(id:string): Promise<RedeemRequested | undefined>{
        assert((id !== null && id !== undefined), "Cannot get RedeemRequested entity without an ID");
        const record = await store.get('RedeemRequested', id.toString());
        if (record){
            return RedeemRequested.create(record as RedeemRequestedProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<RedeemRequested[] | undefined>{
      
      const records = await store.getByField('RedeemRequested', 'addressId', addressId);
      return records.map(record => RedeemRequested.create(record as RedeemRequestedProps));
      
    }

    static async getByBlockId(blockId: string): Promise<RedeemRequested[] | undefined>{
      
      const records = await store.getByField('RedeemRequested', 'blockId', blockId);
      return records.map(record => RedeemRequested.create(record as RedeemRequestedProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<RedeemRequested[] | undefined>{
      
      const records = await store.getByField('RedeemRequested', 'extrinsicId', extrinsicId);
      return records.map(record => RedeemRequested.create(record as RedeemRequestedProps));
      
    }


    static create(record: RedeemRequestedProps): RedeemRequested {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new RedeemRequested(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
