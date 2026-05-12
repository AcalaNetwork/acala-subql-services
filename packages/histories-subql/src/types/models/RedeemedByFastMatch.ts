// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type RedeemedByFastMatchProps = Omit<RedeemedByFastMatch, NonNullable<FunctionPropertyNames<RedeemedByFastMatch>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatRedeemedByFastMatchProps = Omit<RedeemedByFastMatchProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class RedeemedByFastMatch implements CompatEntity {

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
    public matchedLiquidAmount?: bigint;
    public feeInLiquid?: bigint;
    public redeemedStakingAmount?: bigint;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'RedeemedByFastMatch';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save RedeemedByFastMatch entity without an ID");
        await store.set('RedeemedByFastMatch', id.toString(), this as unknown as CompatRedeemedByFastMatchProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove RedeemedByFastMatch entity without an ID");
        await store.remove('RedeemedByFastMatch', id.toString());
    }

    static async get(id: string): Promise<RedeemedByFastMatch | undefined> {
        assert((id !== null && id !== undefined), "Cannot get RedeemedByFastMatch entity without an ID");
        const record = await store.get('RedeemedByFastMatch', id.toString());
        if (record) {
            return this.create(record as unknown as RedeemedByFastMatchProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatRedeemedByFastMatchProps>): Promise<RedeemedByFastMatch[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatRedeemedByFastMatchProps>('RedeemedByFastMatch', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as RedeemedByFastMatchProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<RedeemedByFastMatchProps>[], options: GetOptions<RedeemedByFastMatchProps>): Promise<RedeemedByFastMatch[]> {
        const records = await store.getByFields<CompatRedeemedByFastMatchProps>('RedeemedByFastMatch', filter  as unknown as FieldsExpression<CompatRedeemedByFastMatchProps>[], options as unknown as GetOptions<CompatRedeemedByFastMatchProps>);
        return records.map(record => this.create(record as unknown as RedeemedByFastMatchProps));
    }

    static create(record: RedeemedByFastMatchProps): RedeemedByFastMatch {
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
