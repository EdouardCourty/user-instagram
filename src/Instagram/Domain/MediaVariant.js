class MediaVariant {
  /** @type string */
  #displayUrl;
  /** @type Dimensions */
  #dimensions;

  constructor(displayUrl, dimensions) {
    this.#displayUrl = displayUrl;
    this.#dimensions = dimensions;
  }

  getDisplayUrl = () => this.#displayUrl;
  getDimensions = () => this.#dimensions;
}

module.exports = MediaVariant;
