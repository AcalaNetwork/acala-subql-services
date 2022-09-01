// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type TokenProps = Omit<Token, NonNullable<FunctionPropertyNames<Token>>>;

export class Token implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public name?: string;

    public decimals?: number;

    public amount?: bigint;

    public tvl?: bigint;

    public tradeVolume?: bigint;

    public tradeVolumeUSD?: bigint;

    public txCount?: bigint;

    public price?: bigint;

    public poolCount?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Token entity without an ID");
        await store.set('Token', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Token entity without an ID");
        await store.remove('Token', id.toString());
    }

    static async get(id:string): Promise<Token | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Token entity without an ID");
        const record = await store.get('Token', id.toString());
        if (record){
            return Token.create(record as TokenProps);
        }else{
            return;
        }
    }



    static create(record: TokenProps): Token {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Token(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
