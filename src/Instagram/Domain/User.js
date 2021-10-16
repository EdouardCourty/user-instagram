class User {
  /** @type string */
  #username;
  /** @type string */
  #biography;
  /** @type number */
  #publicationsCount;
  /** @type number */
  #followersCount;
  /** @type string */
  #externalUrl;
  /** @type number */
  #followingCount;
  /** @type string */
  #fullName;
  /** @type boolean */
  #hasArEffects;
  /** @type boolean */
  #hasClips;
  /** @type boolean */
  #hasGuides;
  /** @type boolean */
  #hasChannel;
  /** @type number */
  #highlightReelCount;
  /** @type number */
  #isHidingLikesAndViewsCount;
  /** @type string */
  #id;
  /** @type boolean */
  #isBusinessAccount;
  /** @type boolean */
  #isProfessionalAccount;
  /** @type boolean */
  #hasJoinedRecently;
  /** @type string */
  #businessAddressJson;
  /** @type string */
  #businessContactMethod;
  /** @type string */
  #businessEmail;
  /** @type string */
  #businessPhoneNumber;
  /** @type string */
  #businessCategoryName;
  /** @type string */
  #overallCategoryName;
  /** @type string */
  #categoryEnum;
  /** @type string */
  #categoryName;
  /** @type boolean */
  #isPrivate;
  /** @type boolean */
  #isVerified;
  /** @type string */
  #profilePictureUrl;
  /** @type string */
  #profilePictureUrlHd;
  /** @type string[] */
  #pronouns;
  /** @type Media[] */
  #medias;

  constructor(
    username,
    biography,
    publicationsCount,
    followersCount,
    followingCount,
    externalUrl,
    fullName,
    hasArEffects,
    hasClips,
    hasGuides,
    hasChannel,
    highlightReelsCount,
    isHidingLikesAndViewsCount,
    id,
    isBusinessAccount,
    isProfessionalAccount,
    hasJoinedRecently,
    businessAddressJson,
    businessContactMethod,
    businessEmail,
    businessPhoneNumber,
    businessCategoryName,
    overallCetagoryName,
    categoryEnum,
    categoryName,
    isPrivate,
    isVerified,
    profilePictureUrl,
    profilePictureUrlHd,
    pronouns,
    medias,
  ) {
    this.#username = username;
    this.#biography = biography;
    this.#publicationsCount = publicationsCount;
    this.#followersCount = followersCount;
    this.#followingCount = followingCount;
    this.#externalUrl = externalUrl;
    this.#fullName = fullName;
    this.#hasArEffects = hasArEffects;
    this.#hasClips = hasClips;
    this.#hasGuides = hasGuides;
    this.#hasChannel = hasChannel;
    this.#highlightReelCount = highlightReelsCount;
    this.#isHidingLikesAndViewsCount = isHidingLikesAndViewsCount;
    this.#id = id;
    this.#isBusinessAccount = isBusinessAccount;
    this.#isProfessionalAccount = isProfessionalAccount;
    this.#hasJoinedRecently = hasJoinedRecently;
    this.#businessAddressJson = businessAddressJson;
    this.#businessContactMethod = businessContactMethod;
    this.#businessEmail = businessEmail;
    this.#businessPhoneNumber = businessPhoneNumber;
    this.#businessCategoryName = businessCategoryName;
    this.#overallCategoryName = overallCetagoryName;
    this.#categoryEnum = categoryEnum;
    this.#categoryName = categoryName;
    this.#isPrivate = isPrivate;
    this.#isVerified = isVerified;
    this.#profilePictureUrl = profilePictureUrl;
    this.#profilePictureUrlHd = profilePictureUrlHd;
    this.#pronouns = pronouns;
    this.#medias = medias;
  }

  getUsername = () => this.#username;
  getBiography = () => this.#biography;
  getPublicationsCount = () => this.#publicationsCount;
  getFollowersCount = () => this.#followersCount;
  getExternalUrl = () => this.#externalUrl;
  getFollowingCount = () => this.#followingCount;
  getFullName = () => this.#fullName;
  hasArEffect = () => this.#hasArEffects;
  hasClips = () => this.#hasClips;
  hasGuides = () => this.#hasGuides;
  hasChannel = () => this.#hasChannel;
  getHighlightsReelsCount = () => this.#highlightReelCount;
  isHidingLikesAndViewsCount = () => this.#isHidingLikesAndViewsCount;
  getId = () => this.#id;
  isBusinessAccount = () => this.#isBusinessAccount;
  isProfessionalAccount = () => this.#isProfessionalAccount;
  hasJoinedRecently = () => this.#hasJoinedRecently;
  getBusinessAddressJson = () => this.#businessAddressJson;
  getBusinessContactMethod = () => this.#businessContactMethod;
  getBusinessEmail = () => this.#businessEmail;
  getBusinessPhoneNumber = () => this.#businessPhoneNumber;
  getBusinessCategoryName = () => this.#businessCategoryName;
  getOverallCategoryName = () => this.#overallCategoryName;
  getCategoryEnum = () => this.#categoryEnum;
  getCategoryName = () => this.#categoryName;
  isPrivate = () => this.#isPrivate;
  isVerified = () => this.#isVerified;
  getProfilePicture = () => this.#profilePictureUrl;
  getHdProfilePicture = () => this.#profilePictureUrlHd;
  getPronouns = () => this.#pronouns;
  getMedias = () => this.#medias;
}

module.exports = User;
