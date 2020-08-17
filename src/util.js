module.exports = {
  /**
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