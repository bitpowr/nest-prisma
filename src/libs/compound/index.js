"use strict";
/**
 * @file Compound
 * @desc This file defines the constructor of the `Compound` class.
 * @hidden
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
exports.__esModule = true;
var ethers_1 = require("ethers");
var eth = __importStar(require("./eth"));
var util = __importStar(require("./util"));
var comptroller_1 = require("./comptroller");
var cToken_1 = require("./cToken");
var priceFeed_1 = require("./priceFeed");
var comp_1 = require("./comp");
var gov_1 = require("./gov");
var api = __importStar(require("./api"));
var constants_1 = require("./constants");
// Turn off Ethers.js warnings
ethers_1.ethers.utils.Logger.setLogLevel(ethers_1.ethers.utils.Logger.levels.ERROR);
/**
 * Creates an instance of the Compound.js SDK.
 *
 * @param {Provider | string} [provider] Optional Ethereum network provider.
 *     Defaults to Ethers.js fallback mainnet provider.
 * @param {object} [options] Optional provider options.
 *
 * @example
 * ```
 * var compound = new Compound(window.ethereum); // web browser
 *
 * var compound = new Compound('http://127.0.0.1:8545'); // HTTP provider
 *
 * var compound = new Compound(); // Uses Ethers.js fallback mainnet (for testing only)
 *
 * var compound = new Compound('ropsten'); // Uses Ethers.js fallback (for testing only)
 *
 * // Init with private key (server side)
 * var compound = new Compound('https://mainnet.infura.io/v3/_your_project_id_', {
 *   privateKey: '0x_your_private_key_', // preferably with environment variable
 * });
 *
 * // Init with HD mnemonic (server side)
 * var compound = new Compound('mainnet' {
 *   mnemonic: 'clutch captain shoe...', // preferably with environment variable
 * });
 * ```
 *
 * @returns {object} Returns an instance of the Compound.js SDK.
 */
// const Compound = function(
//   provider: Provider | string = 'mainnet', options: CompoundOptions = {}
// ) : CompoundInstance {
//   const originalProvider = provider;
//   options.provider = provider || options.provider;
//   provider = eth._createProvider(options);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const instance: any = {
//     _originalProvider: originalProvider,
//     _provider: provider,
//     ...comptroller,
//     ...cToken,
//     ...priceFeed,
//     ...gov,
//     claimComp: comp.claimComp,
//     delegate: comp.delegate,
//     delegateBySig: comp.delegateBySig,
//     createDelegateSignature: comp.createDelegateSignature,
//   };
//   // Instance needs to know which network the provider connects to, so it can
//   //     use the correct contract addresses.
//   instance._networkPromise = eth.getProviderNetwork(provider).then((network) => {
//     delete instance._networkPromise;
//     instance._network = network;
//   });
//   return instance;
// };
// Compound.eth = eth;
// Compound.api = api;
// Compound.util = util;
// Compound._ethers = ethers;
// Compound.decimals = decimals;
// Compound.comp = {
//   getCompBalance: comp.getCompBalance,
//   getCompAccrued: comp.getCompAccrued,
// };
// Object.assign(Compound, constants);
// export = Compound; 
var Compound = /** @class */ (function () {
    function Compound(provider, options) {
        var _this = this;
        if (provider === void 0) { provider = 'mainnet'; }
        if (options === void 0) { options = {}; }
        this.enterMarket = comptroller_1.enterMarkets;
        this.exitMarket = comptroller_1.exitMarket;
        this.supply = cToken_1.supply;
        this.redeem = cToken_1.redeem;
        this.repayBorrow = cToken_1.repayBorrow;
        this.borrow = cToken_1.borrow;
        this.getPrice = priceFeed_1.getPrice;
        this.getCompAccrued = comp_1.getCompAccrued;
        this.getCompBalance = comp_1.getCompBalance;
        this.claimComp = comp_1.claimComp;
        this.delegate = comp_1.delegate;
        this.delegateBySig = comp_1.delegateBySig;
        this.createDelegateSignature = comp_1.createDelegateSignature;
        this.castVote = gov_1.castVote;
        this.castVoteBySig = gov_1.castVoteBySig;
        this.createVoteSignature = gov_1.createVoteSignature;
        this.castVoteWithReason = gov_1.castVoteWithReason;
        this._originalProvider = provider;
        options.provider = provider || options.provider;
        this._provider = eth._createProvider(options);
        eth.getProviderNetwork(provider).then(function (network) {
            _this._network = network;
        });
    }
    Compound.api = api;
    Compound.eth = eth;
    Compound.util = util;
    Compound._ethers = ethers_1.ethers;
    Compound.decimals = constants_1.decimals;
    Compound.comp = {
        getCompBalance: comp_1.getCompBalance,
        getCompAccrued: comp_1.getCompAccrued
    };
    Compound.constants = constants_1.constants;
    return Compound;
}());
exports["default"] = Compound;
//# sourceMappingURL=index.js.map