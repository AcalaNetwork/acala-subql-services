export class NotSystemAccount extends Error {
    constructor(target: string) {
        super()

        this.message = `${target} is not a system account.`
        this.name = 'NotSystemAccount'
    }
}
