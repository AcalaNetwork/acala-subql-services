// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type SharesProps = Omit<Shares, NonNullable<FunctionPropertyNames<Shares>>| '_name'>;

export class Shares implements Entity {

    constructor(
        
            id: string,
        
            poolId: bigint,
        
            who: string,
        
        
    ) {
        
            this.id = id;
        
            this.poolId = poolId;
        
            this.who = who;
        
    }


    public id: string;

    public poolId: bigint;

    public who: string;

    public stakedAmount?: bigint;


    get _name(): string {
        return 'Shares';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Shares entity without an ID");
        await store.set('Shares', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Shares entity without an ID");
        await store.remove('Shares', id.toString());
    }

    static async get(id:string): Promise<Shares | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Shares entity without an ID");
        const record = await store.get('Shares', id.toString());
        if (record){
            return this.create(record as SharesProps);
        }else{
            return;
        }
    }



    static create(record: SharesProps): Shares {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.poolId,
        
            record.who,
        );
        Object.assign(entity,record);
        return entity;
    }
}
