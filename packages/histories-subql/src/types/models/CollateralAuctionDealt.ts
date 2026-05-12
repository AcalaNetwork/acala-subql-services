// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type CollateralAuctionDealtProps = Omit<CollateralAuctionDealt, NonNullable<FunctionPropertyNames<CollateralAuctionDealt>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatCollateralAuctionDealtProps = Omit<CollateralAuctionDealtProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class CollateralAuctionDealt implements CompatEntity {

    constructor(
        
        id: string,
        auctionId: string,
        collateral: string,
        amount: bigint,
        winner: string,
        paymentAmount: bigint,
        blockNumber: bigint,
        blockHash: string,
    ) {
        this.id = id;
        this.auctionId = auctionId;
        this.collateral = collateral;
        this.amount = amount;
        this.winner = winner;
        this.paymentAmount = paymentAmount;
        this.blockNumber = blockNumber;
        this.blockHash = blockHash;
        
    }

    public id: string;
    public auctionId: string;
    public collateral: string;
    public amount: bigint;
    public winner: string;
    public paymentAmount: bigint;
    public blockNumber: bigint;
    public blockHash: string;
    public extrinsic?: string;
    public timestamp?: Date;
    public eventIndex?: number;
    

    get _name(): string {
        return 'CollateralAuctionDealt';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save CollateralAuctionDealt entity without an ID");
        await store.set('CollateralAuctionDealt', id.toString(), this as unknown as CompatCollateralAuctionDealtProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove CollateralAuctionDealt entity without an ID");
        await store.remove('CollateralAuctionDealt', id.toString());
    }

    static async get(id: string): Promise<CollateralAuctionDealt | undefined> {
        assert((id !== null && id !== undefined), "Cannot get CollateralAuctionDealt entity without an ID");
        const record = await store.get('CollateralAuctionDealt', id.toString());
        if (record) {
            return this.create(record as unknown as CollateralAuctionDealtProps);
        } else {
            return;
        }
    }

    static async getByAuctionId(auctionId: string, options: GetOptions<CompatCollateralAuctionDealtProps>): Promise<CollateralAuctionDealt[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatCollateralAuctionDealtProps>('CollateralAuctionDealt', 'auctionId', auctionId, options);
        return records.map(record => this.create(record as unknown as CollateralAuctionDealtProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<CollateralAuctionDealtProps>[], options: GetOptions<CollateralAuctionDealtProps>): Promise<CollateralAuctionDealt[]> {
        const records = await store.getByFields<CompatCollateralAuctionDealtProps>('CollateralAuctionDealt', filter  as unknown as FieldsExpression<CompatCollateralAuctionDealtProps>[], options as unknown as GetOptions<CompatCollateralAuctionDealtProps>);
        return records.map(record => this.create(record as unknown as CollateralAuctionDealtProps));
    }

    static create(record: CollateralAuctionDealtProps): CollateralAuctionDealt {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.auctionId,
            record.collateral,
            record.amount,
            record.winner,
            record.paymentAmount,
            record.blockNumber,
            record.blockHash,
        );
        Object.assign(entity,record);
        return entity;
    }
}
