// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type RebondedProps = Omit<Rebonded, NonNullable<FunctionPropertyNames<Rebonded>>| '_name'>;

export class Rebonded implements Entity {

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
        return 'Rebonded';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Rebonded entity without an ID");
        await store.set('Rebonded', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Rebonded entity without an ID");
        await store.remove('Rebonded', id.toString());
    }

    static async get(id:string): Promise<Rebonded | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Rebonded entity without an ID");
        const record = await store.get('Rebonded', id.toString());
        if (record){
            return this.create(record as RebondedProps);
        }else{
            return;
        }
    }



    static create(record: RebondedProps): Rebonded {
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
