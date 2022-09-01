// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type WithdrawDexShareProps = Omit<WithdrawDexShare, NonNullable<FunctionPropertyNames<WithdrawDexShare>>>;

export class WithdrawDexShare implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public tokenId?: string;

    public amount?: bigint;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save WithdrawDexShare entity without an ID");
        await store.set('WithdrawDexShare', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove WithdrawDexShare entity without an ID");
        await store.remove('WithdrawDexShare', id.toString());
    }

    static async get(id:string): Promise<WithdrawDexShare | undefined>{
        assert((id !== null && id !== undefined), "Cannot get WithdrawDexShare entity without an ID");
        const record = await store.get('WithdrawDexShare', id.toString());
        if (record){
            return WithdrawDexShare.create(record as WithdrawDexShareProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<WithdrawDexShare[] | undefined>{
      
      const records = await store.getByField('WithdrawDexShare', 'addressId', addressId);
      return records.map(record => WithdrawDexShare.create(record as WithdrawDexShareProps));
      
    }

    static async getByTokenId(tokenId: string): Promise<WithdrawDexShare[] | undefined>{
      
      const records = await store.getByField('WithdrawDexShare', 'tokenId', tokenId);
      return records.map(record => WithdrawDexShare.create(record as WithdrawDexShareProps));
      
    }

    static async getByBlockId(blockId: string): Promise<WithdrawDexShare[] | undefined>{
      
      const records = await store.getByField('WithdrawDexShare', 'blockId', blockId);
      return records.map(record => WithdrawDexShare.create(record as WithdrawDexShareProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<WithdrawDexShare[] | undefined>{
      
      const records = await store.getByField('WithdrawDexShare', 'extrinsicId', extrinsicId);
      return records.map(record => WithdrawDexShare.create(record as WithdrawDexShareProps));
      
    }


    static create(record: WithdrawDexShareProps): WithdrawDexShare {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new WithdrawDexShare(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
