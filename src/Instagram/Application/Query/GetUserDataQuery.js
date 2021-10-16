class GetUserDataQuery {
  /** @type string */
  #username;

  /**
   * @param {string} username
   */
  constructor(username) {
    if (typeof username !== 'string') {
      throw TypeError('The username has to be a string.');
    }
    this.#username = username;
  }

  /** @returns string */
  getUserName = () => this.#username;
}

module.exports = GetUserDataQuery;
