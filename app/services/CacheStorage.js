class CacheStorage {
  static #pool = new Map();

  static get = () => this.#pool;
}

module.exports = CacheStorage;
