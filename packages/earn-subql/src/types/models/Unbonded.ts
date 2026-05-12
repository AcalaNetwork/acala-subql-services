// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type UnbondedProps = Omit<Unbonded, NonNullable<FunctionPropertyNames<Unbonded>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatUnbondedProps = Omit<UnbondedProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Unbonded implements CompatEntity {

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
        return 'Unbonded';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Unbonded entity without an ID");
        await store.set('Unbonded', id.toString(), this as unknown as CompatUnbondedProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Unbonded entity without an ID");
        await store.remove('Unbonded', id.toString());
    }

    static async get(id: string): Promise<Unbonded | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Unbonded entity without an ID");
        const record = await store.get('Unbonded', id.toString());
        if (record) {
            return this.create(record as unknown as UnbondedProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<UnbondedProps>[], options: GetOptions<UnbondedProps>): Promise<Unbonded[]> {
        const records = await store.getByFields<CompatUnbondedProps>('Unbonded', filter  as unknown as FieldsExpression<CompatUnbondedProps>[], options as unknown as GetOptions<CompatUnbondedProps>);
        return records.map(record => this.create(record as unknown as UnbondedProps));
    }

    static create(record: UnbondedProps): Unbonded {
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
