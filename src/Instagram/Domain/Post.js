class Post {
  /** @type string */
  #id;
  /** @type MediaType */
  #type;
  /** @type string */
  #shortcode;
  /** @type Dimensions */
  #dimensions;
  /** @type string */
  #displayUrl;
  /** @type string[] */
  #variants;
  /** @type string */
  #accessibilityCaption;
  /** @type boolean */
  #isVideo;
  /** @type TaggedUser[] */
  #taggedUsers;
  /** @type string */
  #caption;
  /** @type boolean */
  #likeAndViewDisabled;
  /** @type number */
  #commentsCount;
  /** @type Comment[] */
  #comments;
  /** @type boolean */
  #commentsDisabled;
  /** @type Date */
  #takenAt;
  /** @type number */
  #likesCount;
  /** @type boolean */
  #isPaidPartnership;
  /** @type Location */
  #location;
  /** @type Owner */
  #owner;
  /** @type boolean */
  #isAd;
  /** @type ChildMedia[] */
  #children;
  /** @type boolean */
  #hasAudio;
  /** @type number */
  #videoViewsCount;
  /** @type number  */
  #videoPlaysCount;

  constructor(
    id,
    type,
    shortcode,
    dimensions,
    displayUrl,
    variants,
    accessibilityCaption,
    isVideo,
    taggedUsers,
    caption,
    likeAndViewDisabled,
    commentsCount,
    comments,
    commentsDisabled,
    takenAt,
    likesCount,
    isPaidPartnership,
    location,
    owner,
    isAd,
    children,
    hasAudio,
    videoViewsCount,
    videoPlaysCount
  ) {
    this.#id = id;
    this.#type = type;
    this.#shortcode = shortcode;
    this.#dimensions = dimensions;
    this.#displayUrl = displayUrl;
    this.#variants = variants;
    this.#accessibilityCaption = accessibilityCaption;
    this.#isVideo = isVideo;
    this.#taggedUsers = taggedUsers;
    this.#caption = caption;
    this.#likeAndViewDisabled = likeAndViewDisabled;
    this.#commentsCount = commentsCount;
    this.#comments = comments;
    this.#commentsDisabled = commentsDisabled;
    this.#takenAt = takenAt;
    this.#likesCount = likesCount;
    this.#isPaidPartnership = isPaidPartnership;
    this.#location = location;
    this.#owner = owner;
    this.#isAd = isAd;
    this.#children = children;
    this.#hasAudio = hasAudio;
    this.#videoViewsCount = videoViewsCount;
    this.#videoPlaysCount = videoPlaysCount;
  }

  getId = () => this.#id;
  getType = () => this.#type;
  getShortcode = () => this.#shortcode;
  getDimensions = () => this.#dimensions;
  getDisplayUrl = () => this.#displayUrl;
  getVariants = () => this.#variants;
  getAccessibilityCaption = () => this.#accessibilityCaption;
  isVideo = () => this.#isVideo;
  getTaggedUsers = () => this.#taggedUsers;
  getCaption = () => this.#caption;
  areLikesAndViewsCountDisabled = () => this.#likeAndViewDisabled;
  getCommentsCount = () => this.#commentsCount;
  getComments = () => this.#comments;
  areCommentsDisabled = () => this.#commentsDisabled;
  getDate = () => this.#takenAt;
  getLikesCount = () => this.#likesCount;
  isPaidPartnership = () => this.#isPaidPartnership;
  getLocation = () => this.#location;
  getOwner = () => this.#owner;
  isAd = () => this.#isAd;
  getChildren = () => this.#children;
  hasAudio = () => this.#hasAudio;
  getVideoViewsCount = () => this.#videoViewsCount;
  getVideoPlaysCount = () => this.#videoPlaysCount;
}

module.exports = Post;
