"use strict";
/**
 * @file cToken
 * @desc These methods facilitate interactions with the cToken smart
 *     contracts.
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
exports.repayBorrow = exports.borrow = exports.redeem = exports.supply = void 0;
var ethers_1 = require("ethers");
var eth = __importStar(require("./eth"));
var helpers_1 = require("./helpers");
var constants_1 = require("./constants");
/**
 * Supplies the user's Ethereum asset to the Compound Protocol.
 *
 * @param {string} asset A string of the asset to supply.
 * @param {number | string | BigNumber} amount A string, number, or BigNumber
 *     object of the amount of an asset to supply. Use the `mantissa` boolean in
 *     the `options` parameter to indicate if this value is scaled up (so there
 *     are no decimals) or in its natural scale.
 * @param {boolean} noApprove Explicitly prevent this method from attempting an
 *     ERC-20 `approve` transaction prior to sending the `mint` transaction.
 * @param {CallOptions} [options] Call options and Ethers.js overrides for the
 *     transaction. A passed `gasLimit` will be used in both the `approve` (if
 *     not supressed) and `mint` transactions.
 *
 * @returns {object} Returns an Ethers.js transaction object of the supply
 *     transaction.
 *
 * @example
 *
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * // Ethers.js overrides are an optional 3rd parameter for `supply`
 * // const trxOptions = { gasLimit: 250000, mantissa: false };
 *
 * (async function() {
 *
 *   console.log('Supplying ETH to the Compound Protocol...');
 *   const trx = await compound.supply(Compound.ETH, 1);
 *   console.log('Ethers.js transaction object', trx);
 *
 * })().catch(console.error);
 * ```
 */
function supply(asset, amount, noApprove, options) {
    if (noApprove === void 0) { noApprove = false; }
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var errorPrefix, cTokenName, cTokenAddress, underlyingAddress, userAddress, allowance, notEnough, parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers_1.netId(this)];
                case 1:
                    _a.sent();
                    errorPrefix = 'Compound [supply] | ';
                    cTokenName = 'c' + asset;
                    cTokenAddress = constants_1.address[this._network.name][cTokenName];
                    if (!cTokenAddress || !constants_1.underlyings.includes(asset)) {
                        throw Error(errorPrefix + 'Argument `asset` cannot be supplied.');
                    }
                    if (typeof amount !== 'number' &&
                        typeof amount !== 'string' &&
                        !ethers_1.ethers.BigNumber.isBigNumber(amount)) {
                        throw Error(errorPrefix + 'Argument `amount` must be a string, number, or BigNumber.');
                    }
                    if (!options.mantissa) {
                        amount = +amount;
                        amount = amount * Math.pow(10, constants_1.decimals[asset]);
                    }
                    amount = ethers_1.ethers.BigNumber.from(amount.toString());
                    if (cTokenName === constants_1.constants.cETH) {
                        options.abi = constants_1.abi.cEther;
                    }
                    else {
                        options.abi = constants_1.abi.cErc20;
                    }
                    options._compoundProvider = this._provider;
                    if (!(cTokenName !== constants_1.constants.cETH && noApprove !== true)) return [3 /*break*/, 6];
                    underlyingAddress = constants_1.address[this._network.name][asset];
                    userAddress = this._provider.address;
                    if (!(!userAddress && this._provider.getAddress)) return [3 /*break*/, 3];
                    return [4 /*yield*/, this._provider.getAddress()];
                case 2:
                    userAddress = _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, eth.read(underlyingAddress, 'allowance', [userAddress, cTokenAddress], options)];
                case 4:
                    allowance = _a.sent();
                    notEnough = allowance.lt(amount);
                    if (!notEnough) return [3 /*break*/, 6];
                    // ERC-20 approve transaction
                    return [4 /*yield*/, eth.trx(underlyingAddress, 'approve', [cTokenAddress, amount], options)];
                case 5:
                    // ERC-20 approve transaction
                    _a.sent();
                    _a.label = 6;
                case 6:
                    parameters = [];
                    if (cTokenName === constants_1.constants.cETH) {
                        options.value = amount;
                    }
                    else {
                        parameters.push(amount);
                    }
                    return [2 /*return*/, eth.trx(cTokenAddress, 'mint', parameters, options)];
            }
        });
    });
}
exports.supply = supply;
/**
 * Redeems the user's Ethereum asset from the Compound Protocol.
 *
 * @param {string} asset A string of the asset to redeem, or its cToken name.
 * @param {number | string | BigNumber} amount A string, number, or BigNumber
 *     object of the amount of an asset to redeem. Use the `mantissa` boolean in
 *     the `options` parameter to indicate if this value is scaled up (so there
 *     are no decimals) or in its natural scale. This can be an amount of
 *     cTokens or underlying asset (use the `asset` parameter to specify).
 * @param {CallOptions} [options] Call options and Ethers.js overrides for the
 *     transaction.
 *
 * @returns {object} Returns an Ethers.js transaction object of the redeem
 *     transaction.
 *
 * @example
 *
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * (async function() {
 *
 *   console.log('Redeeming ETH...');
 *   const trx = await compound.redeem(Compound.ETH, 1); // also accepts cToken args
 *   console.log('Ethers.js transaction object', trx);
 *
 * })().catch(console.error);
 * ```
 */
function redeem(asset, amount, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var errorPrefix, assetIsCToken, cTokenName, cTokenAddress, underlyingName, trxOptions, parameters, method;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers_1.netId(this)];
                case 1:
                    _a.sent();
                    errorPrefix = 'Compound [redeem] | ';
                    if (typeof asset !== 'string' || asset.length < 1) {
                        throw Error(errorPrefix + 'Argument `asset` must be a non-empty string.');
                    }
                    assetIsCToken = asset[0] === 'c';
                    cTokenName = assetIsCToken ? asset : 'c' + asset;
                    cTokenAddress = constants_1.address[this._network.name][cTokenName];
                    underlyingName = assetIsCToken ? asset.slice(1, asset.length) : asset;
                    if (!constants_1.cTokens.includes(cTokenName) || !constants_1.underlyings.includes(underlyingName)) {
                        throw Error(errorPrefix + 'Argument `asset` is not supported.');
                    }
                    if (typeof amount !== 'number' &&
                        typeof amount !== 'string' &&
                        !ethers_1.ethers.BigNumber.isBigNumber(amount)) {
                        throw Error(errorPrefix + 'Argument `amount` must be a string, number, or BigNumber.');
                    }
                    if (!options.mantissa) {
                        amount = +amount;
                        amount = amount * Math.pow(10, constants_1.decimals[asset]);
                    }
                    amount = ethers_1.ethers.BigNumber.from(amount.toString());
                    trxOptions = __assign(__assign({}, options), { _compoundProvider: this._provider, abi: cTokenName === constants_1.constants.cETH ? constants_1.abi.cEther : constants_1.abi.cErc20 });
                    parameters = [amount];
                    method = assetIsCToken ? 'redeem' : 'redeemUnderlying';
                    return [2 /*return*/, eth.trx(cTokenAddress, method, parameters, trxOptions)];
            }
        });
    });
}
exports.redeem = redeem;
/**
 * Borrows an Ethereum asset from the Compound Protocol for the user. The user's
 *     address must first have supplied collateral and entered a corresponding
 *     market.
 *
 * @param {string} asset A string of the asset to borrow (must be a supported
 *     underlying asset).
 * @param {number | string | BigNumber} amount A string, number, or BigNumber
 *     object of the amount of an asset to borrow. Use the `mantissa` boolean in
 *     the `options` parameter to indicate if this value is scaled up (so there
 *     are no decimals) or in its natural scale.
 * @param {CallOptions} [options] Call options and Ethers.js overrides for the
 *     transaction.
 *
 * @returns {object} Returns an Ethers.js transaction object of the borrow
 *     transaction.
 *
 * @example
 *
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * (async function() {
 *
 *   const daiScaledUp = '32000000000000000000';
 *   const trxOptions = { mantissa: true };
 *
 *   console.log('Borrowing 32 Dai...');
 *   const trx = await compound.borrow(Compound.DAI, daiScaledUp, trxOptions);
 *
 *   console.log('Ethers.js transaction object', trx);
 *
 * })().catch(console.error);
 * ```
 */
function borrow(asset, amount, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var errorPrefix, cTokenName, cTokenAddress, trxOptions, parameters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers_1.netId(this)];
                case 1:
                    _a.sent();
                    errorPrefix = 'Compound [borrow] | ';
                    cTokenName = 'c' + asset;
                    cTokenAddress = constants_1.address[this._network.name][cTokenName];
                    if (!cTokenAddress || !constants_1.underlyings.includes(asset)) {
                        throw Error(errorPrefix + 'Argument `asset` cannot be borrowed.');
                    }
                    if (typeof amount !== 'number' &&
                        typeof amount !== 'string' &&
                        !ethers_1.ethers.BigNumber.isBigNumber(amount)) {
                        throw Error(errorPrefix + 'Argument `amount` must be a string, number, or BigNumber.');
                    }
                    if (!options.mantissa) {
                        amount = +amount;
                        amount = amount * Math.pow(10, constants_1.decimals[asset]);
                    }
                    amount = ethers_1.ethers.BigNumber.from(amount.toString());
                    trxOptions = __assign(__assign({}, options), { _compoundProvider: this._provider });
                    parameters = [amount];
                    trxOptions.abi = cTokenName === constants_1.constants.cETH ? constants_1.abi.cEther : constants_1.abi.cErc20;
                    return [2 /*return*/, eth.trx(cTokenAddress, 'borrow', parameters, trxOptions)];
            }
        });
    });
}
exports.borrow = borrow;
/**
 * Repays a borrowed Ethereum asset for the user or on behalf of another
 *     Ethereum address.
 *
 * @param {string} asset A string of the asset that was borrowed (must be a
 *     supported underlying asset).
 * @param {number | string | BigNumber} amount A string, number, or BigNumber
 *     object of the amount of an asset to borrow. Use the `mantissa` boolean in
 *     the `options` parameter to indicate if this value is scaled up (so there
 *     are no decimals) or in its natural scale.
 * @param {string | null} [borrower] The Ethereum address of the borrower to
 *     repay an open borrow for. Set this to `null` if the user is repaying
 *     their own borrow.
 * @param {boolean} noApprove Explicitly prevent this method from attempting an
 *     ERC-20 `approve` transaction prior to sending the subsequent repayment
 *     transaction.
 * @param {CallOptions} [options] Call options and Ethers.js overrides for the
 *     transaction. A passed `gasLimit` will be used in both the `approve` (if
 *     not supressed) and `repayBorrow` or `repayBorrowBehalf` transactions.
 *
 * @returns {object} Returns an Ethers.js transaction object of the repayBorrow
 *     or repayBorrowBehalf transaction.
 *
 * @example
 *
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * (async function() {
 *
 *   console.log('Repaying Dai borrow...');
 *   const address = null; // set this to any address to repayBorrowBehalf
 *   const trx = await compound.repayBorrow(Compound.DAI, 32, address);
 *
 *   console.log('Ethers.js transaction object', trx);
 *
 * })().catch(console.error);
 * ```
 */
function repayBorrow(asset, amount, borrower, noApprove, options) {
    if (noApprove === void 0) { noApprove = false; }
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var errorPrefix, cTokenName, cTokenAddress, method, trxOptions, parameters, underlyingAddress, userAddress, allowance, notEnough;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers_1.netId(this)];
                case 1:
                    _a.sent();
                    errorPrefix = 'Compound [repayBorrow] | ';
                    cTokenName = 'c' + asset;
                    cTokenAddress = constants_1.address[this._network.name][cTokenName];
                    if (!cTokenAddress || !constants_1.underlyings.includes(asset)) {
                        throw Error(errorPrefix + 'Argument `asset` is not supported.');
                    }
                    if (typeof amount !== 'number' &&
                        typeof amount !== 'string' &&
                        !ethers_1.ethers.BigNumber.isBigNumber(amount)) {
                        throw Error(errorPrefix + 'Argument `amount` must be a string, number, or BigNumber.');
                    }
                    method = ethers_1.ethers.utils.isAddress(borrower) ? 'repayBorrowBehalf' : 'repayBorrow';
                    if (borrower && method === 'repayBorrow') {
                        throw Error(errorPrefix + 'Invalid `borrower` address.');
                    }
                    if (!options.mantissa) {
                        amount = +amount;
                        amount = amount * Math.pow(10, constants_1.decimals[asset]);
                    }
                    amount = ethers_1.ethers.BigNumber.from(amount.toString());
                    trxOptions = __assign(__assign({}, options), { _compoundProvider: this._provider });
                    parameters = method === 'repayBorrowBehalf' ? [borrower] : [];
                    if (cTokenName === constants_1.constants.cETH) {
                        trxOptions.value = amount;
                        trxOptions.abi = constants_1.abi.cEther;
                    }
                    else {
                        parameters.push(amount);
                        trxOptions.abi = constants_1.abi.cErc20;
                    }
                    if (!(cTokenName !== constants_1.constants.cETH && noApprove !== true)) return [3 /*break*/, 4];
                    underlyingAddress = constants_1.address[this._network.name][asset];
                    userAddress = this._provider.address;
                    return [4 /*yield*/, eth.read(underlyingAddress, 'allowance', [userAddress, cTokenAddress], trxOptions)];
                case 2:
                    allowance = _a.sent();
                    notEnough = allowance.lt(amount);
                    if (!notEnough) return [3 /*break*/, 4];
                    // ERC-20 approve transaction
                    return [4 /*yield*/, eth.trx(underlyingAddress, 'approve', [cTokenAddress, amount], trxOptions)];
                case 3:
                    // ERC-20 approve transaction
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, eth.trx(cTokenAddress, method, parameters, trxOptions)];
            }
        });
    });
}
exports.repayBorrow = repayBorrow;
//# sourceMappingURL=cToken.js.map