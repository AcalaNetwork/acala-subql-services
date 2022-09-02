// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type ReadBlockProps = Omit<ReadBlock, NonNullable<FunctionPropertyNames<ReadBlock>>>;

export class ReadBlock implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public height?: bigint;

    public size?: number;

    public start?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ReadBlock entity without an ID");
        await store.set('ReadBlock', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ReadBlock entity without an ID");
        await store.remove('ReadBlock', id.toString());
    }

    static async get(id:string): Promise<ReadBlock | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ReadBlock entity without an ID");
        const record = await store.get('ReadBlock', id.toString());
        if (record){
            return ReadBlock.create(record as ReadBlockProps);
        }else{
            return;
        }
    }



    static create(record: ReadBlockProps): ReadBlock {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new ReadBlock(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
