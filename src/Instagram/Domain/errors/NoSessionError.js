class NoSessionError extends Error {
  message = 'No session found. Did you authenticate ?';
}

module.exports = NoSessionError;
