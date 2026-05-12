// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type LoyaltyBonusPoolProps = Omit<LoyaltyBonusPool, NonNullable<FunctionPropertyNames<LoyaltyBonusPool>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatLoyaltyBonusPoolProps = Omit<LoyaltyBonusPoolProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class LoyaltyBonusPool implements CompatEntity {

    constructor(
        
        id: string,
        timestamp: Date,
        updatedAt: bigint,
    ) {
        this.id = id;
        this.timestamp = timestamp;
        this.updatedAt = updatedAt;
        
    }

    public id: string;
    public timestamp: Date;
    public updatedAt: bigint;
    

    get _name(): string {
        return 'LoyaltyBonusPool';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save LoyaltyBonusPool entity without an ID");
        await store.set('LoyaltyBonusPool', id.toString(), this as unknown as CompatLoyaltyBonusPoolProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove LoyaltyBonusPool entity without an ID");
        await store.remove('LoyaltyBonusPool', id.toString());
    }

    static async get(id: string): Promise<LoyaltyBonusPool | undefined> {
        assert((id !== null && id !== undefined), "Cannot get LoyaltyBonusPool entity without an ID");
        const record = await store.get('LoyaltyBonusPool', id.toString());
        if (record) {
            return this.create(record as unknown as LoyaltyBonusPoolProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<LoyaltyBonusPoolProps>[], options: GetOptions<LoyaltyBonusPoolProps>): Promise<LoyaltyBonusPool[]> {
        const records = await store.getByFields<CompatLoyaltyBonusPoolProps>('LoyaltyBonusPool', filter  as unknown as FieldsExpression<CompatLoyaltyBonusPoolProps>[], options as unknown as GetOptions<CompatLoyaltyBonusPoolProps>);
        return records.map(record => this.create(record as unknown as LoyaltyBonusPoolProps));
    }

    static create(record: LoyaltyBonusPoolProps): LoyaltyBonusPool {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.timestamp,
            record.updatedAt,
        );
        Object.assign(entity,record);
        return entity;
    }
}
