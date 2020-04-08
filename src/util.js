module.exports = {
  /**
   * Bitch give me Regex, in case stoopid people use this module
   * @param string
   * @return string
   */
  normalizeUrl: (string) => {
    if (!string.match(/instagram\.com\/[^\/]*/)) {
      string = `https://www.instagram.com/${string}`;
    }
    return string += "/?__a=1";
  }
};