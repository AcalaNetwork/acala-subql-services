// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type HourlyPositionProps = Omit<HourlyPosition, NonNullable<FunctionPropertyNames<HourlyPosition>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatHourlyPositionProps = Omit<HourlyPositionProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class HourlyPosition implements CompatEntity {

    constructor(
        
        id: string,
        ownerId: string,
        collateralId: string,
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
        txCount: number,
    ) {
        this.id = id;
        this.ownerId = ownerId;
        this.collateralId = collateralId;
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
        this.txCount = txCount;
        
    }

    public id: string;
    public ownerId: string;
    public collateralId: string;
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
    public txCount: number;
    

    get _name(): string {
        return 'HourlyPosition';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save HourlyPosition entity without an ID");
        await store.set('HourlyPosition', id.toString(), this as unknown as CompatHourlyPositionProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove HourlyPosition entity without an ID");
        await store.remove('HourlyPosition', id.toString());
    }

    static async get(id: string): Promise<HourlyPosition | undefined> {
        assert((id !== null && id !== undefined), "Cannot get HourlyPosition entity without an ID");
        const record = await store.get('HourlyPosition', id.toString());
        if (record) {
            return this.create(record as unknown as HourlyPositionProps);
        } else {
            return;
        }
    }

    static async getByOwnerId(ownerId: string, options: GetOptions<CompatHourlyPositionProps>): Promise<HourlyPosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatHourlyPositionProps>('HourlyPosition', 'ownerId', ownerId, options);
        return records.map(record => this.create(record as unknown as HourlyPositionProps));
    }
    

    static async getByCollateralId(collateralId: string, options: GetOptions<CompatHourlyPositionProps>): Promise<HourlyPosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatHourlyPositionProps>('HourlyPosition', 'collateralId', collateralId, options);
        return records.map(record => this.create(record as unknown as HourlyPositionProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<HourlyPositionProps>[], options: GetOptions<HourlyPositionProps>): Promise<HourlyPosition[]> {
        const records = await store.getByFields<CompatHourlyPositionProps>('HourlyPosition', filter  as unknown as FieldsExpression<CompatHourlyPositionProps>[], options as unknown as GetOptions<CompatHourlyPositionProps>);
        return records.map(record => this.create(record as unknown as HourlyPositionProps));
    }

    static create(record: HourlyPositionProps): HourlyPosition {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.ownerId,
            record.collateralId,
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
            record.txCount,
        );
        Object.assign(entity,record);
        return entity;
    }
}
