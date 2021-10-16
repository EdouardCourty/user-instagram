class GetPostDataQuery {
  /** @type string */
  #shortCode;

  /**
   * @param {string} shortCode
   */
  constructor(shortCode) {
    if (typeof shortCode !== 'string') {
      throw new TypeError('The sortcode has to be a string.');
    }
    this.#shortCode = shortCode;
  }

  /** @returns string */
  getShortCode = () => this.#shortCode;
}

module.exports = GetPostDataQuery;
