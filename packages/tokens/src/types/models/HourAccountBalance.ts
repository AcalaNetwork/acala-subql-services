// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type HourAccountBalanceProps = Omit<HourAccountBalance, NonNullable<FunctionPropertyNames<HourAccountBalance>>>;

export class HourAccountBalance implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public accountId: string;

    public tokenId: string;

    public total: bigint;

    public free: bigint;

    public reserved: bigint;

    public frozen: bigint;

    public timestamp?: Date;

    public updateAtBlock?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save HourAccountBalance entity without an ID");
        await store.set('HourAccountBalance', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove HourAccountBalance entity without an ID");
        await store.remove('HourAccountBalance', id.toString());
    }

    static async get(id:string): Promise<HourAccountBalance | undefined>{
        assert((id !== null && id !== undefined), "Cannot get HourAccountBalance entity without an ID");
        const record = await store.get('HourAccountBalance', id.toString());
        if (record){
            return HourAccountBalance.create(record as HourAccountBalanceProps);
        }else{
            return;
        }
    }


    static async getByAccountId(accountId: string): Promise<HourAccountBalance[] | undefined>{
      
      const records = await store.getByField('HourAccountBalance', 'accountId', accountId);
      return records.map(record => HourAccountBalance.create(record as HourAccountBalanceProps));
      
    }

    static async getByTokenId(tokenId: string): Promise<HourAccountBalance[] | undefined>{
      
      const records = await store.getByField('HourAccountBalance', 'tokenId', tokenId);
      return records.map(record => HourAccountBalance.create(record as HourAccountBalanceProps));
      
    }


    static create(record: HourAccountBalanceProps): HourAccountBalance {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new HourAccountBalance(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
