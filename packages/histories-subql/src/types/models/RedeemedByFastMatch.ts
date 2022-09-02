// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type RedeemedByFastMatchProps = Omit<RedeemedByFastMatch, NonNullable<FunctionPropertyNames<RedeemedByFastMatch>>>;

export class RedeemedByFastMatch implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public addressId?: string;

    public matchedLiquidAmount?: bigint;

    public feeInLiquid?: bigint;

    public redeemedStakingAmount?: bigint;

    public blockId?: string;

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save RedeemedByFastMatch entity without an ID");
        await store.set('RedeemedByFastMatch', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove RedeemedByFastMatch entity without an ID");
        await store.remove('RedeemedByFastMatch', id.toString());
    }

    static async get(id:string): Promise<RedeemedByFastMatch | undefined>{
        assert((id !== null && id !== undefined), "Cannot get RedeemedByFastMatch entity without an ID");
        const record = await store.get('RedeemedByFastMatch', id.toString());
        if (record){
            return RedeemedByFastMatch.create(record as RedeemedByFastMatchProps);
        }else{
            return;
        }
    }


    static async getByAddressId(addressId: string): Promise<RedeemedByFastMatch[] | undefined>{
      
      const records = await store.getByField('RedeemedByFastMatch', 'addressId', addressId);
      return records.map(record => RedeemedByFastMatch.create(record as RedeemedByFastMatchProps));
      
    }

    static async getByBlockId(blockId: string): Promise<RedeemedByFastMatch[] | undefined>{
      
      const records = await store.getByField('RedeemedByFastMatch', 'blockId', blockId);
      return records.map(record => RedeemedByFastMatch.create(record as RedeemedByFastMatchProps));
      
    }

    static async getByExtrinsicId(extrinsicId: string): Promise<RedeemedByFastMatch[] | undefined>{
      
      const records = await store.getByField('RedeemedByFastMatch', 'extrinsicId', extrinsicId);
      return records.map(record => RedeemedByFastMatch.create(record as RedeemedByFastMatchProps));
      
    }


    static create(record: RedeemedByFastMatchProps): RedeemedByFastMatch {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new RedeemedByFastMatch(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
