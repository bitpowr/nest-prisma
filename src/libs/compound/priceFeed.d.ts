/**
 * @file Price Feed
 * @desc These methods facilitate interactions with the Open Price Feed smart
 *     contracts.
 */
/**
 * Gets an asset's price from the Compound Protocol open price feed. The price
 *    of the asset can be returned in any other supported asset value, including
 *    all cTokens and underlyings.
 *
 * @param {string} asset A string of a supported asset in which to find the
 *     current price.
 * @param {string} [inAsset] A string of a supported asset in which to express
 *     the `asset` parameter's price. This defaults to USD.
 *
 * @returns {string} Returns a string of the numeric value of the asset.
 *
 * @example
 * ```
 * const compound = new Compound(window.ethereum);
 * let price;
 *
 * (async function () {
 *
 *   price = await compound.getPrice(Compound.WBTC);
 *   console.log('WBTC in USD', price); // 6 decimals, see Open Price Feed docs
 *
 *   price = await compound.getPrice(Compound.BAT, Compound.USDC); // supports cTokens too
 *   console.log('BAT in USDC', price);
 *
 * })().catch(console.error);
 * ```
 */
export declare function getPrice(asset: string, inAsset?: string): Promise<number>;
