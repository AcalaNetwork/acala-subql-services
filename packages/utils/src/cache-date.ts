import { set, get } from 'lodash'

export class CacheDate<T> {
    private cleanValve: number
    private accessCount: number
    private data: Record<
        string,
        {
            accessCount: number
            data: Record<string, T>
        }
    >

    constructor(cleanValve?: number) {
        this.cleanValve = cleanValve || 5
        this.accessCount = 0
        this.data = {}
    }

    public autoClean(block: number) {
        this.accessCount += 1

        if (this.data?.[block]) {
            this.data[block]['accessCount'] += 1
        }

        const keys = Object.keys(this.data)

        keys.forEach((key: string) => {
            if (this.accessCount - this.data[key].accessCount > this.cleanValve) {
                delete this.data[key]
            }
        })
    }

    public get(block: number, key: string) {
        this.autoClean(block)

        return get(this.data, [block, key])
    }

    public set(block: number, key: string, value: T) {
        this.autoClean(block)

        return set(this.data, [block, key], value)
    }
}
