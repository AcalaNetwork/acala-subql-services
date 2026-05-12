// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type RedeemRequestCancelledProps = Omit<RedeemRequestCancelled, NonNullable<FunctionPropertyNames<RedeemRequestCancelled>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatRedeemRequestCancelledProps = Omit<RedeemRequestCancelledProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class RedeemRequestCancelled implements CompatEntity {

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
    public amount?: bigint;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'RedeemRequestCancelled';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save RedeemRequestCancelled entity without an ID");
        await store.set('RedeemRequestCancelled', id.toString(), this as unknown as CompatRedeemRequestCancelledProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove RedeemRequestCancelled entity without an ID");
        await store.remove('RedeemRequestCancelled', id.toString());
    }

    static async get(id: string): Promise<RedeemRequestCancelled | undefined> {
        assert((id !== null && id !== undefined), "Cannot get RedeemRequestCancelled entity without an ID");
        const record = await store.get('RedeemRequestCancelled', id.toString());
        if (record) {
            return this.create(record as unknown as RedeemRequestCancelledProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatRedeemRequestCancelledProps>): Promise<RedeemRequestCancelled[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatRedeemRequestCancelledProps>('RedeemRequestCancelled', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as RedeemRequestCancelledProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<RedeemRequestCancelledProps>[], options: GetOptions<RedeemRequestCancelledProps>): Promise<RedeemRequestCancelled[]> {
        const records = await store.getByFields<CompatRedeemRequestCancelledProps>('RedeemRequestCancelled', filter  as unknown as FieldsExpression<CompatRedeemRequestCancelledProps>[], options as unknown as GetOptions<CompatRedeemRequestCancelledProps>);
        return records.map(record => this.create(record as unknown as RedeemRequestCancelledProps));
    }

    static create(record: RedeemRequestCancelledProps): RedeemRequestCancelled {
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
