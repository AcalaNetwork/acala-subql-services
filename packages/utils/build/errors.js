"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotSystemAccount = void 0;
class NotSystemAccount extends Error {
    constructor(target) {
        super();
        this.message = `${target} is not a system account.`;
        this.name = 'NotSystemAccount';
    }
}
exports.NotSystemAccount = NotSystemAccount;
