class CacheStorage {
  static #pool = new Map();

  static get = () => this.#pool;

  static reset() {
    this.#pool = new Map();
  }
}

export default CacheStorage;
