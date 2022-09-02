// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';



import {
    BidType,
} from '../enums'


type BidProps = Omit<Bid, NonNullable<FunctionPropertyNames<Bid>>>;

export class Bid implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public type: BidType;

    public auctionId: string;

    public bidder: string;

    public amount: bigint;

    public collateralAmount: bigint;

    public blockNumber: bigint;

    public blockHash: string;

    public extrinsic?: string;

    public timestamp?: Date;

    public eventIndex?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Bid entity without an ID");
        await store.set('Bid', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Bid entity without an ID");
        await store.remove('Bid', id.toString());
    }

    static async get(id:string): Promise<Bid | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Bid entity without an ID");
        const record = await store.get('Bid', id.toString());
        if (record){
            return Bid.create(record as BidProps);
        }else{
            return;
        }
    }


    static async getByAuctionId(auctionId: string): Promise<Bid[] | undefined>{
      
      const records = await store.getByField('Bid', 'auctionId', auctionId);
      return records.map(record => Bid.create(record as BidProps));
      
    }


    static create(record: BidProps): Bid {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Bid(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
