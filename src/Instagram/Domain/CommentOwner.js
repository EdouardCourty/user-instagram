class CommentOwner {
  /** @type string */
  #id;
  /** @type boolean */
  #isVerified;
  /** @type string */
  #profilePicUrl;
  /** @type string */
  #username;

  constructor(id, isVerified, profilePicUrl, username) {
    this.#id = id;
    this.#isVerified = isVerified;
    this.#profilePicUrl = profilePicUrl;
    this.#username = username;
  }

  getId = () => this.#id;
  isVerified = () => this.#isVerified;
  getProfilePicUrl = () => this.#profilePicUrl;
  getUsername = () => this.#username;
}

module.exports = CommentOwner;
