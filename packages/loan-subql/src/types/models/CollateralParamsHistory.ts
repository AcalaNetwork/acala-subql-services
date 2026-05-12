// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type CollateralParamsHistoryProps = Omit<CollateralParamsHistory, NonNullable<FunctionPropertyNames<CollateralParamsHistory>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatCollateralParamsHistoryProps = Omit<CollateralParamsHistoryProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class CollateralParamsHistory implements CompatEntity {

    constructor(
        
        id: string,
        collateralId: string,
        maximumTotalDebitValue: bigint,
        interestRatePerSec: bigint,
        liquidationRatio: bigint,
        liquidationPenalty: bigint,
        requiredCollateralRatio: bigint,
        startAtBlockId: string,
        endAtBlockId: string,
        startAt: Date,
        endAt: Date,
    ) {
        this.id = id;
        this.collateralId = collateralId;
        this.maximumTotalDebitValue = maximumTotalDebitValue;
        this.interestRatePerSec = interestRatePerSec;
        this.liquidationRatio = liquidationRatio;
        this.liquidationPenalty = liquidationPenalty;
        this.requiredCollateralRatio = requiredCollateralRatio;
        this.startAtBlockId = startAtBlockId;
        this.endAtBlockId = endAtBlockId;
        this.startAt = startAt;
        this.endAt = endAt;
        
    }

    public id: string;
    public collateralId: string;
    public maximumTotalDebitValue: bigint;
    public interestRatePerSec: bigint;
    public liquidationRatio: bigint;
    public liquidationPenalty: bigint;
    public requiredCollateralRatio: bigint;
    public startAtBlockId: string;
    public endAtBlockId: string;
    public startAt: Date;
    public endAt: Date;
    

    get _name(): string {
        return 'CollateralParamsHistory';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save CollateralParamsHistory entity without an ID");
        await store.set('CollateralParamsHistory', id.toString(), this as unknown as CompatCollateralParamsHistoryProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove CollateralParamsHistory entity without an ID");
        await store.remove('CollateralParamsHistory', id.toString());
    }

    static async get(id: string): Promise<CollateralParamsHistory | undefined> {
        assert((id !== null && id !== undefined), "Cannot get CollateralParamsHistory entity without an ID");
        const record = await store.get('CollateralParamsHistory', id.toString());
        if (record) {
            return this.create(record as unknown as CollateralParamsHistoryProps);
        } else {
            return;
        }
    }

    static async getByCollateralId(collateralId: string, options: GetOptions<CompatCollateralParamsHistoryProps>): Promise<CollateralParamsHistory[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatCollateralParamsHistoryProps>('CollateralParamsHistory', 'collateralId', collateralId, options);
        return records.map(record => this.create(record as unknown as CollateralParamsHistoryProps));
    }
    

    static async getByStartAtBlockId(startAtBlockId: string, options: GetOptions<CompatCollateralParamsHistoryProps>): Promise<CollateralParamsHistory[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatCollateralParamsHistoryProps>('CollateralParamsHistory', 'startAtBlockId', startAtBlockId, options);
        return records.map(record => this.create(record as unknown as CollateralParamsHistoryProps));
    }
    

    static async getByEndAtBlockId(endAtBlockId: string, options: GetOptions<CompatCollateralParamsHistoryProps>): Promise<CollateralParamsHistory[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatCollateralParamsHistoryProps>('CollateralParamsHistory', 'endAtBlockId', endAtBlockId, options);
        return records.map(record => this.create(record as unknown as CollateralParamsHistoryProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<CollateralParamsHistoryProps>[], options: GetOptions<CollateralParamsHistoryProps>): Promise<CollateralParamsHistory[]> {
        const records = await store.getByFields<CompatCollateralParamsHistoryProps>('CollateralParamsHistory', filter  as unknown as FieldsExpression<CompatCollateralParamsHistoryProps>[], options as unknown as GetOptions<CompatCollateralParamsHistoryProps>);
        return records.map(record => this.create(record as unknown as CollateralParamsHistoryProps));
    }

    static create(record: CollateralParamsHistoryProps): CollateralParamsHistory {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.collateralId,
            record.maximumTotalDebitValue,
            record.interestRatePerSec,
            record.liquidationRatio,
            record.liquidationPenalty,
            record.requiredCollateralRatio,
            record.startAtBlockId,
            record.endAtBlockId,
            record.startAt,
            record.endAt,
        );
        Object.assign(entity,record);
        return entity;
    }
}
