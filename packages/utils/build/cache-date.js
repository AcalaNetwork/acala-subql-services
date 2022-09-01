"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheDate = void 0;
const lodash_1 = require("lodash");
class CacheDate {
    constructor(cleanValve) {
        this.cleanValve = cleanValve || 5;
        this.accessCount = 0;
        this.data = {};
    }
    autoClean(block) {
        var _a;
        this.accessCount += 1;
        if ((_a = this.data) === null || _a === void 0 ? void 0 : _a[block]) {
            this.data[block]['accessCount'] += 1;
        }
        const keys = Object.keys(this.data);
        keys.forEach((key) => {
            if (this.accessCount - this.data[key].accessCount > this.cleanValve) {
                delete this.data[key];
            }
        });
    }
    get(block, key) {
        this.autoClean(block);
        return (0, lodash_1.get)(this.data, [block, key]);
    }
    set(block, key, value) {
        this.autoClean(block);
        return (0, lodash_1.set)(this.data, [block, key], value);
    }
}
exports.CacheDate = CacheDate;
