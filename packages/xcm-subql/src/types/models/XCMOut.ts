// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type XCMOutProps = Omit<XCMOut, NonNullable<FunctionPropertyNames<XCMOut>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatXCMOutProps = Omit<XCMOutProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class XCMOut implements CompatEntity {

    constructor(
        
        id: string,
        block: bigint,
        tx: string,
        fromAddress: string,
        toAddress: string,
        token: string,
        amountFromTokensEvent: bigint,
        amountFromXTokensEvent: bigint,
        timestamp: Date,
    ) {
        this.id = id;
        this.block = block;
        this.tx = tx;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.token = token;
        this.amountFromTokensEvent = amountFromTokensEvent;
        this.amountFromXTokensEvent = amountFromXTokensEvent;
        this.timestamp = timestamp;
        
    }

    public id: string;
    public block: bigint;
    public tx: string;
    public fromAddress: string;
    public toAddress: string;
    public token: string;
    public amountFromTokensEvent: bigint;
    public amountFromXTokensEvent: bigint;
    public timestamp: Date;
    

    get _name(): string {
        return 'XCMOut';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save XCMOut entity without an ID");
        await store.set('XCMOut', id.toString(), this as unknown as CompatXCMOutProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove XCMOut entity without an ID");
        await store.remove('XCMOut', id.toString());
    }

    static async get(id: string): Promise<XCMOut | undefined> {
        assert((id !== null && id !== undefined), "Cannot get XCMOut entity without an ID");
        const record = await store.get('XCMOut', id.toString());
        if (record) {
            return this.create(record as unknown as XCMOutProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<XCMOutProps>[], options: GetOptions<XCMOutProps>): Promise<XCMOut[]> {
        const records = await store.getByFields<CompatXCMOutProps>('XCMOut', filter  as unknown as FieldsExpression<CompatXCMOutProps>[], options as unknown as GetOptions<CompatXCMOutProps>);
        return records.map(record => this.create(record as unknown as XCMOutProps));
    }

    static create(record: XCMOutProps): XCMOut {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.block,
            record.tx,
            record.fromAddress,
            record.toAddress,
            record.token,
            record.amountFromTokensEvent,
            record.amountFromXTokensEvent,
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
