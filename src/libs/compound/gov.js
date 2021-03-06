"use strict";
/**
 * @file Governance
 * @desc These methods facilitate interactions with the Governor smart contract.
 */
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
exports.castVoteWithReason = exports.createVoteSignature = exports.castVoteBySig = exports.castVote = void 0;
var eth = __importStar(require("./eth"));
var helpers_1 = require("./helpers");
var constants_1 = require("./constants");
var EIP712_1 = require("./EIP712");
/**
 * Submit a vote on a Compound Governance proposal.
 *
 * @param {string} proposalId The ID of the proposal to vote on. This is an
 *     auto-incrementing integer in the Governor contract.
 * @param {number} support A number value of 0, 1, or 2 for the proposal vote.
 *     The numbers correspond to 'in-favor', 'against', and 'abstain'
 *     respectively.
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
 *   const castVoteTx = await compound.castVote(12, 1);
 *   console.log('Ethers.js transaction object', castVoteTx);
 * })().catch(console.error);
 * ```
 */
function castVote(proposalId, support, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var errorPrefix, governorAddress, trxOptions, parameters, method;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers_1.netId(this)];
                case 1:
                    _a.sent();
                    errorPrefix = 'Compound [castVote] | ';
                    if (typeof proposalId !== 'number') {
                        throw Error(errorPrefix + 'Argument `proposalId` must be an integer.');
                    }
                    if (typeof support !== 'number') {
                        throw Error(errorPrefix + 'Argument `support` must be an integer (0, 1, or 2).');
                    }
                    governorAddress = constants_1.address[this._network.name].GovernorBravo;
                    trxOptions = options;
                    trxOptions._compoundProvider = this._provider;
                    trxOptions.abi = constants_1.abi.GovernorBravo;
                    parameters = [proposalId, support];
                    method = 'castVote';
                    return [2 /*return*/, eth.trx(governorAddress, method, parameters, trxOptions)];
            }
        });
    });
}
exports.castVote = castVote;
/**
 * Submit a vote on a Compound Governance proposal using an EIP-712 signature.
 *
 * @param {string} proposalId The ID of the proposal to vote on. This is an
 *     auto-incrementing integer in the Governor contract.
 * @param {number} support A number value of 0, 1, or 2 for the proposal vote.
 *     The numbers correspond to 'in-favor', 'against', and 'abstain'
 *     respectively.
 * @param {object} signature An object that contains the v, r, and, s values of
 *     an EIP-712 signature.
 * @param {CallOptions} [options] Options to set for a transaction and Ethers.js
 *     method overrides.
 *
 * @returns {object} Returns an Ethers.js transaction object of the vote
 *     transaction.
 *
 * @example
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * (async function() {
 *   const castVoteTx = await compound.castVoteBySig(
 *     12,
 *     1,
 *     {
 *       v: '0x1b',
 *       r: '0x130dbcd2faca07424c033b4479687cc1deeb65f08509e3ab397988cc4c6f2e78',
 *       s: '0x1debcb8250262f23906b1177161f0c7c9aa3641e6bff5b6f5c88a6bb78d5d8cd'
 *     }
 *   );
 *   console.log('Ethers.js transaction object', castVoteTx);
 * })().catch(console.error);
 * ```
 */
function castVoteBySig(proposalId, support, signature, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var errorPrefix, governorAddress, trxOptions, v, r, s, parameters, method;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers_1.netId(this)];
                case 1:
                    _a.sent();
                    errorPrefix = 'Compound [castVoteBySig] | ';
                    if (typeof proposalId !== 'number') {
                        throw Error(errorPrefix + 'Argument `proposalId` must be an integer.');
                    }
                    if (typeof support !== 'number') {
                        throw Error(errorPrefix + 'Argument `support` must be an integer (0, 1, or 2).');
                    }
                    if (!Object.isExtensible(signature) ||
                        !signature.v ||
                        !signature.r ||
                        !signature.s) {
                        throw Error(errorPrefix + 'Argument `signature` must be an object that ' +
                            'contains the v, r, and s pieces of an EIP-712 signature.');
                    }
                    governorAddress = constants_1.address[this._network.name].GovernorBravo;
                    trxOptions = options;
                    trxOptions._compoundProvider = this._provider;
                    trxOptions.abi = constants_1.abi.GovernorBravo;
                    v = signature.v, r = signature.r, s = signature.s;
                    parameters = [proposalId, support, v, r, s];
                    method = 'castVoteBySig';
                    return [2 /*return*/, eth.trx(governorAddress, method, parameters, trxOptions)];
            }
        });
    });
}
exports.castVoteBySig = castVoteBySig;
/**
 * Create a vote signature for a Compound Governance proposal using EIP-712.
 *     This can be used to create an 'empty ballot' without burning gas. The
 *     signature can then be sent to someone else to post to the blockchain.
 *     The recipient can post one signature using the `castVoteBySig` method.
 *
 * @param {string} proposalId The ID of the proposal to vote on. This is an
 *     auto-incrementing integer in the Governor contract.
 * @param {number} support A number value of 0, 1, or 2 for the proposal vote.
 *     The numbers correspond to 'in-favor', 'against', and 'abstain'
 *     respectively. To create an 'empty ballot' call this method thrice using
 *     `0`, `1`, and then `2` for this parameter.
 *
 * @returns {object} Returns an object that contains the `v`, `r`, and `s`
 *     components of an Ethereum signature as hexadecimal strings.
 *
 * @example
 * ```
 * const compound = new Compound(window.ethereum);
 *
 * (async () => {
 *
 *   const voteForSignature = await compound.createVoteSignature(20, 1);
 *   console.log('voteForSignature', voteForSignature);
 *
 *   const voteAgainstSignature = await compound.createVoteSignature(20, 0);
 *   console.log('voteAgainstSignature', voteAgainstSignature);
 *
 * })().catch(console.error);
 * ```
 */
function createVoteSignature(proposalId, support) {
    return __awaiter(this, void 0, void 0, function () {
        var provider, governorAddress, chainId, domain, primaryType, message, types, signer, signature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers_1.netId(this)];
                case 1:
                    _a.sent();
                    provider = this._provider;
                    governorAddress = constants_1.address[this._network.name].GovernorBravo;
                    chainId = this._network.id;
                    domain = {
                        name: 'Compound Governor Bravo',
                        chainId: chainId,
                        verifyingContract: governorAddress
                    };
                    primaryType = 'Ballot';
                    message = { proposalId: proposalId, support: support };
                    types = {
                        EIP712Domain: [
                            { name: 'name', type: 'string' },
                            { name: 'chainId', type: 'uint256' },
                            { name: 'verifyingContract', type: 'address' },
                        ],
                        Ballot: [
                            { name: 'proposalId', type: 'uint256' },
                            { name: 'support', type: 'uint8' }
                        ]
                    };
                    signer = provider.getSigner ? provider.getSigner() : provider;
                    return [4 /*yield*/, EIP712_1.sign(domain, primaryType, message, types, signer)];
                case 2:
                    signature = _a.sent();
                    return [2 /*return*/, signature];
            }
        });
    });
}
exports.createVoteSignature = createVoteSignature;
/**
 * Submit a Compound Governance proposal vote with a reason.
 *
 * @param {string} proposalId The ID of the proposal to vote on. This is an
 *     auto-incrementing integer in the Governor contract.
 * @param {number} support A number value of 0, 1, or 2 for the proposal vote.
 *     The numbers correspond to 'in-favor', 'against', and 'abstain'
 *     respectively.
 * @param {string} reason A string of the reason for a vote selection.
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
 *   const castVoteTx = await compound.castVoteWithReason(12, 1, 'I vote YES because...');
 *   console.log('Ethers.js transaction object', castVoteTx);
 * })().catch(console.error);
 * ```
 */
function castVoteWithReason(proposalId, support, reason, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var errorPrefix, governorAddress, trxOptions, parameters, method;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, helpers_1.netId(this)];
                case 1:
                    _a.sent();
                    errorPrefix = 'Compound [castVoteWithReason] | ';
                    if (typeof proposalId !== 'number') {
                        throw Error(errorPrefix + 'Argument `proposalId` must be an integer.');
                    }
                    if (typeof support !== 'number') {
                        throw Error(errorPrefix + 'Argument `support` must be an integer (0, 1, or 2).');
                    }
                    if (typeof reason !== 'string') {
                        throw Error(errorPrefix + 'Argument `reason` must be a string.');
                    }
                    governorAddress = constants_1.address[this._network.name].GovernorBravo;
                    trxOptions = options;
                    trxOptions._compoundProvider = this._provider;
                    trxOptions.abi = constants_1.abi.GovernorBravo;
                    parameters = [proposalId, support, reason];
                    method = 'castVoteWithReason';
                    return [2 /*return*/, eth.trx(governorAddress, method, parameters, trxOptions)];
            }
        });
    });
}
exports.castVoteWithReason = castVoteWithReason;
//# sourceMappingURL=gov.js.map