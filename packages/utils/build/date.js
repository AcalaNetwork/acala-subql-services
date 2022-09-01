"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartOfHour = exports.getStartOfDay = exports.getEndOfHour = exports.getEndOfDay = void 0;
const tslib_1 = require("tslib");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
function getEndOfDay(date) {
    return (0, dayjs_1.default)(date).endOf('day').toDate();
}
exports.getEndOfDay = getEndOfDay;
function getEndOfHour(date) {
    return (0, dayjs_1.default)(date).endOf('hour').toDate();
}
exports.getEndOfHour = getEndOfHour;
function getStartOfDay(date) {
    return (0, dayjs_1.default)(date).startOf('d').toDate();
}
exports.getStartOfDay = getStartOfDay;
function getStartOfHour(date) {
    return (0, dayjs_1.default)(date).startOf('hour').toDate();
}
exports.getStartOfHour = getStartOfHour;
