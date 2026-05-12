// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';


import {
    AuctionStatus,
} from '../enums';

export type CollateralAuctionProps = Omit<CollateralAuction, NonNullable<FunctionPropertyNames<CollateralAuction>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatCollateralAuctionProps = Omit<CollateralAuctionProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class CollateralAuction implements CompatEntity {

    constructor(
        
        id: string,
        collateral: string,
        initAmount: bigint,
        amount: bigint,
        target: bigint,
        status: AuctionStatus,
        refundRecipient: string,
        createAt: Date,
        updateAt: Date,
        updateAtBlock: bigint,
        createAtBlock: bigint,
    ) {
        this.id = id;
        this.collateral = collateral;
        this.initAmount = initAmount;
        this.amount = amount;
        this.target = target;
        this.status = status;
        this.refundRecipient = refundRecipient;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.updateAtBlock = updateAtBlock;
        this.createAtBlock = createAtBlock;
        
    }

    public id: string;
    public collateral: string;
    public initAmount: bigint;
    public amount: bigint;
    public target: bigint;
    public status: AuctionStatus;
    public refundRecipient: string;
    public lastBid?: bigint;
    public winner?: string;
    public bidder?: string[];
    public createAt: Date;
    public updateAt: Date;
    public endAt?: Date;
    public updateAtBlock: bigint;
    public createAtBlock: bigint;
    public endAtBlock?: bigint;
    public eventIndex?: number;
    

    get _name(): string {
        return 'CollateralAuction';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save CollateralAuction entity without an ID");
        await store.set('CollateralAuction', id.toString(), this as unknown as CompatCollateralAuctionProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove CollateralAuction entity without an ID");
        await store.remove('CollateralAuction', id.toString());
    }

    static async get(id: string): Promise<CollateralAuction | undefined> {
        assert((id !== null && id !== undefined), "Cannot get CollateralAuction entity without an ID");
        const record = await store.get('CollateralAuction', id.toString());
        if (record) {
            return this.create(record as unknown as CollateralAuctionProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<CollateralAuctionProps>[], options: GetOptions<CollateralAuctionProps>): Promise<CollateralAuction[]> {
        const records = await store.getByFields<CompatCollateralAuctionProps>('CollateralAuction', filter  as unknown as FieldsExpression<CompatCollateralAuctionProps>[], options as unknown as GetOptions<CompatCollateralAuctionProps>);
        return records.map(record => this.create(record as unknown as CollateralAuctionProps));
    }

    static create(record: CollateralAuctionProps): CollateralAuction {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.collateral,
            record.initAmount,
            record.amount,
            record.target,
            record.status,
            record.refundRecipient,
            record.createAt,
            record.updateAt,
            record.updateAtBlock,
            record.createAtBlock,
        );
        Object.assign(entity,record);
        return entity;
    }
}
