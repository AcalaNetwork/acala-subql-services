// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type RebondedProps = Omit<Rebonded, NonNullable<FunctionPropertyNames<Rebonded>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatRebondedProps = Omit<RebondedProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Rebonded implements CompatEntity {

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
        return 'Rebonded';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Rebonded entity without an ID");
        await store.set('Rebonded', id.toString(), this as unknown as CompatRebondedProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Rebonded entity without an ID");
        await store.remove('Rebonded', id.toString());
    }

    static async get(id: string): Promise<Rebonded | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Rebonded entity without an ID");
        const record = await store.get('Rebonded', id.toString());
        if (record) {
            return this.create(record as unknown as RebondedProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<RebondedProps>[], options: GetOptions<RebondedProps>): Promise<Rebonded[]> {
        const records = await store.getByFields<CompatRebondedProps>('Rebonded', filter  as unknown as FieldsExpression<CompatRebondedProps>[], options as unknown as GetOptions<CompatRebondedProps>);
        return records.map(record => this.create(record as unknown as RebondedProps));
    }

    static create(record: RebondedProps): Rebonded {
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
