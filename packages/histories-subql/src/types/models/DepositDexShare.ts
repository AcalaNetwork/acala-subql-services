// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type DepositDexShareProps = Omit<DepositDexShare, NonNullable<FunctionPropertyNames<DepositDexShare>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatDepositDexShareProps = Omit<DepositDexShareProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class DepositDexShare implements CompatEntity {

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
    public amount?: bigint;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'DepositDexShare';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save DepositDexShare entity without an ID");
        await store.set('DepositDexShare', id.toString(), this as unknown as CompatDepositDexShareProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove DepositDexShare entity without an ID");
        await store.remove('DepositDexShare', id.toString());
    }

    static async get(id: string): Promise<DepositDexShare | undefined> {
        assert((id !== null && id !== undefined), "Cannot get DepositDexShare entity without an ID");
        const record = await store.get('DepositDexShare', id.toString());
        if (record) {
            return this.create(record as unknown as DepositDexShareProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatDepositDexShareProps>): Promise<DepositDexShare[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatDepositDexShareProps>('DepositDexShare', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as DepositDexShareProps));
    }
    

    static async getByTokenId(tokenId: string, options: GetOptions<CompatDepositDexShareProps>): Promise<DepositDexShare[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatDepositDexShareProps>('DepositDexShare', 'tokenId', tokenId, options);
        return records.map(record => this.create(record as unknown as DepositDexShareProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<DepositDexShareProps>[], options: GetOptions<DepositDexShareProps>): Promise<DepositDexShare[]> {
        const records = await store.getByFields<CompatDepositDexShareProps>('DepositDexShare', filter  as unknown as FieldsExpression<CompatDepositDexShareProps>[], options as unknown as GetOptions<CompatDepositDexShareProps>);
        return records.map(record => this.create(record as unknown as DepositDexShareProps));
    }

    static create(record: DepositDexShareProps): DepositDexShare {
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
