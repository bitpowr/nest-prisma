"use strict";
/**
 * @file COMP
 * @desc These methods facilitate interactions with the COMP token smart
 *     contract.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createDelegateSignature = exports.delegateBySig = exports.delegate = exports.claimComp = exports.getCompAccrued = exports.getCompBalance = void 0;
var ethers_1 = require("ethers");
var eth = __importStar(require("./eth"));
var helpers_1 = require("./helpers");
var constants_1 = require("./constants");
var EIP712_1 = require("./EIP712");
var keccak256 = ethers_1.ethers.utils.keccak256;
/**
 * Applies the EIP-55 checksum to an Ethereum address.
 *
 * @param {string} _address The Ethereum address to apply the checksum.
 *
 * @returns {string} Returns a string of the Ethereum address.
 */
function toChecksumAddress(_address) {
    var chars = _address.toLowerCase().substring(2).split('');
    var expanded = new Uint8Array(40);
    for (var i = 0; i < 40; i++) {
        expanded[i] = chars[i].charCodeAt(0);
    }
    var hash = keccak256(expanded);
    var ret = '';
    for (var i = 0; i < _address.length; i++) {
        if (parseInt(hash[i], 16) >= 8) {
            ret += _address[i].toUpperCase();
        }
        else {
            ret += _address[i];
        }
    }
    return ret;
}
/**
 * Get the balance of COMP tokens held by an address.
 *
 * @param {string} _address The address in which to find the COMP balance.
 * @param {Provider | string} [_provider] An Ethers.js provider or valid network
 *     name string.
 *
 * @returns {string} Returns a string of the numeric balance of COMP. The value
 *     is scaled up by 18 decimal places.
 *
 * @example
 *
 * ```
 * (async function () {
 *   const bal = await Compound.comp.getCompBalance('0x2775b1c75658Be0F640272CCb8c72ac986009e38');
 *   console.log('Balance', bal);
 * })().catch(console.error);
 * ```
 */
function getCompBalance(_address, _provider) {
    if (_provider === void 0) { _provider = 'mainnet'; }
    return __awaiter(this, void 0, void 0, function () {
        var provider, net, errorPrefix, compAddress, parameters, trxOptions, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, eth._createProvider({ provider: _provider })];
                case 1:
                    provider = _a.sent();
                    return [4 /*yield*/, eth.getProviderNetwork(provider)];
                case 2:
                    net = _a.sent();
                    errorPrefix = 'Compound [getCompBalance] | ';
                    if (typeof _address !== 'string') {
                        throw Error(errorPrefix + 'Argument `_address` must be a string.');
                    }
                    try {
                        _address = toChecksumAddress(_address);
                    }
                    catch (e) {
                        throw Error(errorPrefix + 'Argument `_address` must be a valid Ethereum address.');
                    }
                    compAddress = constants_1.address[net.name].COMP;
                    parameters = [_address];
                    trxOptions = {
                        _compoundProvider: provider,
                        abi: constants_1.abi.COMP
                    };
                    return [4 /*yield*/, eth.read(compAddress, 'balanceOf', parameters, trxOptions)];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result.toString()];
            }
        });
    });
}
exports.getCompBalance = getCompBalance;
/**
 * Get the amount of COMP tokens accrued but not yet claimed by an address.
 *
 * @param {string} _address The address in which to find the COMP accrued.
 * @param {Provider | string} [_provider] An Ethers.js provider or valid network
 *     name string.
 *
 * @returns {string} Returns a string of the numeric accruement of COMP. The
 *     value is scaled up by 18 decimal places.
 *
 * @example
 *
 * ```
 * (async function () {
 *   const acc = await Compound.comp.getCompAccrued('0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5');
 *   console.log('Accrued', acc);
 * })().catch(console.error);
 * ```
 */
function getCompAccrued(_address, _provider) {
    if (_provider === void 0) { _provider = 'mainnet'; }
    return __awaiter(this, void 0, void 0, function () {
        var provider, net, errorPrefix, lensAddress, compAddress, comptrollerAddress, parameters, trxOptions, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, eth._createProvider({ provider: _provider })];
                case 1:
                    provider = _a.sent();
                    return [4 /*yield*/, eth.getProviderNetwork(provider)];
                case 2:
                    net = _a.sent();
                    errorPrefix = 'Compound [getCompAccrued] | ';
                    if (typeof _address !== 'string') {
                        throw Error(errorPrefix + 'Argument `_address` must be a string.');
                    }
                    try {
                        _address = toChecksumAddress(_address);
                    }
                    catch (e) {
                        throw Error(errorPrefix + 'Argument `_address` must be a valid Ethereum address.');
                    }
                    lensAddress = constants_1.address[net.name].CompoundLens;
                    compAddress = constants_1.address[net.name].COMP;
                    comptrollerAddress = constants_1.address[net.name].Comptroller;
                    parameters = [compAddress, comptrollerAddress, _address];
                    trxOptions = {
                        _compoundProvider: provider,
                        abi: constants_1.abi.CompoundLens
                    };
                    return [4 /*yield*/, eth.read(lensAddress, 'getCompBalanceMetadataExt', parameters, trxOptions)];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result.allocated.toString()];
            }
        });
    });
}
exports.getCompAccrued = getCompAccrued;
/**
 * Create a transaction to claim accrued COMP tokens for the user.
 *
 * @param {CallOptions} [options] Options to set for a transaction and Ethers.js
 *     method overrides.
 *
 * @returns {object} Returns an Ethers.js transaction object of the vote
 *     transaction.
 *
 * @example
 *
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * (async function() {
 *
 *   console.log('Claiming COMP...');
 *   const trx = await compound.claimComp();
 *   console.log('Ethers.js transaction object', trx);
 *
 * })().catch(console.error);
 * ```
 */
function claimComp(options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var userAddress, comptrollerAddress, trxOptions, parameters, method, e_1, errorPrefix;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers_1.netId(this)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    userAddress = this._provider.address;
                    if (!(!userAddress && this._provider.getAddress)) return [3 /*break*/, 4];
                    return [4 /*yield*/, this._provider.getAddress()];
                case 3:
                    userAddress = _a.sent();
                    _a.label = 4;
                case 4:
                    comptrollerAddress = constants_1.address[this._network.name].Comptroller;
                    trxOptions = __assign(__assign({}, options), { _compoundProvider: this._provider, abi: constants_1.abi.Comptroller });
                    parameters = [userAddress];
                    method = 'claimComp(address)';
                    return [2 /*return*/, eth.trx(comptrollerAddress, method, parameters, trxOptions)];
                case 5:
                    e_1 = _a.sent();
                    errorPrefix = 'Compound [claimComp] | ';
                    e_1.message = errorPrefix + e_1.message;
                    return [2 /*return*/, e_1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.claimComp = claimComp;
/**
 * Create a transaction to delegate Compound Governance voting rights to an
 *     address.
 *
 * @param {string} _address The address in which to delegate voting rights to.
 * @param {CallOptions} [options] Options to set for `eth_call`, optional ABI
 *     (as JSON object), and Ethers.js method overrides. The ABI can be a string
 *     of the single intended method, an array of many methods, or a JSON object
 *     of the ABI generated by a Solidity compiler.
 *
 * @returns {object} Returns an Ethers.js transaction object of the vote
 *     transaction.
 *
 * @example
 *
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * (async function() {
 *   const delegateTx = await compound.delegate('0xa0df350d2637096571F7A701CBc1C5fdE30dF76A');
 *   console.log('Ethers.js transaction object', delegateTx);
 * })().catch(console.error);
 * ```
 */
function delegate(_address, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var errorPrefix, compAddress, trxOptions, parameters, method;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers_1.netId(this)];
                case 1:
                    _a.sent();
                    errorPrefix = 'Compound [delegate] | ';
                    if (typeof _address !== 'string') {
                        throw Error(errorPrefix + 'Argument `_address` must be a string.');
                    }
                    try {
                        _address = toChecksumAddress(_address);
                    }
                    catch (e) {
                        throw Error(errorPrefix + 'Argument `_address` must be a valid Ethereum address.');
                    }
                    compAddress = constants_1.address[this._network.name].COMP;
                    trxOptions = __assign(__assign({}, options), { _compoundProvider: this._provider, abi: constants_1.abi.COMP });
                    parameters = [_address];
                    method = 'delegate';
                    return [2 /*return*/, eth.trx(compAddress, method, parameters, trxOptions)];
            }
        });
    });
}
exports.delegate = delegate;
/**
 * Delegate voting rights in Compound Governance using an EIP-712 signature.
 *
 * @param {string} _address The address to delegate the user's voting rights to.
 * @param {number} nonce The contract state required to match the signature.
 *     This can be retrieved from the COMP contract's public nonces mapping.
 * @param {number} expiry The time at which to expire the signature. A block
 *     timestamp as seconds since the unix epoch.
 * @param {object} signature An object that contains the v, r, and, s values of
 *     an EIP-712 signature.
 * @param {CallOptions} [options] Options to set for `eth_call`, optional ABI
 *     (as JSON object), and Ethers.js method overrides. The ABI can be a string
 *     of the single intended method, an array of many methods, or a JSON object
 *     of the ABI generated by a Solidity compiler.
 *
 * @returns {object} Returns an Ethers.js transaction object of the vote
 *     transaction.
 *
 * @example
 *
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * (async function() {
 *   const delegateTx = await compound.delegateBySig(
 *     '0xa0df350d2637096571F7A701CBc1C5fdE30dF76A',
 *     42,
 *     9999999999,
 *     {
 *       v: '0x1b',
 *       r: '0x130dbca2fafa07424c033b4479687cc1deeb65f08809e3ab397988cc4c6f2e78',
 *       s: '0x1debeb8250262f23906b1177161f0c7c9aa3641e8bff5b6f5c88a6bb78d5d8cd'
 *     }
 *   );
 *   console.log('Ethers.js transaction object', delegateTx);
 * })().catch(console.error);
 * ```
 */
function delegateBySig(_address, nonce, expiry, signature, options) {
    if (signature === void 0) { signature = { v: '', r: '', s: '' }; }
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var errorPrefix, compAddress, trxOptions, v, r, s, parameters, method;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers_1.netId(this)];
                case 1:
                    _a.sent();
                    errorPrefix = 'Compound [delegateBySig] | ';
                    if (typeof _address !== 'string') {
                        throw Error(errorPrefix + 'Argument `_address` must be a string.');
                    }
                    try {
                        _address = toChecksumAddress(_address);
                    }
                    catch (e) {
                        throw Error(errorPrefix + 'Argument `_address` must be a valid Ethereum address.');
                    }
                    if (typeof nonce !== 'number') {
                        throw Error(errorPrefix + 'Argument `nonce` must be an integer.');
                    }
                    if (typeof expiry !== 'number') {
                        throw Error(errorPrefix + 'Argument `expiry` must be an integer.');
                    }
                    if (!Object.isExtensible(signature) ||
                        !signature.v ||
                        !signature.r ||
                        !signature.s) {
                        throw Error(errorPrefix + 'Argument `signature` must be an object that ' +
                            'contains the v, r, and s pieces of an EIP-712 signature.');
                    }
                    compAddress = constants_1.address[this._network.name].COMP;
                    trxOptions = __assign(__assign({}, options), { _compoundProvider: this._provider, abi: constants_1.abi.COMP });
                    v = signature.v, r = signature.r, s = signature.s;
                    parameters = [_address, nonce, expiry, v, r, s];
                    method = 'delegateBySig';
                    return [2 /*return*/, eth.trx(compAddress, method, parameters, trxOptions)];
            }
        });
    });
}
exports.delegateBySig = delegateBySig;
/**
 * Create a delegate signature for Compound Governance using EIP-712. The
 *     signature can be created without burning gas. Anyone can post it to the
 *     blockchain using the `delegateBySig` method, which does have gas costs.
 *
 * @param {string} delegatee The address to delegate the user's voting rights
 *     to.
 * @param {number} [expiry] The time at which to expire the signature. A block
 *     timestamp as seconds since the unix epoch. Defaults to `10e9`.
 *
 * @returns {object} Returns an object that contains the `v`, `r`, and `s`
 *     components of an Ethereum signature as hexadecimal strings.
 *
 * @example
 *
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * (async () => {
 *
 *   const delegateSignature = await compound.createDelegateSignature('0xa0df350d2637096571F7A701CBc1C5fdE30dF76A');
 *   console.log('delegateSignature', delegateSignature);
 *
 * })().catch(console.error);
 * ```
 */
function createDelegateSignature(delegatee, expiry) {
    if (expiry === void 0) { expiry = 10e9; }
    return __awaiter(this, void 0, void 0, function () {
        var provider, compAddress, chainId, userAddress, originalProvider, nonce, domain, primaryType, message, types, signer, signature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers_1.netId(this)];
                case 1:
                    _a.sent();
                    provider = this._provider;
                    compAddress = constants_1.address[this._network.name].COMP;
                    chainId = this._network.id;
                    userAddress = this._provider.address;
                    if (!(!userAddress && this._provider.getAddress)) return [3 /*break*/, 3];
                    return [4 /*yield*/, this._provider.getAddress()];
                case 2:
                    userAddress = _a.sent();
                    _a.label = 3;
                case 3:
                    originalProvider = this._originalProvider;
                    return [4 /*yield*/, eth.read(compAddress, 'function nonces(address) returns (uint)', [userAddress], { provider: originalProvider })];
                case 4:
                    nonce = +(_a.sent()).toString();
                    domain = {
                        name: 'Compound',
                        chainId: chainId,
                        verifyingContract: compAddress
                    };
                    primaryType = 'Delegation';
                    message = { delegatee: delegatee, nonce: nonce, expiry: expiry };
                    types = {
                        EIP712Domain: [
                            { name: 'name', type: 'string' },
                            { name: 'chainId', type: 'uint256' },
                            { name: 'verifyingContract', type: 'address' },
                        ],
                        Delegation: [
                            { name: 'delegatee', type: 'address' },
                            { name: 'nonce', type: 'uint256' },
                            { name: 'expiry', type: 'uint256' }
                        ]
                    };
                    signer = provider.getSigner ? provider.getSigner() : provider;
                    return [4 /*yield*/, EIP712_1.sign(domain, primaryType, message, types, signer)];
                case 5:
                    signature = _a.sent();
                    return [2 /*return*/, signature];
            }
        });
    });
}
exports.createDelegateSignature = createDelegateSignature;
//# sourceMappingURL=comp.js.map