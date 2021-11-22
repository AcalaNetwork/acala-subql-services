export class SystemAccountNotFound extends Error {
    constructor(target: string) {
        super()

        this.message = `${target} is not found.`
        this.name = 'SystemAccountNotFound'
    }
}
