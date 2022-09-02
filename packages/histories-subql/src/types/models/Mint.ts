// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type MintProps = Omit<Mint, NonNullable<FunctionPropertyNames<Mint>>>;

export class Mint implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public type?: string;

    public amountStaked?: bigint;

    public amountMinted?: bigint;

    public stakingCurrencyAmount?: bigint;

    public liquidAmountReceived?: bigint;

    public liquidAmountAddedToVoid?: bigint;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Mint entity without an ID");
        await store.set('Mint', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Mint entity without an ID");
        await store.remove('Mint', id.toString());
    }

    static async get(id:string): Promise<Mint | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Mint entity without an ID");
        const record = await store.get('Mint', id.toString());
        if (record){
            return Mint.create(record as MintProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<Mint[] | undefined>{
      
      const records = await store.getByField('Mint', 'addressId', addressId);
      return records.map(record => Mint.create(record as MintProps));
      
    }

    static async getByBlockId(blockId: string): Promise<Mint[] | undefined>{
      
      const records = await store.getByField('Mint', 'blockId', blockId);
      return records.map(record => Mint.create(record as MintProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<Mint[] | undefined>{
      
      const records = await store.getByField('Mint', 'extrinsicId', extrinsicId);
      return records.map(record => Mint.create(record as MintProps));
      
    }


    static create(record: MintProps): Mint {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Mint(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
