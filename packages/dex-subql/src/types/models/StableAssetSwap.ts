// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type StableAssetSwapProps = Omit<StableAssetSwap, NonNullable<FunctionPropertyNames<StableAssetSwap>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatStableAssetSwapProps = Omit<StableAssetSwapProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class StableAssetSwap implements CompatEntity {

    constructor(
        
        id: string,
        poolId: number,
        exchangeRate: number,
        totalStaking: bigint,
        totalLiquidity: bigint,
    ) {
        this.id = id;
        this.poolId = poolId;
        this.exchangeRate = exchangeRate;
        this.totalStaking = totalStaking;
        this.totalLiquidity = totalLiquidity;
        
    }

    public id: string;
    public addressId?: string;
    public poolId: number;
    public a?: number;
    public inputTokenId?: string;
    public outputTokenId?: string;
    public inputAmount?: bigint;
    public minOutputAmount?: bigint;
    public balances?: string;
    public totalSupply?: bigint;
    public yieldAmount?: bigint;
    public feeAmount?: bigint;
    public outputAmount?: bigint;
    public price?: bigint;
    public blockId?: string;
    public extrinsicId?: string;
    public timestamp?: Date;
    public exchangeRate: number;
    public totalStaking: bigint;
    public totalLiquidity: bigint;
    

    get _name(): string {
        return 'StableAssetSwap';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save StableAssetSwap entity without an ID");
        await store.set('StableAssetSwap', id.toString(), this as unknown as CompatStableAssetSwapProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove StableAssetSwap entity without an ID");
        await store.remove('StableAssetSwap', id.toString());
    }

    static async get(id: string): Promise<StableAssetSwap | undefined> {
        assert((id !== null && id !== undefined), "Cannot get StableAssetSwap entity without an ID");
        const record = await store.get('StableAssetSwap', id.toString());
        if (record) {
            return this.create(record as unknown as StableAssetSwapProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatStableAssetSwapProps>): Promise<StableAssetSwap[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatStableAssetSwapProps>('StableAssetSwap', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as StableAssetSwapProps));
    }
    

    static async getByBlockId(blockId: string, options: GetOptions<CompatStableAssetSwapProps>): Promise<StableAssetSwap[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatStableAssetSwapProps>('StableAssetSwap', 'blockId', blockId, options);
        return records.map(record => this.create(record as unknown as StableAssetSwapProps));
    }
    

    static async getByExtrinsicId(extrinsicId: string, options: GetOptions<CompatStableAssetSwapProps>): Promise<StableAssetSwap[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatStableAssetSwapProps>('StableAssetSwap', 'extrinsicId', extrinsicId, options);
        return records.map(record => this.create(record as unknown as StableAssetSwapProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<StableAssetSwapProps>[], options: GetOptions<StableAssetSwapProps>): Promise<StableAssetSwap[]> {
        const records = await store.getByFields<CompatStableAssetSwapProps>('StableAssetSwap', filter  as unknown as FieldsExpression<CompatStableAssetSwapProps>[], options as unknown as GetOptions<CompatStableAssetSwapProps>);
        return records.map(record => this.create(record as unknown as StableAssetSwapProps));
    }

    static create(record: StableAssetSwapProps): StableAssetSwap {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.poolId,
            record.exchangeRate,
            record.totalStaking,
            record.totalLiquidity,
        );
        Object.assign(entity,record);
        return entity;
    }
}
