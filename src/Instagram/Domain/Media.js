class Media {
  /** @type MediaType */
  #type;
  /** @type string */
  #id;
  /** @type string */
  #shortcode;
  /** @type string */
  #caption;
  /** @type Dimensions */
  #dimensions;
  /** @type string */
  #displayUrl;
  /** @type TaggedUser[] */
  #taggedUsers;
  /** @type boolean */
  #isVideo;
  /** @type string */
  #accessibilityCaption;
  /** @type boolean */
  #commentsDisabled;
  /** @type number */
  #commentsCount;
  /** @type number */
  #likesCount;
  /** @type number */
  #timestamp;
  /** @type Location */
  #location;
  /** @type ChildPicture[] */
  #children;
  /** @type boolean */
  #hasAudio;
  /** @type number|null */
  #viewsCount;
  /** @type string|null */
  #videoUrl;

  constructor(type, id, shortcode, caption, dimensions, displayUrl, taggedUsers, isVideo, accessibilityCaption, commentsDisabled, commentsCount, likesCount, timestamp, location, children, hasAudio = false, viewsCount = 0, videoUrl = null) {
    this.#type = type;
    this.#id = id;
    this.#shortcode = shortcode;
    this.#caption = caption;
    this.#dimensions = dimensions;
    this.#displayUrl = displayUrl;
    this.#taggedUsers = taggedUsers;
    this.#isVideo = isVideo;
    this.#accessibilityCaption = accessibilityCaption;
    this.#commentsDisabled = commentsDisabled;
    this.#commentsCount = commentsCount;
    this.#likesCount = likesCount;
    this.#timestamp = timestamp;
    this.#location = location;
    this.#children = children;
    this.#hasAudio = hasAudio;
    this.#viewsCount = viewsCount;
    this.#videoUrl = videoUrl;
  }

  getType = () => this.#type.getValue();
  getId = () => this.#id;
  getShortcode = () => this.#shortcode;
  getCaption = () => this.#caption;
  getDimensions = () => this.#dimensions;
  getDisplayUrl = () => this.#displayUrl;
  getTaggedUsers = () => this.#taggedUsers;
  isVideo = () => this.#isVideo;
  getAccessibilityCaption = () => this.#accessibilityCaption;
  areCommentsDisabled = () => this.#commentsDisabled;
  getCommentsCount = () => this.#commentsCount;
  getLikesCount = () => this.#likesCount;
  getTimestamp = () => this.#timestamp;
  getLocation = () => this.#location;
  getChildren = () => this.#children;
  hasAudio = () => this.#hasAudio;
  getViewsCount = () => this.#viewsCount;
  getVideoUrl = () => this.#videoUrl;
}

module.exports = Media;
