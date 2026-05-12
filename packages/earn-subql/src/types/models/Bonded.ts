// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type BondedProps = Omit<Bonded, NonNullable<FunctionPropertyNames<Bonded>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatBondedProps = Omit<BondedProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Bonded implements CompatEntity {

    constructor(
        
        id: string,
        address: string,
        amount: bigint,
        block: bigint,
        extrinsic: string,
        timestamp: Date,
    ) {
        this.id = id;
        this.address = address;
        this.amount = amount;
        this.block = block;
        this.extrinsic = extrinsic;
        this.timestamp = timestamp;
        
    }

    public id: string;
    public address: string;
    public amount: bigint;
    public block: bigint;
    public extrinsic: string;
    public timestamp: Date;
    

    get _name(): string {
        return 'Bonded';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Bonded entity without an ID");
        await store.set('Bonded', id.toString(), this as unknown as CompatBondedProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Bonded entity without an ID");
        await store.remove('Bonded', id.toString());
    }

    static async get(id: string): Promise<Bonded | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Bonded entity without an ID");
        const record = await store.get('Bonded', id.toString());
        if (record) {
            return this.create(record as unknown as BondedProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<BondedProps>[], options: GetOptions<BondedProps>): Promise<Bonded[]> {
        const records = await store.getByFields<CompatBondedProps>('Bonded', filter  as unknown as FieldsExpression<CompatBondedProps>[], options as unknown as GetOptions<CompatBondedProps>);
        return records.map(record => this.create(record as unknown as BondedProps));
    }

    static create(record: BondedProps): Bonded {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.address,
            record.amount,
            record.block,
            record.extrinsic,
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
