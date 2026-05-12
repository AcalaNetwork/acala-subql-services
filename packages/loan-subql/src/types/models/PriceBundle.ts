// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type PriceBundleProps = Omit<PriceBundle, NonNullable<FunctionPropertyNames<PriceBundle>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatPriceBundleProps = Omit<PriceBundleProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class PriceBundle implements CompatEntity {

    constructor(
        
        id: string,
        blockId: string,
        collateralId: string,
        price: bigint,
    ) {
        this.id = id;
        this.blockId = blockId;
        this.collateralId = collateralId;
        this.price = price;
        
    }

    public id: string;
    public blockId: string;
    public collateralId: string;
    public price: bigint;
    

    get _name(): string {
        return 'PriceBundle';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save PriceBundle entity without an ID");
        await store.set('PriceBundle', id.toString(), this as unknown as CompatPriceBundleProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove PriceBundle entity without an ID");
        await store.remove('PriceBundle', id.toString());
    }

    static async get(id: string): Promise<PriceBundle | undefined> {
        assert((id !== null && id !== undefined), "Cannot get PriceBundle entity without an ID");
        const record = await store.get('PriceBundle', id.toString());
        if (record) {
            return this.create(record as unknown as PriceBundleProps);
        } else {
            return;
        }
    }

    static async getByBlockId(blockId: string, options: GetOptions<CompatPriceBundleProps>): Promise<PriceBundle[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatPriceBundleProps>('PriceBundle', 'blockId', blockId, options);
        return records.map(record => this.create(record as unknown as PriceBundleProps));
    }
    

    static async getByCollateralId(collateralId: string, options: GetOptions<CompatPriceBundleProps>): Promise<PriceBundle[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatPriceBundleProps>('PriceBundle', 'collateralId', collateralId, options);
        return records.map(record => this.create(record as unknown as PriceBundleProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<PriceBundleProps>[], options: GetOptions<PriceBundleProps>): Promise<PriceBundle[]> {
        const records = await store.getByFields<CompatPriceBundleProps>('PriceBundle', filter  as unknown as FieldsExpression<CompatPriceBundleProps>[], options as unknown as GetOptions<CompatPriceBundleProps>);
        return records.map(record => this.create(record as unknown as PriceBundleProps));
    }

    static create(record: PriceBundleProps): PriceBundle {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.blockId,
            record.collateralId,
            record.price,
        );
        Object.assign(entity,record);
        return entity;
    }
}
