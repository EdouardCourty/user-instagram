class Owner {
  /** @type string */
  #id;
  /** @type boolean */
  #isVerified;
  /** @type string */
  #profilePicUrl;
  /** @type string */
  #username;
  /** @type string */
  #fullName;
  /** @type boolean */
  #isPrivate;
  /** @type number */
  #postsCount;
  /** @type number */
  #followersCount;

  constructor(
    id,
    isVerified,
    profilePicUrl,
    username,
    fullName,
    isPrivate,
    postsCount,
    followersCount
  ) {
    this.#id = id;
    this.#isVerified = isVerified;
    this.#profilePicUrl = profilePicUrl;
    this.#username = username;
    this.#fullName = fullName;
    this.#isPrivate = isPrivate;
    this.#postsCount = postsCount;
    this.#followersCount = followersCount;
  }

  getId = () => this.#id;
  isVerified = () => this.#isVerified;
  getProfilePictureUrl = () => this.#profilePicUrl;
  getUsername = () => this.#username;
  getFullName = () => this.#fullName;
  isPrivate = () => this.#isPrivate;
  getPostsCount = () => this.#postsCount;
  getFollowersCount = () => this.#followersCount;
}

module.exports = Owner;
