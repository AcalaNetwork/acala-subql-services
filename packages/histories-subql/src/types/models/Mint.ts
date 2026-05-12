// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type MintProps = Omit<Mint, NonNullable<FunctionPropertyNames<Mint>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatMintProps = Omit<MintProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Mint implements CompatEntity {

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
    public type?: string;
    public amountStaked?: bigint;
    public amountMinted?: bigint;
    public stakingCurrencyAmount?: bigint;
    public liquidAmountReceived?: bigint;
    public liquidAmountAddedToVoid?: bigint;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'Mint';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Mint entity without an ID");
        await store.set('Mint', id.toString(), this as unknown as CompatMintProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Mint entity without an ID");
        await store.remove('Mint', id.toString());
    }

    static async get(id: string): Promise<Mint | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Mint entity without an ID");
        const record = await store.get('Mint', id.toString());
        if (record) {
            return this.create(record as unknown as MintProps);
        } else {
            return;
        }
    }

    static async getByAddressId(addressId: string, options: GetOptions<CompatMintProps>): Promise<Mint[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatMintProps>('Mint', 'addressId', addressId, options);
        return records.map(record => this.create(record as unknown as MintProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<MintProps>[], options: GetOptions<MintProps>): Promise<Mint[]> {
        const records = await store.getByFields<CompatMintProps>('Mint', filter  as unknown as FieldsExpression<CompatMintProps>[], options as unknown as GetOptions<CompatMintProps>);
        return records.map(record => this.create(record as unknown as MintProps));
    }

    static create(record: MintProps): Mint {
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
