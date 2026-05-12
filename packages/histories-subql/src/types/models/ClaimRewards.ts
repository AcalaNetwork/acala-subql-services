// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type ClaimRewardsProps = Omit<ClaimRewards, NonNullable<FunctionPropertyNames<ClaimRewards>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatClaimRewardsProps = Omit<ClaimRewardsProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class ClaimRewards implements CompatEntity {

    constructor(
        
        id: string,
        blockNumber: bigint,
        blockHash: string,
    ) {
        this.id = id;
        this.blockNumber = blockNumber;
        this.blockHash = blockHash;
        
    }

    public id: string;
    public addressId?: string;
    public tokenId?: string;
    public pool?: string;
    public actualAmount?: bigint;
    public deductionAmount?: bigint;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'ClaimRewards';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save ClaimRewards entity without an ID");
        await store.set('ClaimRewards', id.toString(), this as unknown as CompatClaimRewardsProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove ClaimRewards entity without an ID");
        await store.remove('ClaimRewards', id.toString());
    }

    static async get(id: string): Promise<ClaimRewards | undefined> {
        assert((id !== null && id !== undefined), "Cannot get ClaimRewards entity without an ID");
        const record = await store.get('ClaimRewards', id.toString());
        if (record) {
            return this.create(record as unknown as ClaimRewardsProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatClaimRewardsProps>): Promise<ClaimRewards[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatClaimRewardsProps>('ClaimRewards', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as ClaimRewardsProps));
    }
    

    static async getByTokenId(tokenId: string, options: GetOptions<CompatClaimRewardsProps>): Promise<ClaimRewards[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatClaimRewardsProps>('ClaimRewards', 'tokenId', tokenId, options);
        return records.map(record => this.create(record as unknown as ClaimRewardsProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<ClaimRewardsProps>[], options: GetOptions<ClaimRewardsProps>): Promise<ClaimRewards[]> {
        const records = await store.getByFields<CompatClaimRewardsProps>('ClaimRewards', filter  as unknown as FieldsExpression<CompatClaimRewardsProps>[], options as unknown as GetOptions<CompatClaimRewardsProps>);
        return records.map(record => this.create(record as unknown as ClaimRewardsProps));
    }

    static create(record: ClaimRewardsProps): ClaimRewards {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.blockNumber,
            record.blockHash,
        );
        Object.assign(entity,record);
        return entity;
    }
}
