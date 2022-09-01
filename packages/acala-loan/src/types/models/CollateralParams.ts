// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type CollateralParamsProps = Omit<CollateralParams, NonNullable<FunctionPropertyNames<CollateralParams>>>;

export class CollateralParams implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public collateralId: string;

    public maximumTotalDebitValue: bigint;

    public interestRatePerSec: bigint;

    public liquidationRatio: bigint;

    public liquidationPenalty: bigint;

    public requiredCollateralRatio: bigint;

    public updateAt: Date;

    public updateAtBlockId: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save CollateralParams entity without an ID");
        await store.set('CollateralParams', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove CollateralParams entity without an ID");
        await store.remove('CollateralParams', id.toString());
    }

    static async get(id:string): Promise<CollateralParams | undefined>{
        assert((id !== null && id !== undefined), "Cannot get CollateralParams entity without an ID");
        const record = await store.get('CollateralParams', id.toString());
        if (record){
            return CollateralParams.create(record as CollateralParamsProps);
        }else{
            return;
        }
    }


    static async getByCollateralId(collateralId: string): Promise<CollateralParams[] | undefined>{
      
      const records = await store.getByField('CollateralParams', 'collateralId', collateralId);
      return records.map(record => CollateralParams.create(record as CollateralParamsProps));
      
    }

    static async getByUpdateAtBlockId(updateAtBlockId: string): Promise<CollateralParams[] | undefined>{
      
      const records = await store.getByField('CollateralParams', 'updateAtBlockId', updateAtBlockId);
      return records.map(record => CollateralParams.create(record as CollateralParamsProps));
      
    }


    static create(record: CollateralParamsProps): CollateralParams {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new CollateralParams(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
