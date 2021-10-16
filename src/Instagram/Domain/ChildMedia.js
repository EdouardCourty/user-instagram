class ChildMedia {
  /** @type MediaType */
  #type;
  /** @type string */
  #id;
  /** @type string */
  #shortcode;
  /** @type Dimensions */
  #dimensions;
  /** @type string */
  #displayUrl;
  /** @type TaggedUser[] */
  #taggedUsers;
  /** @type string */
  #accessibilityCaption;

  constructor(type, id, shortcode, dimensions, displayUrl, taggedUsers, accessibilityCaption) {
    this.#type = type;
    this.#id = id;
    this.#shortcode = shortcode;
    this.#dimensions = dimensions;
    this.#displayUrl = displayUrl;
    this.#taggedUsers = taggedUsers;
    this.#accessibilityCaption = accessibilityCaption;
  }

  getType = () => this.#type.getValue();
  getId = () => this.#id;
  getShortcode = () => this.#shortcode;
  getDimensions = () => this.#dimensions;
  getDisplayUrl = () => this.#displayUrl;
  getTaggedUsers = () => this.#taggedUsers;
  getAccessibilityCaption = () => this.#accessibilityCaption;
}

module.exports = ChildMedia;
