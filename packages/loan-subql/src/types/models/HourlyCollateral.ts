// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type HourlyCollateralProps = Omit<HourlyCollateral, NonNullable<FunctionPropertyNames<HourlyCollateral>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatHourlyCollateralProps = Omit<HourlyCollateralProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class HourlyCollateral implements CompatEntity {

    constructor(
        
        id: string,
        collateralId: string,
        txCount: number,
        depositAmount: bigint,
        debitAmount: bigint,
        depositVolumeUSD: bigint,
        debitVolumeUSD: bigint,
        depositChanged: bigint,
        debitChanged: bigint,
        depositChangedUSD: bigint,
        debitChangedUSD: bigint,
        debitExchangeRate: bigint,
        timestamp: Date,
    ) {
        this.id = id;
        this.collateralId = collateralId;
        this.txCount = txCount;
        this.depositAmount = depositAmount;
        this.debitAmount = debitAmount;
        this.depositVolumeUSD = depositVolumeUSD;
        this.debitVolumeUSD = debitVolumeUSD;
        this.depositChanged = depositChanged;
        this.debitChanged = debitChanged;
        this.depositChangedUSD = depositChangedUSD;
        this.debitChangedUSD = debitChangedUSD;
        this.debitExchangeRate = debitExchangeRate;
        this.timestamp = timestamp;
        
    }

    public id: string;
    public collateralId: string;
    public txCount: number;
    public depositAmount: bigint;
    public debitAmount: bigint;
    public depositVolumeUSD: bigint;
    public debitVolumeUSD: bigint;
    public depositChanged: bigint;
    public debitChanged: bigint;
    public depositChangedUSD: bigint;
    public debitChangedUSD: bigint;
    public debitExchangeRate: bigint;
    public timestamp: Date;
    

    get _name(): string {
        return 'HourlyCollateral';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save HourlyCollateral entity without an ID");
        await store.set('HourlyCollateral', id.toString(), this as unknown as CompatHourlyCollateralProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove HourlyCollateral entity without an ID");
        await store.remove('HourlyCollateral', id.toString());
    }

    static async get(id: string): Promise<HourlyCollateral | undefined> {
        assert((id !== null && id !== undefined), "Cannot get HourlyCollateral entity without an ID");
        const record = await store.get('HourlyCollateral', id.toString());
        if (record) {
            return this.create(record as unknown as HourlyCollateralProps);
        } else {
            return;
        }
    }

    static async getByCollateralId(collateralId: string, options: GetOptions<CompatHourlyCollateralProps>): Promise<HourlyCollateral[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatHourlyCollateralProps>('HourlyCollateral', 'collateralId', collateralId, options);
        return records.map(record => this.create(record as unknown as HourlyCollateralProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<HourlyCollateralProps>[], options: GetOptions<HourlyCollateralProps>): Promise<HourlyCollateral[]> {
        const records = await store.getByFields<CompatHourlyCollateralProps>('HourlyCollateral', filter  as unknown as FieldsExpression<CompatHourlyCollateralProps>[], options as unknown as GetOptions<CompatHourlyCollateralProps>);
        return records.map(record => this.create(record as unknown as HourlyCollateralProps));
    }

    static create(record: HourlyCollateralProps): HourlyCollateral {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.collateralId,
            record.txCount,
            record.depositAmount,
            record.debitAmount,
            record.depositVolumeUSD,
            record.debitVolumeUSD,
            record.depositChanged,
            record.debitChanged,
            record.depositChangedUSD,
            record.debitChangedUSD,
            record.debitExchangeRate,
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
