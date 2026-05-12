// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type HourAccountBalanceProps = Omit<HourAccountBalance, NonNullable<FunctionPropertyNames<HourAccountBalance>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatHourAccountBalanceProps = Omit<HourAccountBalanceProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class HourAccountBalance implements CompatEntity {

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
        return 'HourAccountBalance';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save HourAccountBalance entity without an ID");
        await store.set('HourAccountBalance', id.toString(), this as unknown as CompatHourAccountBalanceProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove HourAccountBalance entity without an ID");
        await store.remove('HourAccountBalance', id.toString());
    }

    static async get(id: string): Promise<HourAccountBalance | undefined> {
        assert((id !== null && id !== undefined), "Cannot get HourAccountBalance entity without an ID");
        const record = await store.get('HourAccountBalance', id.toString());
        if (record) {
            return this.create(record as unknown as HourAccountBalanceProps);
        } else {
            return;
        }
    }

    static async getByAccountId(accountId: string, options: GetOptions<CompatHourAccountBalanceProps>): Promise<HourAccountBalance[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatHourAccountBalanceProps>('HourAccountBalance', 'accountId', accountId, options);
        return records.map(record => this.create(record as unknown as HourAccountBalanceProps));
    }
    

    static async getByTokenId(tokenId: string, options: GetOptions<CompatHourAccountBalanceProps>): Promise<HourAccountBalance[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatHourAccountBalanceProps>('HourAccountBalance', 'tokenId', tokenId, options);
        return records.map(record => this.create(record as unknown as HourAccountBalanceProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<HourAccountBalanceProps>[], options: GetOptions<HourAccountBalanceProps>): Promise<HourAccountBalance[]> {
        const records = await store.getByFields<CompatHourAccountBalanceProps>('HourAccountBalance', filter  as unknown as FieldsExpression<CompatHourAccountBalanceProps>[], options as unknown as GetOptions<CompatHourAccountBalanceProps>);
        return records.map(record => this.create(record as unknown as HourAccountBalanceProps));
    }

    static create(record: HourAccountBalanceProps): HourAccountBalance {
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
