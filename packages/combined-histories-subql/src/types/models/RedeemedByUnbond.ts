// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type RedeemedByUnbondProps = Omit<RedeemedByUnbond, NonNullable<FunctionPropertyNames<RedeemedByUnbond>>>;

export class RedeemedByUnbond implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public eraIndexWhenUnbond?: bigint;

    public liquidAmount?: bigint;

    public unbondingStakingAmount?: bigint;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save RedeemedByUnbond entity without an ID");
        await store.set('RedeemedByUnbond', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove RedeemedByUnbond entity without an ID");
        await store.remove('RedeemedByUnbond', id.toString());
    }

    static async get(id:string): Promise<RedeemedByUnbond | undefined>{
        assert((id !== null && id !== undefined), "Cannot get RedeemedByUnbond entity without an ID");
        const record = await store.get('RedeemedByUnbond', id.toString());
        if (record){
            return RedeemedByUnbond.create(record as RedeemedByUnbondProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<RedeemedByUnbond[] | undefined>{
      
      const records = await store.getByField('RedeemedByUnbond', 'addressId', addressId);
      return records.map(record => RedeemedByUnbond.create(record as RedeemedByUnbondProps));
      
    }

    static async getByBlockId(blockId: string): Promise<RedeemedByUnbond[] | undefined>{
      
      const records = await store.getByField('RedeemedByUnbond', 'blockId', blockId);
      return records.map(record => RedeemedByUnbond.create(record as RedeemedByUnbondProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<RedeemedByUnbond[] | undefined>{
      
      const records = await store.getByField('RedeemedByUnbond', 'extrinsicId', extrinsicId);
      return records.map(record => RedeemedByUnbond.create(record as RedeemedByUnbondProps));
      
    }


    static create(record: RedeemedByUnbondProps): RedeemedByUnbond {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new RedeemedByUnbond(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
