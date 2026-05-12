// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type UserProvisionProps = Omit<UserProvision, NonNullable<FunctionPropertyNames<UserProvision>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatUserProvisionProps = Omit<UserProvisionProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class UserProvision implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public ownerId?: string;
    public poolId?: string;
    public token0Amount?: bigint;
    public token1Amount?: bigint;
    

    get _name(): string {
        return 'UserProvision';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save UserProvision entity without an ID");
        await store.set('UserProvision', id.toString(), this as unknown as CompatUserProvisionProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove UserProvision entity without an ID");
        await store.remove('UserProvision', id.toString());
    }

    static async get(id: string): Promise<UserProvision | undefined> {
        assert((id !== null && id !== undefined), "Cannot get UserProvision entity without an ID");
        const record = await store.get('UserProvision', id.toString());
        if (record) {
            return this.create(record as unknown as UserProvisionProps);
        } else {
            return;
        }
    }

    static async getByOwnerId(ownerId: string, options: GetOptions<CompatUserProvisionProps>): Promise<UserProvision[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatUserProvisionProps>('UserProvision', 'ownerId', ownerId, options);
        return records.map(record => this.create(record as unknown as UserProvisionProps));
    }
    

    static async getByPoolId(poolId: string, options: GetOptions<CompatUserProvisionProps>): Promise<UserProvision[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatUserProvisionProps>('UserProvision', 'poolId', poolId, options);
        return records.map(record => this.create(record as unknown as UserProvisionProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<UserProvisionProps>[], options: GetOptions<UserProvisionProps>): Promise<UserProvision[]> {
        const records = await store.getByFields<CompatUserProvisionProps>('UserProvision', filter  as unknown as FieldsExpression<CompatUserProvisionProps>[], options as unknown as GetOptions<CompatUserProvisionProps>);
        return records.map(record => this.create(record as unknown as UserProvisionProps));
    }

    static create(record: UserProvisionProps): UserProvision {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
