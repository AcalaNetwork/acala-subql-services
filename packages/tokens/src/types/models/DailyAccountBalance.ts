// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type DailyAccountBalanceProps = Omit<DailyAccountBalance, NonNullable<FunctionPropertyNames<DailyAccountBalance>>>;

export class DailyAccountBalance implements Entity {

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
        assert(id !== null, "Cannot save DailyAccountBalance entity without an ID");
        await store.set('DailyAccountBalance', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DailyAccountBalance entity without an ID");
        await store.remove('DailyAccountBalance', id.toString());
    }

    static async get(id:string): Promise<DailyAccountBalance | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DailyAccountBalance entity without an ID");
        const record = await store.get('DailyAccountBalance', id.toString());
        if (record){
            return DailyAccountBalance.create(record as DailyAccountBalanceProps);
        }else{
            return;
        }
    }


    static async getByAccountId(accountId: string): Promise<DailyAccountBalance[] | undefined>{
      
      const records = await store.getByField('DailyAccountBalance', 'accountId', accountId);
      return records.map(record => DailyAccountBalance.create(record as DailyAccountBalanceProps));
      
    }

    static async getByTokenId(tokenId: string): Promise<DailyAccountBalance[] | undefined>{
      
      const records = await store.getByField('DailyAccountBalance', 'tokenId', tokenId);
      return records.map(record => DailyAccountBalance.create(record as DailyAccountBalanceProps));
      
    }


    static create(record: DailyAccountBalanceProps): DailyAccountBalance {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new DailyAccountBalance(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
