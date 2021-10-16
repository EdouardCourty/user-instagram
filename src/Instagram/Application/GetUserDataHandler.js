const InstagramRepository = require('../Infrastructure/InstagramRepository');

class GetUserDataHandler {
  /**
   * @param {GetUserDataQuery} getUserDataQuery
   * @returns Promise<User>
   */
  static handle(getUserDataQuery) {
    return InstagramRepository.getUser(getUserDataQuery.getUserName());
  }
}

module.exports = GetUserDataHandler;
