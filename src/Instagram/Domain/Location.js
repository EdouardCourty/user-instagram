class Location {
  /** @type string */
  #id;
  /** @type boolean */
  #hasPublicPage;
  /** @type string */
  #name;
  /** @type string */
  #slug;

  constructor(id, hasPublicPage, name, slug) {
    this.#id = id;
    this.#hasPublicPage = hasPublicPage;
    this.#name = name;
    this.#slug = slug;
  }

  getId = () => this.#id;
  hasPublicPage = () => this.#hasPublicPage;
  getName = () => this.#name;
  getSlug = () => this.#slug;
}

module.exports = Location;
