import axios from 'axios';
import Post from '../Domain/Post';
import User from '../Domain/User';
import applicationData from '../../../app/data.json';

class InstagramRepository {
  /**
   * @param {string} shortcode
   */
  static async getPost(shortcode) {
    const QUERY_URL = applicationData.postUrlTemplate.replace('%SHORTCODE%', shortcode);
    const requestBody = await axios.get(QUERY_URL);
    const basePostUrl = QUERY_URL.replace('/?__a=1', '');

    const post = new Post();
    return post;
  }

  /**
   * @param {string} username
   */
  static async getUser(username) {
    const QUERY_URL = applicationData.usernameUrlTemplate.replace('%USERNAME%', username);
    const requestBody = await axios.get(QUERY_URL);
    const baseProfileUrl = QUERY_URL.replace('/?__a=1', '');

    const user = new User();
    return user;
  }
}

module.exports = InstagramRepository;
