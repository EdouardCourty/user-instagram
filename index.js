import GetPostDataQuery from './src/Instagram/Application/Query/GetPostDataQuery';
import GetPostDataHandler from './src/Instagram/Application/GetPostDataHandler';
import GetUserDataQuery from './src/Instagram/Application/Query/GetUserDataQuery';
import GetUserDataHandler from './src/Instagram/Application/GetUserDataHandler';

export default {
  /**
   * @param {string} username
   * @returns Promise<User>
   */
  getUserData: (username) => GetUserDataHandler.handle(new GetUserDataQuery(username)),
  /**
   * @param {string} shortCode
   * @returns {Promise<Post>}
   */
  getPostData: (shortCode) => GetPostDataHandler.handle(new GetPostDataQuery(shortCode))
};

/**
 * @param {string} username
 * @returns Promise<User>
 */
export const getUserData = (username) => GetUserDataHandler.handle(new GetUserDataQuery(username));

/**
 * @param {string} shortCode
 * @returns {Promise<Post>}
 */
export const getPostData = (shortCode) => GetPostDataHandler.handle(new GetPostDataQuery(shortCode));
