class TaggedUser {
  /** @type number */
  #tagXPosition;
  /** @type number */
  #tagYPosition;
  /** @type string */
  #fullName;
  /** @type string */
  #id;
  /** @type boolean */
  #isVerified;
  /** @type string */
  #profilePictureUrl;
  /** @type string */
  #username;

  constructor(tagXPosition, taxYPosition, fullName, id, isVerified, profilePictureUrl, username) {
    this.#tagXPosition = tagXPosition;
    this.#tagYPosition = taxYPosition;
    this.#fullName = fullName;
    this.#id = id;
    this.#isVerified = isVerified;
    this.#profilePictureUrl = profilePictureUrl;
    this.#username = username;
  }

  getTagXPosition = () => this.#tagXPosition;
  getTagYPosition = () => this.#tagYPosition;
  getFullName = () => this.#fullName;
  getId = () => this.#id;
  isVerified = () => this.#isVerified;
  getProfilePictureUrl = () => this.#profilePictureUrl;
  getUsername = () => this.#username;
}

module.exports = TaggedUser;
