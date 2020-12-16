class IncorrectResponseError extends Error {
  constructor(message) {
    super(message);
  }

  static fromType(type) {
    return new this(`Instagram did not send a valid response. Got a ${type} instead of an object.`);
  }
}

module.exports = IncorrectResponseError;
