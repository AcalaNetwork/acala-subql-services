// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type UserPoolProps = Omit<UserPool, NonNullable<FunctionPropertyNames<UserPool>>| '_name'>;

export class UserPool implements Entity {

    constructor(
        
            id: string,
        
            address: string,
        
            share: bigint,
        
            updatedAt: bigint,
        
            timestamp: Date,
        
    ) {
        
            this.id = id;
        
            this.address = address;
        
            this.share = share;
        
            this.updatedAt = updatedAt;
        
            this.timestamp = timestamp;
        
    }


    public id: string;

    public address: string;

    public share: bigint;

    public updatedAt: bigint;

    public timestamp: Date;


    get _name(): string {
        return 'UserPool';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save UserPool entity without an ID");
        await store.set('UserPool', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove UserPool entity without an ID");
        await store.remove('UserPool', id.toString());
    }

    static async get(id:string): Promise<UserPool | undefined>{
        assert((id !== null && id !== undefined), "Cannot get UserPool entity without an ID");
        const record = await store.get('UserPool', id.toString());
        if (record){
            return this.create(record as UserPoolProps);
        }else{
            return;
        }
    }



    static create(record: UserPoolProps): UserPool {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.address,
        
            record.share,
        
            record.updatedAt,
        
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
