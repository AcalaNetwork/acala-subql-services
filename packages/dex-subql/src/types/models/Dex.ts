// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type DexProps = Omit<Dex, NonNullable<FunctionPropertyNames<Dex>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatDexProps = Omit<DexProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Dex implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public poolCount?: number;
    public tradeVolumeUSD?: bigint;
    public totalTVL?: bigint;
    

    get _name(): string {
        return 'Dex';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Dex entity without an ID");
        await store.set('Dex', id.toString(), this as unknown as CompatDexProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Dex entity without an ID");
        await store.remove('Dex', id.toString());
    }

    static async get(id: string): Promise<Dex | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Dex entity without an ID");
        const record = await store.get('Dex', id.toString());
        if (record) {
            return this.create(record as unknown as DexProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<DexProps>[], options: GetOptions<DexProps>): Promise<Dex[]> {
        const records = await store.getByFields<CompatDexProps>('Dex', filter  as unknown as FieldsExpression<CompatDexProps>[], options as unknown as GetOptions<CompatDexProps>);
        return records.map(record => this.create(record as unknown as DexProps));
    }

    static create(record: DexProps): Dex {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
