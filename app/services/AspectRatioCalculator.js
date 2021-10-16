class AspectRatioCalculator {
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  static #gcd = (a, b) => (b === 0 ? a : this.#gcd(b, a % b));
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number[]}
   */
  static #highestFirst = (a, b) => (a < b ? [b, a] : [a, b]);
  /**
   * @param {number} h
   * @param {number} w
   * @param {number} divisor
   * @param {string|null} separator
   * @returns {string}
   */
  static #format = (h, w, divisor, separator) => `${h / divisor}${separator}${w / divisor}`;

  /**
   * @param {number} height
   * @param {number} width
   * @param {string} separator
   * @returns {string}
   */
  static getAspectRatio(height, width, separator = ':') {
    const [h, w] = this.#highestFirst(height, width);
    const divisor = this.#gcd(h, w);
    return this.#format(h, w, divisor, separator);
  }
}

module.exports = AspectRatioCalculator;
