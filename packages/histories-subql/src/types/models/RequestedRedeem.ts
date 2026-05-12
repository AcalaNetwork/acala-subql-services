// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type RequestedRedeemProps = Omit<RequestedRedeem, NonNullable<FunctionPropertyNames<RequestedRedeem>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatRequestedRedeemProps = Omit<RequestedRedeemProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class RequestedRedeem implements CompatEntity {

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
    public allowFastMatch?: boolean;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'RequestedRedeem';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save RequestedRedeem entity without an ID");
        await store.set('RequestedRedeem', id.toString(), this as unknown as CompatRequestedRedeemProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove RequestedRedeem entity without an ID");
        await store.remove('RequestedRedeem', id.toString());
    }

    static async get(id: string): Promise<RequestedRedeem | undefined> {
        assert((id !== null && id !== undefined), "Cannot get RequestedRedeem entity without an ID");
        const record = await store.get('RequestedRedeem', id.toString());
        if (record) {
            return this.create(record as unknown as RequestedRedeemProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatRequestedRedeemProps>): Promise<RequestedRedeem[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatRequestedRedeemProps>('RequestedRedeem', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as RequestedRedeemProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<RequestedRedeemProps>[], options: GetOptions<RequestedRedeemProps>): Promise<RequestedRedeem[]> {
        const records = await store.getByFields<CompatRequestedRedeemProps>('RequestedRedeem', filter  as unknown as FieldsExpression<CompatRequestedRedeemProps>[], options as unknown as GetOptions<CompatRequestedRedeemProps>);
        return records.map(record => this.create(record as unknown as RequestedRedeemProps));
    }

    static create(record: RequestedRedeemProps): RequestedRedeem {
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
