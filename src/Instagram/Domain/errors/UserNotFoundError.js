class UserNotFoundError extends Error {
  /** @param {string} username */
  static fromUsername = (username) => new this(`No profile with ${username} as username could be found.`);
}

module.exports = UserNotFoundError;
