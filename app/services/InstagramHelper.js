class InstagramHelper {
  static BASE_URL = 'https://www.instagram.com/';
  static AUTH_URL = 'https://www.instagram.com/accounts/login/ajax/';
  static DEFAULT_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36';

  static #ENCRYPTED_PASSWORD_TEMPLATE = '#PWD_INSTAGRAM_BROWSER:0:%TIME%:%PASSWORD%'

  static storage = new Map();

  /**
   * @param {string} password
   * @returns {string}
   */
  static getEncryptedPasswordFromPassword(password) {
    const currentDate = new Date();
    const unixTimestamp = Math.round(currentDate.getTime() / 1000);
    return this.#ENCRYPTED_PASSWORD_TEMPLATE
      .replace('%TIME%', unixTimestamp.toString())
      .replace('%PASSWORD%', password);
  }
}

module.exports = InstagramHelper;
