class Comment {
  /** @type string */
  #id;
  /** @type string */
  #text;
  /** @type Date */
  #date;
  /** @type CommentOwner */
  #owner;
  /** @type number */
  #likesCount;
  /** @type boolean */
  #hasResponses;
  /** @type Comment[] */
  #responses;

  constructor(id, text, date, owner, likesCount, hasResponses, responses) {
    this.#id = id;
    this.#text = text;
    this.#date = date;
    this.#owner = owner;
    this.#likesCount = likesCount;
    this.#hasResponses = hasResponses;
    this.#responses = responses;
  }

  getId = () => this.#id;
  getText = () => this.#text;
  getDate = () => this.#date;
  getOwner = () => this.#owner;
  getLikesCount = () => this.#likesCount;
  hasResponses = () => this.#hasResponses;
  getResponses = () => this.#responses;
}

module.exports = Comment;
