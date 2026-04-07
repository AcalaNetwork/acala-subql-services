// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type SwapProps = Omit<Swap, NonNullable<FunctionPropertyNames<Swap>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatSwapProps = Omit<SwapProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Swap implements CompatEntity {

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
    public token0InAmount?: bigint;
    public token1OutAmount?: bigint;
    public tradePath?: string;
    public price0?: bigint;
    public price1?: bigint;
    public amounts?: string;
    public blockId?: string;
    public extrinsicId?: string;
    public timestamp?: Date;
    

    get _name(): string {
        return 'Swap';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Swap entity without an ID");
        await store.set('Swap', id.toString(), this as unknown as CompatSwapProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Swap entity without an ID");
        await store.remove('Swap', id.toString());
    }

    static async get(id: string): Promise<Swap | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Swap entity without an ID");
        const record = await store.get('Swap', id.toString());
        if (record) {
            return this.create(record as unknown as SwapProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatSwapProps>): Promise<Swap[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatSwapProps>('Swap', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as SwapProps));
    }
    

    static async getByPoolId(poolId: string, options: GetOptions<CompatSwapProps>): Promise<Swap[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatSwapProps>('Swap', 'poolId', poolId, options);
        return records.map(record => this.create(record as unknown as SwapProps));
    }
    

    static async getByToken0Id(token0Id: string, options: GetOptions<CompatSwapProps>): Promise<Swap[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatSwapProps>('Swap', 'token0Id', token0Id, options);
        return records.map(record => this.create(record as unknown as SwapProps));
    }
    

    static async getByToken1Id(token1Id: string, options: GetOptions<CompatSwapProps>): Promise<Swap[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatSwapProps>('Swap', 'token1Id', token1Id, options);
        return records.map(record => this.create(record as unknown as SwapProps));
    }
    

    static async getByBlockId(blockId: string, options: GetOptions<CompatSwapProps>): Promise<Swap[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatSwapProps>('Swap', 'blockId', blockId, options);
        return records.map(record => this.create(record as unknown as SwapProps));
    }
    

    static async getByExtrinsicId(extrinsicId: string, options: GetOptions<CompatSwapProps>): Promise<Swap[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatSwapProps>('Swap', 'extrinsicId', extrinsicId, options);
        return records.map(record => this.create(record as unknown as SwapProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<SwapProps>[], options: GetOptions<SwapProps>): Promise<Swap[]> {
        const records = await store.getByFields<CompatSwapProps>('Swap', filter  as unknown as FieldsExpression<CompatSwapProps>[], options as unknown as GetOptions<CompatSwapProps>);
        return records.map(record => this.create(record as unknown as SwapProps));
    }

    static create(record: SwapProps): Swap {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
