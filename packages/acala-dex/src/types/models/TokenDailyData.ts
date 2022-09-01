// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type TokenDailyDataProps = Omit<TokenDailyData, NonNullable<FunctionPropertyNames<TokenDailyData>>>;

export class TokenDailyData implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public tokenId: string;

    public amount: bigint;

    public tvl: bigint;

    public dailyTradeVolume: bigint;

    public dailyTradeVolumeUSD: bigint;

    public dailyTxCount: bigint;

    public price?: bigint;

    public timestamp?: Date;

    public updateAtBlockId?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save TokenDailyData entity without an ID");
        await store.set('TokenDailyData', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove TokenDailyData entity without an ID");
        await store.remove('TokenDailyData', id.toString());
    }

    static async get(id:string): Promise<TokenDailyData | undefined>{
        assert((id !== null && id !== undefined), "Cannot get TokenDailyData entity without an ID");
        const record = await store.get('TokenDailyData', id.toString());
        if (record){
            return TokenDailyData.create(record as TokenDailyDataProps);
        }else{
            return;
        }
    }


    static async getByTokenId(tokenId: string): Promise<TokenDailyData[] | undefined>{
      
      const records = await store.getByField('TokenDailyData', 'tokenId', tokenId);
      return records.map(record => TokenDailyData.create(record as TokenDailyDataProps));
      
    }

    static async getByUpdateAtBlockId(updateAtBlockId: string): Promise<TokenDailyData[] | undefined>{
      
      const records = await store.getByField('TokenDailyData', 'updateAtBlockId', updateAtBlockId);
      return records.map(record => TokenDailyData.create(record as TokenDailyDataProps));
      
    }


    static create(record: TokenDailyDataProps): TokenDailyData {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new TokenDailyData(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
