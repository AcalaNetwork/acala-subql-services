// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type DailyAccountBalanceProps = Omit<DailyAccountBalance, NonNullable<FunctionPropertyNames<DailyAccountBalance>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatDailyAccountBalanceProps = Omit<DailyAccountBalanceProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class DailyAccountBalance implements CompatEntity {

    constructor(
        
        id: string,
        accountId: string,
        tokenId: string,
        total: bigint,
        free: bigint,
        reserved: bigint,
    ) {
        this.id = id;
        this.accountId = accountId;
        this.tokenId = tokenId;
        this.total = total;
        this.free = free;
        this.reserved = reserved;
        
    }

    public id: string;
    public accountId: string;
    public tokenId: string;
    public total: bigint;
    public free: bigint;
    public reserved: bigint;
    public timestamp?: Date;
    public updateAtBlock?: bigint;
    

    get _name(): string {
        return 'DailyAccountBalance';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save DailyAccountBalance entity without an ID");
        await store.set('DailyAccountBalance', id.toString(), this as unknown as CompatDailyAccountBalanceProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove DailyAccountBalance entity without an ID");
        await store.remove('DailyAccountBalance', id.toString());
    }

    static async get(id: string): Promise<DailyAccountBalance | undefined> {
        assert((id !== null && id !== undefined), "Cannot get DailyAccountBalance entity without an ID");
        const record = await store.get('DailyAccountBalance', id.toString());
        if (record) {
            return this.create(record as unknown as DailyAccountBalanceProps);
        } else {
            return;
        }
    }

    static async getByAccountId(accountId: string, options: GetOptions<CompatDailyAccountBalanceProps>): Promise<DailyAccountBalance[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatDailyAccountBalanceProps>('DailyAccountBalance', 'accountId', accountId, options);
        return records.map(record => this.create(record as unknown as DailyAccountBalanceProps));
    }
    

    static async getByTokenId(tokenId: string, options: GetOptions<CompatDailyAccountBalanceProps>): Promise<DailyAccountBalance[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatDailyAccountBalanceProps>('DailyAccountBalance', 'tokenId', tokenId, options);
        return records.map(record => this.create(record as unknown as DailyAccountBalanceProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<DailyAccountBalanceProps>[], options: GetOptions<DailyAccountBalanceProps>): Promise<DailyAccountBalance[]> {
        const records = await store.getByFields<CompatDailyAccountBalanceProps>('DailyAccountBalance', filter  as unknown as FieldsExpression<CompatDailyAccountBalanceProps>[], options as unknown as GetOptions<CompatDailyAccountBalanceProps>);
        return records.map(record => this.create(record as unknown as DailyAccountBalanceProps));
    }

    static create(record: DailyAccountBalanceProps): DailyAccountBalance {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.accountId,
            record.tokenId,
            record.total,
            record.free,
            record.reserved,
        );
        Object.assign(entity,record);
        return entity;
    }
}
