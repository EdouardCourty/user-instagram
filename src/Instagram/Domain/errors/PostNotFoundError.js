class PostNotFoundError extends Error {
  /** @param {string} shortcode */
  static fromShortcode = (shortcode) => new this(`No post with ${shortcode} as shortcode could be found.`);
}

module.exports = PostNotFoundError;
