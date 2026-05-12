// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type CollateralProps = Omit<Collateral, NonNullable<FunctionPropertyNames<Collateral>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatCollateralProps = Omit<CollateralProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Collateral implements CompatEntity {

    constructor(
        
        id: string,
        name: string,
        decimals: number,
        depositAmount: bigint,
        debitAmount: bigint,
        txCount: number,
    ) {
        this.id = id;
        this.name = name;
        this.decimals = decimals;
        this.depositAmount = depositAmount;
        this.debitAmount = debitAmount;
        this.txCount = txCount;
        
    }

    public id: string;
    public name: string;
    public decimals: number;
    public depositAmount: bigint;
    public debitAmount: bigint;
    public txCount: number;
    

    get _name(): string {
        return 'Collateral';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Collateral entity without an ID");
        await store.set('Collateral', id.toString(), this as unknown as CompatCollateralProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Collateral entity without an ID");
        await store.remove('Collateral', id.toString());
    }

    static async get(id: string): Promise<Collateral | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Collateral entity without an ID");
        const record = await store.get('Collateral', id.toString());
        if (record) {
            return this.create(record as unknown as CollateralProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<CollateralProps>[], options: GetOptions<CollateralProps>): Promise<Collateral[]> {
        const records = await store.getByFields<CompatCollateralProps>('Collateral', filter  as unknown as FieldsExpression<CompatCollateralProps>[], options as unknown as GetOptions<CompatCollateralProps>);
        return records.map(record => this.create(record as unknown as CollateralProps));
    }

    static create(record: CollateralProps): Collateral {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.name,
            record.decimals,
            record.depositAmount,
            record.debitAmount,
            record.txCount,
        );
        Object.assign(entity,record);
        return entity;
    }
}
