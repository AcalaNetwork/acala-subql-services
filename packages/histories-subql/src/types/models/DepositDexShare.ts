// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type DepositDexShareProps = Omit<DepositDexShare, NonNullable<FunctionPropertyNames<DepositDexShare>>>;

export class DepositDexShare implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public tokenId?: string;

    public amount?: bigint;

    public blockNumber: bigint;

    public blockHash: string;

    public extrinsic?: string;

    public timestamp?: Date;

    public eventIndex?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save DepositDexShare entity without an ID");
        await store.set('DepositDexShare', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DepositDexShare entity without an ID");
        await store.remove('DepositDexShare', id.toString());
    }

    static async get(id:string): Promise<DepositDexShare | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DepositDexShare entity without an ID");
        const record = await store.get('DepositDexShare', id.toString());
        if (record){
            return DepositDexShare.create(record as DepositDexShareProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<DepositDexShare[] | undefined>{
      
      const records = await store.getByField('DepositDexShare', 'addressId', addressId);
      return records.map(record => DepositDexShare.create(record as DepositDexShareProps));
      
    }

    static async getByTokenId(tokenId: string): Promise<DepositDexShare[] | undefined>{
      
      const records = await store.getByField('DepositDexShare', 'tokenId', tokenId);
      return records.map(record => DepositDexShare.create(record as DepositDexShareProps));
      
    }


    static create(record: DepositDexShareProps): DepositDexShare {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new DepositDexShare(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
