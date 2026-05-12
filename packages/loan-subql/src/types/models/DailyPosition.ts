// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type DailyPositionProps = Omit<DailyPosition, NonNullable<FunctionPropertyNames<DailyPosition>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatDailyPositionProps = Omit<DailyPositionProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class DailyPosition implements CompatEntity {

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
        return 'DailyPosition';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save DailyPosition entity without an ID");
        await store.set('DailyPosition', id.toString(), this as unknown as CompatDailyPositionProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove DailyPosition entity without an ID");
        await store.remove('DailyPosition', id.toString());
    }

    static async get(id: string): Promise<DailyPosition | undefined> {
        assert((id !== null && id !== undefined), "Cannot get DailyPosition entity without an ID");
        const record = await store.get('DailyPosition', id.toString());
        if (record) {
            return this.create(record as unknown as DailyPositionProps);
        } else {
            return;
        }
    }

    static async getByOwnerId(ownerId: string, options: GetOptions<CompatDailyPositionProps>): Promise<DailyPosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatDailyPositionProps>('DailyPosition', 'ownerId', ownerId, options);
        return records.map(record => this.create(record as unknown as DailyPositionProps));
    }
    

    static async getByCollateralId(collateralId: string, options: GetOptions<CompatDailyPositionProps>): Promise<DailyPosition[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatDailyPositionProps>('DailyPosition', 'collateralId', collateralId, options);
        return records.map(record => this.create(record as unknown as DailyPositionProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<DailyPositionProps>[], options: GetOptions<DailyPositionProps>): Promise<DailyPosition[]> {
        const records = await store.getByFields<CompatDailyPositionProps>('DailyPosition', filter  as unknown as FieldsExpression<CompatDailyPositionProps>[], options as unknown as GetOptions<CompatDailyPositionProps>);
        return records.map(record => this.create(record as unknown as DailyPositionProps));
    }

    static create(record: DailyPositionProps): DailyPosition {
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
