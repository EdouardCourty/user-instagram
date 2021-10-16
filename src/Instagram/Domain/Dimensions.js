const AspectRatioCalculator = require('../../../app/services/AspectRatioCalculator');

class Dimensions {
  /** @type number */
  #height;
  /** @type number */
  #width;

  constructor(height, width) {
    this.#height = height;
    this.#width = width;
  }

  getHeight = () => this.#height;
  getWidth = () => this.#width;
  /**
   * @param {string|null} separator
   * @returns {string}
   */
  getAspectRatio = (separator = ':') => AspectRatioCalculator.getAspectRatio(this.#height, this.#width, separator);
}

module.exports = Dimensions;
