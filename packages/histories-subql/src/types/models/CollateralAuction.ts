// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';



import {
    AuctionStatus,
} from '../enums'


type CollateralAuctionProps = Omit<CollateralAuction, NonNullable<FunctionPropertyNames<CollateralAuction>>>;

export class CollateralAuction implements Entity {

    constructor(id: string) {
        this.id = id;
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


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save CollateralAuction entity without an ID");
        await store.set('CollateralAuction', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove CollateralAuction entity without an ID");
        await store.remove('CollateralAuction', id.toString());
    }

    static async get(id:string): Promise<CollateralAuction | undefined>{
        assert((id !== null && id !== undefined), "Cannot get CollateralAuction entity without an ID");
        const record = await store.get('CollateralAuction', id.toString());
        if (record){
            return CollateralAuction.create(record as CollateralAuctionProps);
        }else{
            return;
        }
    }



    static create(record: CollateralAuctionProps): CollateralAuction {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new CollateralAuction(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
