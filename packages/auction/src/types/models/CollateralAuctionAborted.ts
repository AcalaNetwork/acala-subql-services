// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type CollateralAuctionAbortedProps = Omit<CollateralAuctionAborted, NonNullable<FunctionPropertyNames<CollateralAuctionAborted>>>;

export class CollateralAuctionAborted implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public auctionId: string;

    public collateral: string;

    public amount: bigint;

    public targetStableAmount: bigint;

    public refundRecipient: string;

    public timestamp: Date;

    public blockNumber: bigint;

    public blockHash: string;

    public extrinsic?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save CollateralAuctionAborted entity without an ID");
        await store.set('CollateralAuctionAborted', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove CollateralAuctionAborted entity without an ID");
        await store.remove('CollateralAuctionAborted', id.toString());
    }

    static async get(id:string): Promise<CollateralAuctionAborted | undefined>{
        assert((id !== null && id !== undefined), "Cannot get CollateralAuctionAborted entity without an ID");
        const record = await store.get('CollateralAuctionAborted', id.toString());
        if (record){
            return CollateralAuctionAborted.create(record as CollateralAuctionAbortedProps);
        }else{
            return;
        }
    }


    static async getByAuctionId(auctionId: string): Promise<CollateralAuctionAborted[] | undefined>{
      
      const records = await store.getByField('CollateralAuctionAborted', 'auctionId', auctionId);
      return records.map(record => CollateralAuctionAborted.create(record as CollateralAuctionAbortedProps));
      
    }


    static create(record: CollateralAuctionAbortedProps): CollateralAuctionAborted {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new CollateralAuctionAborted(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
