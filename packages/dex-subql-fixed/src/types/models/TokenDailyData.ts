// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type TokenDailyDataProps = Omit<TokenDailyData, NonNullable<FunctionPropertyNames<TokenDailyData>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatTokenDailyDataProps = Omit<TokenDailyDataProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class TokenDailyData implements CompatEntity {

    constructor(
        
        id: string,
        tokenId: string,
        amount: bigint,
        tvl: bigint,
        dailyTradeVolume: bigint,
        dailyTradeVolumeUSD: bigint,
        dailyTxCount: bigint,
    ) {
        this.id = id;
        this.tokenId = tokenId;
        this.amount = amount;
        this.tvl = tvl;
        this.dailyTradeVolume = dailyTradeVolume;
        this.dailyTradeVolumeUSD = dailyTradeVolumeUSD;
        this.dailyTxCount = dailyTxCount;
        
    }

    public id: string;
    public tokenId: string;
    public amount: bigint;
    public tvl: bigint;
    public dailyTradeVolume: bigint;
    public dailyTradeVolumeUSD: bigint;
    public dailyTxCount: bigint;
    public price?: bigint;
    public timestamp?: Date;
    public updateAtBlockId?: string;
    

    get _name(): string {
        return 'TokenDailyData';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save TokenDailyData entity without an ID");
        await store.set('TokenDailyData', id.toString(), this as unknown as CompatTokenDailyDataProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove TokenDailyData entity without an ID");
        await store.remove('TokenDailyData', id.toString());
    }

    static async get(id: string): Promise<TokenDailyData | undefined> {
        assert((id !== null && id !== undefined), "Cannot get TokenDailyData entity without an ID");
        const record = await store.get('TokenDailyData', id.toString());
        if (record) {
            return this.create(record as unknown as TokenDailyDataProps);
        } else {
            return;
        }
    }

    static async getByTokenId(tokenId: string, options: GetOptions<CompatTokenDailyDataProps>): Promise<TokenDailyData[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatTokenDailyDataProps>('TokenDailyData', 'tokenId', tokenId, options);
        return records.map(record => this.create(record as unknown as TokenDailyDataProps));
    }
    

    static async getByUpdateAtBlockId(updateAtBlockId: string, options: GetOptions<CompatTokenDailyDataProps>): Promise<TokenDailyData[]> {
        // Inputs must be cast as the store interface has not been updated to support alternative ID types
        const records = await store.getByField<CompatTokenDailyDataProps>('TokenDailyData', 'updateAtBlockId', updateAtBlockId, options);
        return records.map(record => this.create(record as unknown as TokenDailyDataProps));
    }
    


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<TokenDailyDataProps>[], options: GetOptions<TokenDailyDataProps>): Promise<TokenDailyData[]> {
        const records = await store.getByFields<CompatTokenDailyDataProps>('TokenDailyData', filter  as unknown as FieldsExpression<CompatTokenDailyDataProps>[], options as unknown as GetOptions<CompatTokenDailyDataProps>);
        return records.map(record => this.create(record as unknown as TokenDailyDataProps));
    }

    static create(record: TokenDailyDataProps): TokenDailyData {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.tokenId,
            record.amount,
            record.tvl,
            record.dailyTradeVolume,
            record.dailyTradeVolumeUSD,
            record.dailyTxCount,
        );
        Object.assign(entity,record);
        return entity;
    }
}
