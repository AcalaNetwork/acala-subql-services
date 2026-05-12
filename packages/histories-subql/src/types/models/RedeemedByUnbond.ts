// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type RedeemedByUnbondProps = Omit<RedeemedByUnbond, NonNullable<FunctionPropertyNames<RedeemedByUnbond>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatRedeemedByUnbondProps = Omit<RedeemedByUnbondProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class RedeemedByUnbond implements CompatEntity {

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
    public eraIndexWhenUnbond?: bigint;
    public liquidAmount?: bigint;
    public unbondingStakingAmount?: bigint;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'RedeemedByUnbond';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save RedeemedByUnbond entity without an ID");
        await store.set('RedeemedByUnbond', id.toString(), this as unknown as CompatRedeemedByUnbondProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove RedeemedByUnbond entity without an ID");
        await store.remove('RedeemedByUnbond', id.toString());
    }

    static async get(id: string): Promise<RedeemedByUnbond | undefined> {
        assert((id !== null && id !== undefined), "Cannot get RedeemedByUnbond entity without an ID");
        const record = await store.get('RedeemedByUnbond', id.toString());
        if (record) {
            return this.create(record as unknown as RedeemedByUnbondProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatRedeemedByUnbondProps>): Promise<RedeemedByUnbond[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatRedeemedByUnbondProps>('RedeemedByUnbond', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as RedeemedByUnbondProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<RedeemedByUnbondProps>[], options: GetOptions<RedeemedByUnbondProps>): Promise<RedeemedByUnbond[]> {
        const records = await store.getByFields<CompatRedeemedByUnbondProps>('RedeemedByUnbond', filter  as unknown as FieldsExpression<CompatRedeemedByUnbondProps>[], options as unknown as GetOptions<CompatRedeemedByUnbondProps>);
        return records.map(record => this.create(record as unknown as RedeemedByUnbondProps));
    }

    static create(record: RedeemedByUnbondProps): RedeemedByUnbond {
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
