// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type CollateralParamsProps = Omit<CollateralParams, NonNullable<FunctionPropertyNames<CollateralParams>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatCollateralParamsProps = Omit<CollateralParamsProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class CollateralParams implements CompatEntity {

    constructor(
        
        id: string,
        collateralId: string,
        maximumTotalDebitValue: bigint,
        interestRatePerSec: bigint,
        liquidationRatio: bigint,
        liquidationPenalty: bigint,
        requiredCollateralRatio: bigint,
        updateAt: Date,
        updateAtBlockId: string,
    ) {
        this.id = id;
        this.collateralId = collateralId;
        this.maximumTotalDebitValue = maximumTotalDebitValue;
        this.interestRatePerSec = interestRatePerSec;
        this.liquidationRatio = liquidationRatio;
        this.liquidationPenalty = liquidationPenalty;
        this.requiredCollateralRatio = requiredCollateralRatio;
        this.updateAt = updateAt;
        this.updateAtBlockId = updateAtBlockId;
        
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
    

    get _name(): string {
        return 'CollateralParams';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save CollateralParams entity without an ID");
        await store.set('CollateralParams', id.toString(), this as unknown as CompatCollateralParamsProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove CollateralParams entity without an ID");
        await store.remove('CollateralParams', id.toString());
    }

    static async get(id: string): Promise<CollateralParams | undefined> {
        assert((id !== null && id !== undefined), "Cannot get CollateralParams entity without an ID");
        const record = await store.get('CollateralParams', id.toString());
        if (record) {
            return this.create(record as unknown as CollateralParamsProps);
        } else {
            return;
        }
    }

    static async getByCollateralId(collateralId: string, options: GetOptions<CompatCollateralParamsProps>): Promise<CollateralParams[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatCollateralParamsProps>('CollateralParams', 'collateralId', collateralId, options);
        return records.map(record => this.create(record as unknown as CollateralParamsProps));
    }
    

    static async getByUpdateAtBlockId(updateAtBlockId: string, options: GetOptions<CompatCollateralParamsProps>): Promise<CollateralParams[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatCollateralParamsProps>('CollateralParams', 'updateAtBlockId', updateAtBlockId, options);
        return records.map(record => this.create(record as unknown as CollateralParamsProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<CollateralParamsProps>[], options: GetOptions<CollateralParamsProps>): Promise<CollateralParams[]> {
        const records = await store.getByFields<CompatCollateralParamsProps>('CollateralParams', filter  as unknown as FieldsExpression<CompatCollateralParamsProps>[], options as unknown as GetOptions<CompatCollateralParamsProps>);
        return records.map(record => this.create(record as unknown as CollateralParamsProps));
    }

    static create(record: CollateralParamsProps): CollateralParams {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.collateralId,
            record.maximumTotalDebitValue,
            record.interestRatePerSec,
            record.liquidationRatio,
            record.liquidationPenalty,
            record.requiredCollateralRatio,
            record.updateAt,
            record.updateAtBlockId,
        );
        Object.assign(entity,record);
        return entity;
    }
}
