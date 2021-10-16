class AuthenticationQuery {
  /** @type string */
  #username;
  /** @type string */
  #password;

  /**
   * @param {string} username
   * @param {string} password
   */
  constructor(username, password) {
    if (typeof username !== 'string') {
      throw new TypeError('The username has to be a string.');
    } else if (typeof password !== 'string') {
      throw new TypeError('The password has to be a string.');
    }
    this.#username = username;
    this.#password = password;
  }

  /** @returns string */
  getUsername = () => this.#username;
  /** @returns string */
  getPassword = () => this.#password;
}

module.exports = AuthenticationQuery;
