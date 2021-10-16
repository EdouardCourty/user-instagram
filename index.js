const GetUserDataHandler = require('./src/Instagram/Application/GetUserDataHandler');
const GetPostDataHandler = require('./src/Instagram/Application/GetPostDataHandler');
const AuthenticationHandler = require('./src/Instagram/Application/AuthenticationHandler');

const GetUserDataQuery = require('./src/Instagram/Application/Query/GetUserDataQuery');
const GetPostDataQuery = require('./src/Instagram/Application/Query/GetPostDataQuery');
const AuthenticationQuery = require('./src/Instagram/Application/Query/AuthenticationQuery');

module.exports = {
  /**
   * @param {string} username
   * @returns Promise<User>
   */
  getUserData: (username) => GetUserDataHandler.handle(new GetUserDataQuery(username)),
  /**
   * @param {string} shortCode
   * @returns {Promise<Post>}
   */
  getPostData: (shortCode) => GetPostDataHandler.handle(new GetPostDataQuery(shortCode)),
  /**
   * @param {string} username
   * @param {string} password
   * @returns {Promise<void>}
   */
  authenticate: (username, password) => AuthenticationHandler.handle(new AuthenticationQuery(username, password))
};
