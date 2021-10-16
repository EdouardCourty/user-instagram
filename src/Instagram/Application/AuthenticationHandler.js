const InstagramRepository = require('../Infrastructure/InstagramRepository');
const AuthenticationQuery = require('./Query/AuthenticationQuery');

const CacheStorage = require('../../../app/services/CacheStorage');

class AuthenticationHandler {
  /**
   * @param {AuthenticationQuery} authenticationQuery
   */
  static handle(authenticationQuery) {
    CacheStorage.get().set('username', authenticationQuery.getUsername());
    CacheStorage.get().set('password', authenticationQuery.getPassword());
    return InstagramRepository.authenticate();
  }
}

module.exports = AuthenticationHandler;
