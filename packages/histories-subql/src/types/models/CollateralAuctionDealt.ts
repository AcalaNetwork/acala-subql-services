// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type CollateralAuctionDealtProps = Omit<CollateralAuctionDealt, NonNullable<FunctionPropertyNames<CollateralAuctionDealt>>>;

export class CollateralAuctionDealt implements Entity {

    constructor(id: string) {
        this.id = id;
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


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save CollateralAuctionDealt entity without an ID");
        await store.set('CollateralAuctionDealt', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove CollateralAuctionDealt entity without an ID");
        await store.remove('CollateralAuctionDealt', id.toString());
    }

    static async get(id:string): Promise<CollateralAuctionDealt | undefined>{
        assert((id !== null && id !== undefined), "Cannot get CollateralAuctionDealt entity without an ID");
        const record = await store.get('CollateralAuctionDealt', id.toString());
        if (record){
            return CollateralAuctionDealt.create(record as CollateralAuctionDealtProps);
        }else{
            return;
        }
    }


    static async getByAuctionId(auctionId: string): Promise<CollateralAuctionDealt[] | undefined>{
      
      const records = await store.getByField('CollateralAuctionDealt', 'auctionId', auctionId);
      return records.map(record => CollateralAuctionDealt.create(record as CollateralAuctionDealtProps));
      
    }


    static create(record: CollateralAuctionDealtProps): CollateralAuctionDealt {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new CollateralAuctionDealt(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
