// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type SharesProps = Omit<Shares, NonNullable<FunctionPropertyNames<Shares>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatSharesProps = Omit<SharesProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class Shares implements CompatEntity {

    constructor(
        
        id: string,
        poolId: bigint,
        who: string,
    ) {
        this.id = id;
        this.poolId = poolId;
        this.who = who;
        
    }

    public id: string;
    public poolId: bigint;
    public who: string;
    public stakedAmount?: bigint;
    

    get _name(): string {
        return 'Shares';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save Shares entity without an ID");
        await store.set('Shares', id.toString(), this as unknown as CompatSharesProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove Shares entity without an ID");
        await store.remove('Shares', id.toString());
    }

    static async get(id: string): Promise<Shares | undefined> {
        assert((id !== null && id !== undefined), "Cannot get Shares entity without an ID");
        const record = await store.get('Shares', id.toString());
        if (record) {
            return this.create(record as unknown as SharesProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<SharesProps>[], options: GetOptions<SharesProps>): Promise<Shares[]> {
        const records = await store.getByFields<CompatSharesProps>('Shares', filter  as unknown as FieldsExpression<CompatSharesProps>[], options as unknown as GetOptions<CompatSharesProps>);
        return records.map(record => this.create(record as unknown as SharesProps));
    }

    static create(record: SharesProps): Shares {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.poolId,
            record.who,
        );
        Object.assign(entity,record);
        return entity;
    }
}
