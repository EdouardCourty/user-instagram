class CookieReader {
  /**
   * @param {string} cookie
   * @param {string} key
   * @returns Promise<String>
   */
  static read(cookie, key) {
    key = key.trim();
    return new Promise((resolve, reject) => {
      cookie
        .split('=')
        .map((splitted) => splitted.split(';'))
        .flat(1)
        .forEach((value, index, array) => {
          value = value.trim();
          if (index > 0 && array[index - 1].trim() === key) {
            return resolve(value);
          }
        });
      return reject();
    });
  }
}

module.exports = CookieReader;
