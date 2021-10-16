class RateLimitError extends Error {
  constructor() {
    super('The server has sent an unsuccessful response. The rate limit has been hit, retry later.');
  }
}

module.exports = RateLimitError;
