class Session {
  #id;
  #expiresIn;

  /**
   * @param {string} id
   * @param {number} expiresIn
   */
  constructor(id, expiresIn) {
    this.#id = id;
    this.#expiresIn = expiresIn;
  }

  /** @return string */
  getId = () => this.#id;
  /** @returns number */
  getExpiresIn = () => this.#expiresIn;
}

export default Session;
