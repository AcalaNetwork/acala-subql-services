// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type UserPoolProps = Omit<UserPool, NonNullable<FunctionPropertyNames<UserPool>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatUserPoolProps = Omit<UserPoolProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class UserPool implements CompatEntity {

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

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save UserPool entity without an ID");
        await store.set('UserPool', id.toString(), this as unknown as CompatUserPoolProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove UserPool entity without an ID");
        await store.remove('UserPool', id.toString());
    }

    static async get(id: string): Promise<UserPool | undefined> {
        assert((id !== null && id !== undefined), "Cannot get UserPool entity without an ID");
        const record = await store.get('UserPool', id.toString());
        if (record) {
            return this.create(record as unknown as UserPoolProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<UserPoolProps>[], options: GetOptions<UserPoolProps>): Promise<UserPool[]> {
        const records = await store.getByFields<CompatUserPoolProps>('UserPool', filter  as unknown as FieldsExpression<CompatUserPoolProps>[], options as unknown as GetOptions<CompatUserPoolProps>);
        return records.map(record => this.create(record as unknown as UserPoolProps));
    }

    static create(record: UserPoolProps): UserPool {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
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
