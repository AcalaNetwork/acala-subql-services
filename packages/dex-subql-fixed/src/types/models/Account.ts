// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type AccountProps = Omit<Account, NonNullable<FunctionPropertyNames<Account>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatAccountProps = Omit<AccountProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Account implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public address?: string;
    public txCount?: bigint;
    

    get _name(): string {
        return 'Account';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Account entity without an ID");
        await store.set('Account', id.toString(), this as unknown as CompatAccountProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Account entity without an ID");
        await store.remove('Account', id.toString());
    }

    static async get(id: string): Promise<Account | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Account entity without an ID");
        const record = await store.get('Account', id.toString());
        if (record) {
            return this.create(record as unknown as AccountProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<AccountProps>[], options: GetOptions<AccountProps>): Promise<Account[]> {
        const records = await store.getByFields<CompatAccountProps>('Account', filter  as unknown as FieldsExpression<CompatAccountProps>[], options as unknown as GetOptions<CompatAccountProps>);
        return records.map(record => this.create(record as unknown as AccountProps));
    }

    static create(record: AccountProps): Account {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
