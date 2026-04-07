// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type RemoveLiquidityProps = Omit<RemoveLiquidity, NonNullable<FunctionPropertyNames<RemoveLiquidity>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatRemoveLiquidityProps = Omit<RemoveLiquidityProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class RemoveLiquidity implements CompatEntity {

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
    public shareAmount?: bigint;
    public price0?: bigint;
    public price1?: bigint;
    public blockId?: string;
    public extrinsicId?: string;
    public timestamp?: Date;
    

    get _name(): string {
        return 'RemoveLiquidity';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save RemoveLiquidity entity without an ID");
        await store.set('RemoveLiquidity', id.toString(), this as unknown as CompatRemoveLiquidityProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove RemoveLiquidity entity without an ID");
        await store.remove('RemoveLiquidity', id.toString());
    }

    static async get(id: string): Promise<RemoveLiquidity | undefined> {
        assert((id !== null && id !== undefined), "Cannot get RemoveLiquidity entity without an ID");
        const record = await store.get('RemoveLiquidity', id.toString());
        if (record) {
            return this.create(record as unknown as RemoveLiquidityProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatRemoveLiquidityProps>): Promise<RemoveLiquidity[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatRemoveLiquidityProps>('RemoveLiquidity', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as RemoveLiquidityProps));
    }
    

    static async getByPoolId(poolId: string, options: GetOptions<CompatRemoveLiquidityProps>): Promise<RemoveLiquidity[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatRemoveLiquidityProps>('RemoveLiquidity', 'poolId', poolId, options);
        return records.map(record => this.create(record as unknown as RemoveLiquidityProps));
    }
    

    static async getByToken0Id(token0Id: string, options: GetOptions<CompatRemoveLiquidityProps>): Promise<RemoveLiquidity[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatRemoveLiquidityProps>('RemoveLiquidity', 'token0Id', token0Id, options);
        return records.map(record => this.create(record as unknown as RemoveLiquidityProps));
    }
    

    static async getByToken1Id(token1Id: string, options: GetOptions<CompatRemoveLiquidityProps>): Promise<RemoveLiquidity[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatRemoveLiquidityProps>('RemoveLiquidity', 'token1Id', token1Id, options);
        return records.map(record => this.create(record as unknown as RemoveLiquidityProps));
    }
    

    static async getByBlockId(blockId: string, options: GetOptions<CompatRemoveLiquidityProps>): Promise<RemoveLiquidity[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatRemoveLiquidityProps>('RemoveLiquidity', 'blockId', blockId, options);
        return records.map(record => this.create(record as unknown as RemoveLiquidityProps));
    }
    

    static async getByExtrinsicId(extrinsicId: string, options: GetOptions<CompatRemoveLiquidityProps>): Promise<RemoveLiquidity[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatRemoveLiquidityProps>('RemoveLiquidity', 'extrinsicId', extrinsicId, options);
        return records.map(record => this.create(record as unknown as RemoveLiquidityProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<RemoveLiquidityProps>[], options: GetOptions<RemoveLiquidityProps>): Promise<RemoveLiquidity[]> {
        const records = await store.getByFields<CompatRemoveLiquidityProps>('RemoveLiquidity', filter  as unknown as FieldsExpression<CompatRemoveLiquidityProps>[], options as unknown as GetOptions<CompatRemoveLiquidityProps>);
        return records.map(record => this.create(record as unknown as RemoveLiquidityProps));
    }

    static create(record: RemoveLiquidityProps): RemoveLiquidity {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
