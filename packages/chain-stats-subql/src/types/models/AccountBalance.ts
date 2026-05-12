// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type AccountBalanceProps = Omit<AccountBalance, NonNullable<FunctionPropertyNames<AccountBalance>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatAccountBalanceProps = Omit<AccountBalanceProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class AccountBalance implements CompatEntity {

    constructor(
        
        id: string,
        accountId: string,
        tokenId: string,
        total: bigint,
        free: bigint,
        reserved: bigint,
        updateAtBlock: bigint,
    ) {
        this.id = id;
        this.accountId = accountId;
        this.tokenId = tokenId;
        this.total = total;
        this.free = free;
        this.reserved = reserved;
        this.updateAtBlock = updateAtBlock;
        
    }

    public id: string;
    public accountId: string;
    public tokenId: string;
    public total: bigint;
    public free: bigint;
    public reserved: bigint;
    public updateAtBlock: bigint;
    

    get _name(): string {
        return 'AccountBalance';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save AccountBalance entity without an ID");
        await store.set('AccountBalance', id.toString(), this as unknown as CompatAccountBalanceProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove AccountBalance entity without an ID");
        await store.remove('AccountBalance', id.toString());
    }

    static async get(id: string): Promise<AccountBalance | undefined> {
        assert((id !== null && id !== undefined), "Cannot get AccountBalance entity without an ID");
        const record = await store.get('AccountBalance', id.toString());
        if (record) {
            return this.create(record as unknown as AccountBalanceProps);
        } else {
            return;
        }
    }

    static async getByAccountId(accountId: string, options: GetOptions<CompatAccountBalanceProps>): Promise<AccountBalance[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatAccountBalanceProps>('AccountBalance', 'accountId', accountId, options);
        return records.map(record => this.create(record as unknown as AccountBalanceProps));
    }
    

    static async getByTokenId(tokenId: string, options: GetOptions<CompatAccountBalanceProps>): Promise<AccountBalance[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatAccountBalanceProps>('AccountBalance', 'tokenId', tokenId, options);
        return records.map(record => this.create(record as unknown as AccountBalanceProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<AccountBalanceProps>[], options: GetOptions<AccountBalanceProps>): Promise<AccountBalance[]> {
        const records = await store.getByFields<CompatAccountBalanceProps>('AccountBalance', filter  as unknown as FieldsExpression<CompatAccountBalanceProps>[], options as unknown as GetOptions<CompatAccountBalanceProps>);
        return records.map(record => this.create(record as unknown as AccountBalanceProps));
    }

    static create(record: AccountBalanceProps): AccountBalance {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.accountId,
            record.tokenId,
            record.total,
            record.free,
            record.reserved,
            record.updateAtBlock,
        );
        Object.assign(entity,record);
        return entity;
    }
}
