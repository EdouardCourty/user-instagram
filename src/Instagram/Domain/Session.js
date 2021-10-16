class Session {
  #id;
  #expiryDate;

  /**
   * @param {string} id
   * @param {Date} expiryDate
   */
  constructor(id, expiryDate) {
    this.#id = id;
    this.#expiryDate = expiryDate;
  }

  /** @return string */
  getId = () => this.#id;
  /** @returns Date */
  getExpiryDate = () => this.#expiryDate;
}

module.exports = Session;
