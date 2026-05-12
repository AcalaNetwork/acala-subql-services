// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type ExchangeBundleProps = Omit<ExchangeBundle, NonNullable<FunctionPropertyNames<ExchangeBundle>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatExchangeBundleProps = Omit<ExchangeBundleProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class ExchangeBundle implements CompatEntity {

    constructor(
        
        id: string,
        blockId: string,
        collateralId: string,
        debitExchangeRate: bigint,
    ) {
        this.id = id;
        this.blockId = blockId;
        this.collateralId = collateralId;
        this.debitExchangeRate = debitExchangeRate;
        
    }

    public id: string;
    public blockId: string;
    public collateralId: string;
    public debitExchangeRate: bigint;
    

    get _name(): string {
        return 'ExchangeBundle';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save ExchangeBundle entity without an ID");
        await store.set('ExchangeBundle', id.toString(), this as unknown as CompatExchangeBundleProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove ExchangeBundle entity without an ID");
        await store.remove('ExchangeBundle', id.toString());
    }

    static async get(id: string): Promise<ExchangeBundle | undefined> {
        assert((id !== null && id !== undefined), "Cannot get ExchangeBundle entity without an ID");
        const record = await store.get('ExchangeBundle', id.toString());
        if (record) {
            return this.create(record as unknown as ExchangeBundleProps);
        } else {
            return;
        }
    }

    static async getByBlockId(blockId: string, options: GetOptions<CompatExchangeBundleProps>): Promise<ExchangeBundle[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatExchangeBundleProps>('ExchangeBundle', 'blockId', blockId, options);
        return records.map(record => this.create(record as unknown as ExchangeBundleProps));
    }
    

    static async getByCollateralId(collateralId: string, options: GetOptions<CompatExchangeBundleProps>): Promise<ExchangeBundle[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatExchangeBundleProps>('ExchangeBundle', 'collateralId', collateralId, options);
        return records.map(record => this.create(record as unknown as ExchangeBundleProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<ExchangeBundleProps>[], options: GetOptions<ExchangeBundleProps>): Promise<ExchangeBundle[]> {
        const records = await store.getByFields<CompatExchangeBundleProps>('ExchangeBundle', filter  as unknown as FieldsExpression<CompatExchangeBundleProps>[], options as unknown as GetOptions<CompatExchangeBundleProps>);
        return records.map(record => this.create(record as unknown as ExchangeBundleProps));
    }

    static create(record: ExchangeBundleProps): ExchangeBundle {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.blockId,
            record.collateralId,
            record.debitExchangeRate,
        );
        Object.assign(entity,record);
        return entity;
    }
}
