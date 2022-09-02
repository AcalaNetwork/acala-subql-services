// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type HourTokenProps = Omit<HourToken, NonNullable<FunctionPropertyNames<HourToken>>>;

export class HourToken implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public tokenId: string;

    public volume: bigint;

    public issuance: bigint;

    public reserved: bigint;

    public frozen: bigint;

    public timestmap?: Date;

    public updateAtBlock?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save HourToken entity without an ID");
        await store.set('HourToken', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove HourToken entity without an ID");
        await store.remove('HourToken', id.toString());
    }

    static async get(id:string): Promise<HourToken | undefined>{
        assert((id !== null && id !== undefined), "Cannot get HourToken entity without an ID");
        const record = await store.get('HourToken', id.toString());
        if (record){
            return HourToken.create(record as HourTokenProps);
        }else{
            return;
        }
    }


    static async getByTokenId(tokenId: string): Promise<HourToken[] | undefined>{
      
      const records = await store.getByField('HourToken', 'tokenId', tokenId);
      return records.map(record => HourToken.create(record as HourTokenProps));
      
    }


    static create(record: HourTokenProps): HourToken {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new HourToken(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
