// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type CancelAuctionProps = Omit<CancelAuction, NonNullable<FunctionPropertyNames<CancelAuction>>>;

export class CancelAuction implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public auctionId: string;

    public blockNumber: bigint;

    public blockHash: string;

    public extrinsic?: string;

    public timestamp?: Date;

    public eventIndex?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save CancelAuction entity without an ID");
        await store.set('CancelAuction', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove CancelAuction entity without an ID");
        await store.remove('CancelAuction', id.toString());
    }

    static async get(id:string): Promise<CancelAuction | undefined>{
        assert((id !== null && id !== undefined), "Cannot get CancelAuction entity without an ID");
        const record = await store.get('CancelAuction', id.toString());
        if (record){
            return CancelAuction.create(record as CancelAuctionProps);
        }else{
            return;
        }
    }


    static async getByAuctionId(auctionId: string): Promise<CancelAuction[] | undefined>{
      
      const records = await store.getByField('CancelAuction', 'auctionId', auctionId);
      return records.map(record => CancelAuction.create(record as CancelAuctionProps));
      
    }


    static create(record: CancelAuctionProps): CancelAuction {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new CancelAuction(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
