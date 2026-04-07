// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type RewardSupplyProps = Omit<RewardSupply, NonNullable<FunctionPropertyNames<RewardSupply>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatRewardSupplyProps = Omit<RewardSupplyProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class RewardSupply implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public amount?: bigint;
    

    get _name(): string {
        return 'RewardSupply';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save RewardSupply entity without an ID");
        await store.set('RewardSupply', id.toString(), this as unknown as CompatRewardSupplyProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove RewardSupply entity without an ID");
        await store.remove('RewardSupply', id.toString());
    }

    static async get(id: string): Promise<RewardSupply | undefined> {
        assert((id !== null && id !== undefined), "Cannot get RewardSupply entity without an ID");
        const record = await store.get('RewardSupply', id.toString());
        if (record) {
            return this.create(record as unknown as RewardSupplyProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<RewardSupplyProps>[], options: GetOptions<RewardSupplyProps>): Promise<RewardSupply[]> {
        const records = await store.getByFields<CompatRewardSupplyProps>('RewardSupply', filter  as unknown as FieldsExpression<CompatRewardSupplyProps>[], options as unknown as GetOptions<CompatRewardSupplyProps>);
        return records.map(record => this.create(record as unknown as RewardSupplyProps));
    }

    static create(record: RewardSupplyProps): RewardSupply {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
