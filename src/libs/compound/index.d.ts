/**
 * @file Compound
 * @desc This file defines the constructor of the `Compound` class.
 * @hidden
 */
import { ethers } from 'ethers';
import * as eth from './eth';
import * as util from './util';
import { enterMarkets, exitMarket } from './comptroller';
import { supply, redeem, repayBorrow, borrow } from './cToken';
import { getPrice } from './priceFeed';
import { getCompAccrued, getCompBalance, claimComp, delegate, delegateBySig, createDelegateSignature } from './comp';
import { castVote, castVoteBySig, createVoteSignature, castVoteWithReason } from './gov';
import * as api from './api';
import { constants, decimals } from './constants';
import { Provider, CompoundOptions, ProviderNetwork } from './types';
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
declare class Compound {
    static api: typeof api;
    static eth: typeof eth;
    static util: typeof util;
    static _ethers: typeof ethers;
    static decimals: typeof decimals;
    static comp: {
        getCompBalance: typeof getCompBalance;
        getCompAccrued: typeof getCompAccrued;
    };
    static constants: typeof constants;
    _originalProvider: Provider | string;
    _provider: Provider;
    enterMarket: typeof enterMarkets;
    exitMarket: typeof exitMarket;
    supply: typeof supply;
    redeem: typeof redeem;
    repayBorrow: typeof repayBorrow;
    borrow: typeof borrow;
    getPrice: typeof getPrice;
    getCompAccrued: typeof getCompAccrued;
    getCompBalance: typeof getCompBalance;
    claimComp: typeof claimComp;
    delegate: typeof delegate;
    delegateBySig: typeof delegateBySig;
    createDelegateSignature: typeof createDelegateSignature;
    castVote: typeof castVote;
    castVoteBySig: typeof castVoteBySig;
    createVoteSignature: typeof createVoteSignature;
    castVoteWithReason: typeof castVoteWithReason;
    _network: ProviderNetwork;
    constructor(provider?: Provider | string, options?: CompoundOptions);
}
export default Compound;
