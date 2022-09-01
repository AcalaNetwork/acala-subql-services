"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTreasuryAccount = exports.getSystemAccountName = exports.isSystemAccount = exports.getPublicKey = exports.getPalletAddress = void 0;
const util_1 = require("@polkadot/util");
const util_crypto_1 = require("@polkadot/util-crypto");
const defaults_1 = require("@polkadot/util-crypto/address/defaults");
const errors_1 = require("./errors");
const DEFAULT_PREFIX = api.registry.chainSS58 || defaults_1.defaults.prefix;
function getPalletAddress(value, prefix = DEFAULT_PREFIX) {
    return (0, util_crypto_1.encodeAddress)((0, util_1.u8aToU8a)((0, util_1.stringToU8a)(`modl${value}`.padEnd(32, '\0'))), prefix);
}
exports.getPalletAddress = getPalletAddress;
/** get address public key */
function getPublicKey(address) {
    return (0, util_1.u8aToHex)((0, util_crypto_1.decodeAddress)(address));
}
exports.getPublicKey = getPublicKey;
/** return true when the address is a system address */
function isSystemAccount(address) {
    const publicKey = getPublicKey(address);
    return publicKey.startsWith((0, util_1.stringToHex)('modl'));
}
exports.isSystemAccount = isSystemAccount;
/** return system pallet id */
function getSystemAccountName(address) {
    if (!isSystemAccount(address))
        throw new errors_1.NotSystemAccount(address);
    const publicKey = getPublicKey(address);
    // should remove all tail zero
    return (0, util_1.hexToString)(publicKey.replace(/0+$/, ''));
}
exports.getSystemAccountName = getSystemAccountName;
/** return treasury account address */
function getTreasuryAccount(prefix = DEFAULT_PREFIX) {
    return getPalletAddress('aca/trsy', prefix);
}
exports.getTreasuryAccount = getTreasuryAccount;
