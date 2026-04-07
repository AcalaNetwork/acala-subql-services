// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type ClaimedRewardProps = Omit<ClaimedReward, NonNullable<FunctionPropertyNames<ClaimedReward>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatClaimedRewardProps = Omit<ClaimedRewardProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class ClaimedReward implements CompatEntity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public totalAmount?: bigint;
    

    get _name(): string {
        return 'ClaimedReward';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save ClaimedReward entity without an ID");
        await store.set('ClaimedReward', id.toString(), this as unknown as CompatClaimedRewardProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove ClaimedReward entity without an ID");
        await store.remove('ClaimedReward', id.toString());
    }

    static async get(id: string): Promise<ClaimedReward | undefined> {
        assert((id !== null && id !== undefined), "Cannot get ClaimedReward entity without an ID");
        const record = await store.get('ClaimedReward', id.toString());
        if (record) {
            return this.create(record as unknown as ClaimedRewardProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<ClaimedRewardProps>[], options: GetOptions<ClaimedRewardProps>): Promise<ClaimedReward[]> {
        const records = await store.getByFields<CompatClaimedRewardProps>('ClaimedReward', filter  as unknown as FieldsExpression<CompatClaimedRewardProps>[], options as unknown as GetOptions<CompatClaimedRewardProps>);
        return records.map(record => this.create(record as unknown as ClaimedRewardProps));
    }

    static create(record: ClaimedRewardProps): ClaimedReward {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
