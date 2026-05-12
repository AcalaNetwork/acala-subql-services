// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type XCMInProps = Omit<XCMIn, NonNullable<FunctionPropertyNames<XCMIn>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatXCMInProps = Omit<XCMInProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class XCMIn implements CompatEntity {

    constructor(
        
        id: string,
        block: bigint,
        token: string,
        fromAddress: string,
        toAddress: string,
        amount: bigint,
        toAddressReceive: bigint,
        treasuryReceive: bigint,
        timestamp: Date,
    ) {
        this.id = id;
        this.block = block;
        this.token = token;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.toAddressReceive = toAddressReceive;
        this.treasuryReceive = treasuryReceive;
        this.timestamp = timestamp;
        
    }

    public id: string;
    public block: bigint;
    public token: string;
    public fromAddress: string;
    public toAddress: string;
    public amount: bigint;
    public toAddressReceive: bigint;
    public treasuryReceive: bigint;
    public timestamp: Date;
    

    get _name(): string {
        return 'XCMIn';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save XCMIn entity without an ID");
        await store.set('XCMIn', id.toString(), this as unknown as CompatXCMInProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove XCMIn entity without an ID");
        await store.remove('XCMIn', id.toString());
    }

    static async get(id: string): Promise<XCMIn | undefined> {
        assert((id !== null && id !== undefined), "Cannot get XCMIn entity without an ID");
        const record = await store.get('XCMIn', id.toString());
        if (record) {
            return this.create(record as unknown as XCMInProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<XCMInProps>[], options: GetOptions<XCMInProps>): Promise<XCMIn[]> {
        const records = await store.getByFields<CompatXCMInProps>('XCMIn', filter  as unknown as FieldsExpression<CompatXCMInProps>[], options as unknown as GetOptions<CompatXCMInProps>);
        return records.map(record => this.create(record as unknown as XCMInProps));
    }

    static create(record: XCMInProps): XCMIn {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.block,
            record.token,
            record.fromAddress,
            record.toAddress,
            record.amount,
            record.toAddressReceive,
            record.treasuryReceive,
            record.timestamp,
        );
        Object.assign(entity,record);
        return entity;
    }
}
