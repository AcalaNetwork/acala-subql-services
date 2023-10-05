// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type BondedProps = Omit<Bonded, NonNullable<FunctionPropertyNames<Bonded>>| '_name'>;

export class Bonded implements Entity {

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
        return 'Bonded';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Bonded entity without an ID");
        await store.set('Bonded', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Bonded entity without an ID");
        await store.remove('Bonded', id.toString());
    }

    static async get(id:string): Promise<Bonded | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Bonded entity without an ID");
        const record = await store.get('Bonded', id.toString());
        if (record){
            return this.create(record as BondedProps);
        }else{
            return;
        }
    }



    static create(record: BondedProps): Bonded {
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
