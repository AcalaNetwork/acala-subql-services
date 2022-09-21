// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type DailyTokenProps = Omit<DailyToken, NonNullable<FunctionPropertyNames<DailyToken>>>;

export class DailyToken implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public tokenId: string;

    public volume: bigint;

    public issuance: bigint;

    public reserved: bigint;

    public timestmap?: Date;

    public updateAtBlock?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save DailyToken entity without an ID");
        await store.set('DailyToken', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DailyToken entity without an ID");
        await store.remove('DailyToken', id.toString());
    }

    static async get(id:string): Promise<DailyToken | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DailyToken entity without an ID");
        const record = await store.get('DailyToken', id.toString());
        if (record){
            return DailyToken.create(record as DailyTokenProps);
        }else{
            return;
        }
    }


    static async getByTokenId(tokenId: string): Promise<DailyToken[] | undefined>{
      
      const records = await store.getByField('DailyToken', 'tokenId', tokenId);
      return records.map(record => DailyToken.create(record as DailyTokenProps));
      
    }


    static create(record: DailyTokenProps): DailyToken {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new DailyToken(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
