// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type WithdrawnProps = Omit<Withdrawn, NonNullable<FunctionPropertyNames<Withdrawn>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatWithdrawnProps = Omit<WithdrawnProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Withdrawn implements CompatEntity {

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
        return 'Withdrawn';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Withdrawn entity without an ID");
        await store.set('Withdrawn', id.toString(), this as unknown as CompatWithdrawnProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Withdrawn entity without an ID");
        await store.remove('Withdrawn', id.toString());
    }

    static async get(id: string): Promise<Withdrawn | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Withdrawn entity without an ID");
        const record = await store.get('Withdrawn', id.toString());
        if (record) {
            return this.create(record as unknown as WithdrawnProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<WithdrawnProps>[], options: GetOptions<WithdrawnProps>): Promise<Withdrawn[]> {
        const records = await store.getByFields<CompatWithdrawnProps>('Withdrawn', filter  as unknown as FieldsExpression<CompatWithdrawnProps>[], options as unknown as GetOptions<CompatWithdrawnProps>);
        return records.map(record => this.create(record as unknown as WithdrawnProps));
    }

    static create(record: WithdrawnProps): Withdrawn {
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
