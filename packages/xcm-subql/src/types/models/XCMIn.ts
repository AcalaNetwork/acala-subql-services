// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type XCMInProps = Omit<XCMIn, NonNullable<FunctionPropertyNames<XCMIn>>| '_name'>;

export class XCMIn implements Entity {

    constructor(
        
            id: string,
        
            block: bigint,
        
            token: string,
        
            fromAddress: string,
        
            toAddress: string,
        
            amount: bigint,
        
            toAddressReceive: bigint,
        
            treasuryReceive: bigint,
        
            timestamp: Date,
        
    ) {
        
            this.id = id;
        
            this.block = block;
        
            this.token = token;
        
            this.fromAddress = fromAddress;
        
            this.toAddress = toAddress;
        
            this.amount = amount;
        
            this.toAddressReceive = toAddressReceive;
        
            this.treasuryReceive = treasuryReceive;
        
            this.timestamp = timestamp;
        
    }


    public id: string;

    public block: bigint;

    public token: string;

    public fromAddress: string;

    public toAddress: string;

    public amount: bigint;

    public toAddressReceive: bigint;

    public treasuryReceive: bigint;

    public timestamp: Date;


    get _name(): string {
        return 'XCMIn';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save XCMIn entity without an ID");
        await store.set('XCMIn', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove XCMIn entity without an ID");
        await store.remove('XCMIn', id.toString());
    }

    static async get(id:string): Promise<XCMIn | undefined>{
        assert((id !== null && id !== undefined), "Cannot get XCMIn entity without an ID");
        const record = await store.get('XCMIn', id.toString());
        if (record){
            return this.create(record as XCMInProps);
        }else{
            return;
        }
    }



    static create(record: XCMInProps): XCMIn {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.block,
        
            record.token,
        
            record.fromAddress,
        
            record.toAddress,
        
            record.amount,
        
            record.toAddressReceive,
        
            record.treasuryReceive,
        
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
