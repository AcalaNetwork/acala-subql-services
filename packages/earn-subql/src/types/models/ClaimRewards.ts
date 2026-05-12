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
        poolId: string,
        address: string,
        token: string,
        actualAmount: bigint,
        deductionAmount: bigint,
        block: bigint,
        extrinsic: string,
        timestamp: Date,
    ) {
        this.id = id;
        this.poolId = poolId;
        this.address = address;
        this.token = token;
        this.actualAmount = actualAmount;
        this.deductionAmount = deductionAmount;
        this.block = block;
        this.extrinsic = extrinsic;
        this.timestamp = timestamp;
        
    }

    public id: string;
    public poolId: string;
    public address: string;
    public token: string;
    public actualAmount: bigint;
    public deductionAmount: bigint;
    public block: bigint;
    public extrinsic: string;
    public timestamp: Date;
    

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
            record.poolId,
            record.address,
            record.token,
            record.actualAmount,
            record.deductionAmount,
            record.block,
            record.extrinsic,
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
