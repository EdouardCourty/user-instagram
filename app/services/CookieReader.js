class CookieReader {
  /**
   * @param {string} cookie
   * @param {string} cookieKey
   * @returns Promise<String>
   */
  static read(cookie, cookieKey) {
    const key = cookieKey.trim();
    return new Promise((resolve, reject) => {
      cookie
        .split('=')
        .map((splitted) => splitted.split(';'))
        .flat(1)
        .forEach((arrayValue, index, array) => {
          const value = arrayValue.trim();
          if (index > 0 && array[index - 1].trim() === key) {
            return resolve(value);
          }
        });
      return reject();
    });
  }
}

module.exports = CookieReader;
