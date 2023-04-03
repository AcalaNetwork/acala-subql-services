// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type StatusProps = Omit<Status, NonNullable<FunctionPropertyNames<Status>>>;

export class Status implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public initialized?: boolean;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Status entity without an ID");
        await store.set('Status', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Status entity without an ID");
        await store.remove('Status', id.toString());
    }

    static async get(id:string): Promise<Status | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Status entity without an ID");
        const record = await store.get('Status', id.toString());
        if (record){
            return Status.create(record as StatusProps);
        }else{
            return;
        }
    }



    static create(record: StatusProps): Status {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Status(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
