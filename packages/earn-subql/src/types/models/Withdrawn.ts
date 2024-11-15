// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type WithdrawnProps = Omit<Withdrawn, NonNullable<FunctionPropertyNames<Withdrawn>>| '_name'>;

export class Withdrawn implements Entity {

    constructor(
        
            id: string,
        
            address: string,
        
            amount: bigint,
        
            block: bigint,
        
            extrinsic: string,
        
            timestamp: Date,
        
    ) {
        
            this.id = id;
        
            this.address = address;
        
            this.amount = amount;
        
            this.block = block;
        
            this.extrinsic = extrinsic;
        
            this.timestamp = timestamp;
        
    }


    public id: string;

    public address: string;

    public amount: bigint;

    public block: bigint;

    public extrinsic: string;

    public timestamp: Date;


    get _name(): string {
        return 'Withdrawn';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Withdrawn entity without an ID");
        await store.set('Withdrawn', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Withdrawn entity without an ID");
        await store.remove('Withdrawn', id.toString());
    }

    static async get(id:string): Promise<Withdrawn | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Withdrawn entity without an ID");
        const record = await store.get('Withdrawn', id.toString());
        if (record){
            return this.create(record as WithdrawnProps);
        }else{
            return;
        }
    }



    static create(record: WithdrawnProps): Withdrawn {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.address,
        
            record.amount,
        
            record.block,
        
            record.extrinsic,
        
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
