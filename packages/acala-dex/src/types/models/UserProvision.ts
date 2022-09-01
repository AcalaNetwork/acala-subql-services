// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type UserProvisionProps = Omit<UserProvision, NonNullable<FunctionPropertyNames<UserProvision>>>;

export class UserProvision implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public ownerId?: string;

    public poolId?: string;

    public token0Amount?: bigint;

    public token1Amount?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save UserProvision entity without an ID");
        await store.set('UserProvision', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove UserProvision entity without an ID");
        await store.remove('UserProvision', id.toString());
    }

    static async get(id:string): Promise<UserProvision | undefined>{
        assert((id !== null && id !== undefined), "Cannot get UserProvision entity without an ID");
        const record = await store.get('UserProvision', id.toString());
        if (record){
            return UserProvision.create(record as UserProvisionProps);
        }else{
            return;
        }
    }


    static async getByOwnerId(ownerId: string): Promise<UserProvision[] | undefined>{
      
      const records = await store.getByField('UserProvision', 'ownerId', ownerId);
      return records.map(record => UserProvision.create(record as UserProvisionProps));
      
    }

    static async getByPoolId(poolId: string): Promise<UserProvision[] | undefined>{
      
      const records = await store.getByField('UserProvision', 'poolId', poolId);
      return records.map(record => UserProvision.create(record as UserProvisionProps));
      
    }


    static create(record: UserProvisionProps): UserProvision {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new UserProvision(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
