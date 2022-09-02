// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type NewCollateralAuctionProps = Omit<NewCollateralAuction, NonNullable<FunctionPropertyNames<NewCollateralAuction>>>;

export class NewCollateralAuction implements Entity {

    constructor(id: string) {
        this.id = id;
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


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save NewCollateralAuction entity without an ID");
        await store.set('NewCollateralAuction', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove NewCollateralAuction entity without an ID");
        await store.remove('NewCollateralAuction', id.toString());
    }

    static async get(id:string): Promise<NewCollateralAuction | undefined>{
        assert((id !== null && id !== undefined), "Cannot get NewCollateralAuction entity without an ID");
        const record = await store.get('NewCollateralAuction', id.toString());
        if (record){
            return NewCollateralAuction.create(record as NewCollateralAuctionProps);
        }else{
            return;
        }
    }


    static async getByAuctionId(auctionId: string): Promise<NewCollateralAuction[] | undefined>{
      
      const records = await store.getByField('NewCollateralAuction', 'auctionId', auctionId);
      return records.map(record => NewCollateralAuction.create(record as NewCollateralAuctionProps));
      
    }


    static create(record: NewCollateralAuctionProps): NewCollateralAuction {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new NewCollateralAuction(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
