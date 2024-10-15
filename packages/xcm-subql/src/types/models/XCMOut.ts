// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type XCMOutProps = Omit<XCMOut, NonNullable<FunctionPropertyNames<XCMOut>>| '_name'>;

export class XCMOut implements Entity {

    constructor(
        
            id: string,
        
            block: bigint,
        
            tx: string,
        
            fromAddress: string,
        
            toAddress: string,
        
            token: string,
        
            amountFromTokensEvent: bigint,
        
            amountFromXTokensEvent: bigint,
        
            timestamp: Date,
        
    ) {
        
            this.id = id;
        
            this.block = block;
        
            this.tx = tx;
        
            this.fromAddress = fromAddress;
        
            this.toAddress = toAddress;
        
            this.token = token;
        
            this.amountFromTokensEvent = amountFromTokensEvent;
        
            this.amountFromXTokensEvent = amountFromXTokensEvent;
        
            this.timestamp = timestamp;
        
    }


    public id: string;

    public block: bigint;

    public tx: string;

    public fromAddress: string;

    public toAddress: string;

    public token: string;

    public amountFromTokensEvent: bigint;

    public amountFromXTokensEvent: bigint;

    public timestamp: Date;


    get _name(): string {
        return 'XCMOut';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save XCMOut entity without an ID");
        await store.set('XCMOut', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove XCMOut entity without an ID");
        await store.remove('XCMOut', id.toString());
    }

    static async get(id:string): Promise<XCMOut | undefined>{
        assert((id !== null && id !== undefined), "Cannot get XCMOut entity without an ID");
        const record = await store.get('XCMOut', id.toString());
        if (record){
            return this.create(record as XCMOutProps);
        }else{
            return;
        }
    }



    static create(record: XCMOutProps): XCMOut {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.block,
        
            record.tx,
        
            record.fromAddress,
        
            record.toAddress,
        
            record.token,
        
            record.amountFromTokensEvent,
        
            record.amountFromXTokensEvent,
        
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
