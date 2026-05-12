// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type PayoutRewardsProps = Omit<PayoutRewards, NonNullable<FunctionPropertyNames<PayoutRewards>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatPayoutRewardsProps = Omit<PayoutRewardsProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class PayoutRewards implements CompatEntity {

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
    public actualPayout?: bigint;
    public deductionAmount?: bigint;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'PayoutRewards';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save PayoutRewards entity without an ID");
        await store.set('PayoutRewards', id.toString(), this as unknown as CompatPayoutRewardsProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove PayoutRewards entity without an ID");
        await store.remove('PayoutRewards', id.toString());
    }

    static async get(id: string): Promise<PayoutRewards | undefined> {
        assert((id !== null && id !== undefined), "Cannot get PayoutRewards entity without an ID");
        const record = await store.get('PayoutRewards', id.toString());
        if (record) {
            return this.create(record as unknown as PayoutRewardsProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatPayoutRewardsProps>): Promise<PayoutRewards[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatPayoutRewardsProps>('PayoutRewards', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as PayoutRewardsProps));
    }
    

    static async getByTokenId(tokenId: string, options: GetOptions<CompatPayoutRewardsProps>): Promise<PayoutRewards[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatPayoutRewardsProps>('PayoutRewards', 'tokenId', tokenId, options);
        return records.map(record => this.create(record as unknown as PayoutRewardsProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<PayoutRewardsProps>[], options: GetOptions<PayoutRewardsProps>): Promise<PayoutRewards[]> {
        const records = await store.getByFields<CompatPayoutRewardsProps>('PayoutRewards', filter  as unknown as FieldsExpression<CompatPayoutRewardsProps>[], options as unknown as GetOptions<CompatPayoutRewardsProps>);
        return records.map(record => this.create(record as unknown as PayoutRewardsProps));
    }

    static create(record: PayoutRewardsProps): PayoutRewards {
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
