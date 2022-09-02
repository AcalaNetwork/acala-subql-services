// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type DEXTakeCollateralAuctionProps = Omit<DEXTakeCollateralAuction, NonNullable<FunctionPropertyNames<DEXTakeCollateralAuction>>>;

export class DEXTakeCollateralAuction implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public auctionId: string;

    public collateral: string;

    public amount: bigint;

    public supplyCollateralAmount: bigint;

    public targetStableAmount: bigint;

    public blockNumber: bigint;

    public blockHash: string;

    public extrinsic?: string;

    public timestamp?: Date;

    public eventIndex?: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save DEXTakeCollateralAuction entity without an ID");
        await store.set('DEXTakeCollateralAuction', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DEXTakeCollateralAuction entity without an ID");
        await store.remove('DEXTakeCollateralAuction', id.toString());
    }

    static async get(id:string): Promise<DEXTakeCollateralAuction | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DEXTakeCollateralAuction entity without an ID");
        const record = await store.get('DEXTakeCollateralAuction', id.toString());
        if (record){
            return DEXTakeCollateralAuction.create(record as DEXTakeCollateralAuctionProps);
        }else{
            return;
        }
    }


    static async getByAuctionId(auctionId: string): Promise<DEXTakeCollateralAuction[] | undefined>{
      
      const records = await store.getByField('DEXTakeCollateralAuction', 'auctionId', auctionId);
      return records.map(record => DEXTakeCollateralAuction.create(record as DEXTakeCollateralAuctionProps));
      
    }


    static create(record: DEXTakeCollateralAuctionProps): DEXTakeCollateralAuction {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new DEXTakeCollateralAuction(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
