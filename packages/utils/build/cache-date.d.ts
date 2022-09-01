export declare class CacheDate<T> {
    private cleanValve;
    private accessCount;
    private data;
    constructor(cleanValve?: number);
    autoClean(block: number): void;
    get(block: number, key: string): any;
    set(block: number, key: string, value: T): any;
}
