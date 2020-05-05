/**
 * This module serves the purpose of converting currencies
 */

class CurrencyConveter {
  /**
   * Instatiate the currency converter
   * @param {Array<JSON>} currencies 
   */
  constructor(currencies) {
    this.currencies = currencies
  }

  /**
   * Convert a currency into another
   * @param {String} base 
   * @param {String} target 
   * @param {Float} value 
   */
  convert(base, target, value) {
    const rate = this.getRate(base, target)

    /* Saveguard */
    if (rate === null) {
      throw Error('Unsupported currency conversion')
    }
    
    return (value * rate).toFixed(2) // Only show 2 decimals
  }

  /**
   * Get the conversion rate of two currencies
   * @param {String} base 
   * @param {String} target 
   */
  getRate(base, target) {
    for (let i = 0; i < this.currencies.length; i += 1) {
      const currency = this.currencies[i]

      /* If the input matches exactly, just return the rate */
      if (currency.base === base && currency.target === target) {
        return currency.rate
      }

      /* If the input matches in reverse, return the adjusted rate */
      if (currency.base === target && currency.target === base) {
        return 1 / currency.rate
      }
    }

    // Currency combination does not exist
    return null
  }
}

export default CurrencyConveter
