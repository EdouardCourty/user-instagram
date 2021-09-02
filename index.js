import GetPostDataQuery from './src/Instagram/Application/Query/GetPostDataQuery';
import GetPostDataHandler from './src/Instagram/Application/GetPostDataHandler';
import GetUserDataQuery from './src/Instagram/Application/Query/GetUserDataQuery';
import GetUserDataHandler from './src/Instagram/Application/GetUserDataHandler';

export default {
  /** @param {string} username */
  getUserData: (username) => GetUserDataHandler.handle(new GetUserDataQuery(username)),
  /** @param {string} shortCode */
  getPostData: (shortCode) => GetPostDataHandler.handle(new GetPostDataQuery(shortCode))
};

/** @param {string} username */
export const getUserData = (username) => GetUserDataHandler.handle(new GetUserDataQuery(username));

/** @param {string} shortCode */
export const getPostData = (shortCode) => GetPostDataHandler.handle(new GetPostDataQuery(shortCode));
