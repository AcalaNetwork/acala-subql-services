// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type WithdrawDexShareProps = Omit<WithdrawDexShare, NonNullable<FunctionPropertyNames<WithdrawDexShare>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatWithdrawDexShareProps = Omit<WithdrawDexShareProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class WithdrawDexShare implements CompatEntity {

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
        return 'WithdrawDexShare';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save WithdrawDexShare entity without an ID");
        await store.set('WithdrawDexShare', id.toString(), this as unknown as CompatWithdrawDexShareProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove WithdrawDexShare entity without an ID");
        await store.remove('WithdrawDexShare', id.toString());
    }

    static async get(id: string): Promise<WithdrawDexShare | undefined> {
        assert((id !== null && id !== undefined), "Cannot get WithdrawDexShare entity without an ID");
        const record = await store.get('WithdrawDexShare', id.toString());
        if (record) {
            return this.create(record as unknown as WithdrawDexShareProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatWithdrawDexShareProps>): Promise<WithdrawDexShare[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatWithdrawDexShareProps>('WithdrawDexShare', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as WithdrawDexShareProps));
    }
    

    static async getByTokenId(tokenId: string, options: GetOptions<CompatWithdrawDexShareProps>): Promise<WithdrawDexShare[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatWithdrawDexShareProps>('WithdrawDexShare', 'tokenId', tokenId, options);
        return records.map(record => this.create(record as unknown as WithdrawDexShareProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<WithdrawDexShareProps>[], options: GetOptions<WithdrawDexShareProps>): Promise<WithdrawDexShare[]> {
        const records = await store.getByFields<CompatWithdrawDexShareProps>('WithdrawDexShare', filter  as unknown as FieldsExpression<CompatWithdrawDexShareProps>[], options as unknown as GetOptions<CompatWithdrawDexShareProps>);
        return records.map(record => this.create(record as unknown as WithdrawDexShareProps));
    }

    static create(record: WithdrawDexShareProps): WithdrawDexShare {
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
