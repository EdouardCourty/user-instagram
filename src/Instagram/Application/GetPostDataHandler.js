const InstagramRepository = require('../Infrastructure/InstagramRepository');

class GetPostDataHandler {
  /**
   * @param {GetPostDataQuery} getPostDataQuery
   * @returns Promise<Post>
   */
  static handle(getPostDataQuery) {
    return InstagramRepository.getPost(getPostDataQuery.getShortCode());
  }
}

module.exports = GetPostDataHandler;
