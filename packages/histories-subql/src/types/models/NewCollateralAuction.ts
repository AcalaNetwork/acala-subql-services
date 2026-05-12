// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type NewCollateralAuctionProps = Omit<NewCollateralAuction, NonNullable<FunctionPropertyNames<NewCollateralAuction>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatNewCollateralAuctionProps = Omit<NewCollateralAuctionProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class NewCollateralAuction implements CompatEntity {

    constructor(
        
        id: string,
        collateral: string,
        amount: bigint,
        target: bigint,
        blockNumber: bigint,
        blockHash: string,
    ) {
        this.id = id;
        this.collateral = collateral;
        this.amount = amount;
        this.target = target;
        this.blockNumber = blockNumber;
        this.blockHash = blockHash;
        
    }

    public id: string;
    public auctionId?: string;
    public collateral: string;
    public amount: bigint;
    public target: bigint;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'NewCollateralAuction';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save NewCollateralAuction entity without an ID");
        await store.set('NewCollateralAuction', id.toString(), this as unknown as CompatNewCollateralAuctionProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove NewCollateralAuction entity without an ID");
        await store.remove('NewCollateralAuction', id.toString());
    }

    static async get(id: string): Promise<NewCollateralAuction | undefined> {
        assert((id !== null && id !== undefined), "Cannot get NewCollateralAuction entity without an ID");
        const record = await store.get('NewCollateralAuction', id.toString());
        if (record) {
            return this.create(record as unknown as NewCollateralAuctionProps);
        } else {
            return;
        }
    }

    static async getByAuctionId(auctionId: string, options: GetOptions<CompatNewCollateralAuctionProps>): Promise<NewCollateralAuction[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatNewCollateralAuctionProps>('NewCollateralAuction', 'auctionId', auctionId, options);
        return records.map(record => this.create(record as unknown as NewCollateralAuctionProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<NewCollateralAuctionProps>[], options: GetOptions<NewCollateralAuctionProps>): Promise<NewCollateralAuction[]> {
        const records = await store.getByFields<CompatNewCollateralAuctionProps>('NewCollateralAuction', filter  as unknown as FieldsExpression<CompatNewCollateralAuctionProps>[], options as unknown as GetOptions<CompatNewCollateralAuctionProps>);
        return records.map(record => this.create(record as unknown as NewCollateralAuctionProps));
    }

    static create(record: NewCollateralAuctionProps): NewCollateralAuction {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.collateral,
            record.amount,
            record.target,
            record.blockNumber,
            record.blockHash,
        );
        Object.assign(entity,record);
        return entity;
    }
}
