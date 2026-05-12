// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type HourTokenProps = Omit<HourToken, NonNullable<FunctionPropertyNames<HourToken>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatHourTokenProps = Omit<HourTokenProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class HourToken implements CompatEntity {

    constructor(
        
        id: string,
        tokenId: string,
        volume: bigint,
        issuance: bigint,
        reserved: bigint,
    ) {
        this.id = id;
        this.tokenId = tokenId;
        this.volume = volume;
        this.issuance = issuance;
        this.reserved = reserved;
        
    }

    public id: string;
    public tokenId: string;
    public volume: bigint;
    public issuance: bigint;
    public reserved: bigint;
    public timestmap?: Date;
    public updateAtBlock?: bigint;
    

    get _name(): string {
        return 'HourToken';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save HourToken entity without an ID");
        await store.set('HourToken', id.toString(), this as unknown as CompatHourTokenProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove HourToken entity without an ID");
        await store.remove('HourToken', id.toString());
    }

    static async get(id: string): Promise<HourToken | undefined> {
        assert((id !== null && id !== undefined), "Cannot get HourToken entity without an ID");
        const record = await store.get('HourToken', id.toString());
        if (record) {
            return this.create(record as unknown as HourTokenProps);
        } else {
            return;
        }
    }

    static async getByTokenId(tokenId: string, options: GetOptions<CompatHourTokenProps>): Promise<HourToken[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatHourTokenProps>('HourToken', 'tokenId', tokenId, options);
        return records.map(record => this.create(record as unknown as HourTokenProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<HourTokenProps>[], options: GetOptions<HourTokenProps>): Promise<HourToken[]> {
        const records = await store.getByFields<CompatHourTokenProps>('HourToken', filter  as unknown as FieldsExpression<CompatHourTokenProps>[], options as unknown as GetOptions<CompatHourTokenProps>);
        return records.map(record => this.create(record as unknown as HourTokenProps));
    }

    static create(record: HourTokenProps): HourToken {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.tokenId,
            record.volume,
            record.issuance,
            record.reserved,
        );
        Object.assign(entity,record);
        return entity;
    }
}
