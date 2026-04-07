// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type AddLiquidityProps = Omit<AddLiquidity, NonNullable<FunctionPropertyNames<AddLiquidity>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatAddLiquidityProps = Omit<AddLiquidityProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class AddLiquidity implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public addressId?: string;
    public poolId?: string;
    public token0Id?: string;
    public token1Id?: string;
    public token0Amount?: bigint;
    public token1Amount?: bigint;
    public price0?: bigint;
    public price1?: bigint;
    public blockId?: string;
    public extrinsicId?: string;
    public timestamp?: Date;
    

    get _name(): string {
        return 'AddLiquidity';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save AddLiquidity entity without an ID");
        await store.set('AddLiquidity', id.toString(), this as unknown as CompatAddLiquidityProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove AddLiquidity entity without an ID");
        await store.remove('AddLiquidity', id.toString());
    }

    static async get(id: string): Promise<AddLiquidity | undefined> {
        assert((id !== null && id !== undefined), "Cannot get AddLiquidity entity without an ID");
        const record = await store.get('AddLiquidity', id.toString());
        if (record) {
            return this.create(record as unknown as AddLiquidityProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatAddLiquidityProps>): Promise<AddLiquidity[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatAddLiquidityProps>('AddLiquidity', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as AddLiquidityProps));
    }
    

    static async getByPoolId(poolId: string, options: GetOptions<CompatAddLiquidityProps>): Promise<AddLiquidity[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatAddLiquidityProps>('AddLiquidity', 'poolId', poolId, options);
        return records.map(record => this.create(record as unknown as AddLiquidityProps));
    }
    

    static async getByToken0Id(token0Id: string, options: GetOptions<CompatAddLiquidityProps>): Promise<AddLiquidity[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatAddLiquidityProps>('AddLiquidity', 'token0Id', token0Id, options);
        return records.map(record => this.create(record as unknown as AddLiquidityProps));
    }
    

    static async getByToken1Id(token1Id: string, options: GetOptions<CompatAddLiquidityProps>): Promise<AddLiquidity[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatAddLiquidityProps>('AddLiquidity', 'token1Id', token1Id, options);
        return records.map(record => this.create(record as unknown as AddLiquidityProps));
    }
    

    static async getByBlockId(blockId: string, options: GetOptions<CompatAddLiquidityProps>): Promise<AddLiquidity[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatAddLiquidityProps>('AddLiquidity', 'blockId', blockId, options);
        return records.map(record => this.create(record as unknown as AddLiquidityProps));
    }
    

    static async getByExtrinsicId(extrinsicId: string, options: GetOptions<CompatAddLiquidityProps>): Promise<AddLiquidity[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatAddLiquidityProps>('AddLiquidity', 'extrinsicId', extrinsicId, options);
        return records.map(record => this.create(record as unknown as AddLiquidityProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<AddLiquidityProps>[], options: GetOptions<AddLiquidityProps>): Promise<AddLiquidity[]> {
        const records = await store.getByFields<CompatAddLiquidityProps>('AddLiquidity', filter  as unknown as FieldsExpression<CompatAddLiquidityProps>[], options as unknown as GetOptions<CompatAddLiquidityProps>);
        return records.map(record => this.create(record as unknown as AddLiquidityProps));
    }

    static create(record: AddLiquidityProps): AddLiquidity {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
