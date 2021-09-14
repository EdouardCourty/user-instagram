import axios from 'axios';
import url from 'url';
import Post from '../Domain/Post';
import User from '../Domain/User';
import applicationData from '../../../app/data.json';
import Media from '../Domain/Media';
import MediaType from '../Domain/MediaType';
import Dimensions from '../Domain/Dimensions';
import TaggedUser from '../Domain/TaggedUser';
import Location from '../Domain/Location';
import ChildMedia from '../Domain/ChildMedia';
import RateLimitError from '../Domain/errors/RateLimitError';
import UserNotFoundError from '../Domain/errors/UserNotFoundError';
import InstagramHelper from '../../../app/services/InstagramHelper';
import InstagramAuthenticationError from '../Domain/errors/InstagramAuthenticationError';
import CacheStorage from '../../../app/services/CacheStorage';
import Session from '../Domain/Session';

class InstagramRepository {
  /**
   * @param {string} shortcode
   */
  static async getPost(shortcode) {
    const QUERY_URL = applicationData.postUrlTemplate.replace('%SHORTCODE%', shortcode);
    const requestBody = await axios.get(QUERY_URL);

    const post = new Post();
    return post;
  }

  /**
   * @param {string} username
   */
  static getUser(username) {
    const QUERY_URL = applicationData.usernameUrlTemplate.replace('%USERNAME%', username);
    axios.get(QUERY_URL, {
      headers: applicationData.headers
    }).then((request) => {
      if (typeof request.data == 'string' && request.data.includes('<!DOCTYPE html>')) {
        throw new RateLimitError();
      }

      if (!request.data.hasOwnProperty('graphql')) {
        throw UserNotFoundError.fromUsername(username);
      }

      const rawUserData = request.data.graphql.user;

      return new User(
        rawUserData.username,
        rawUserData.biography,
        rawUserData.edge_owner_to_timeline_media.count,
        rawUserData.edge_followed_by.count,
        rawUserData.edge_follow.count,
        rawUserData.external_url,
        rawUserData.full_name,
        rawUserData.has_ar_effects,
        rawUserData.has_clips,
        rawUserData.has_channel,
        rawUserData.highlight_reel_count,
        rawUserData.hide_like_and_view_counts,
        rawUserData.id,
        rawUserData.is_business_account,
        rawUserData.is_professional_account,
        rawUserData.is_joined_recently,
        rawUserData.business_address_json,
        rawUserData.business_contact_method,
        rawUserData.business_email,
        rawUserData.business_phone_number,
        rawUserData.category_name,
        rawUserData.is_private,
        rawUserData.profile_pic_url,
        rawUserData.profile_pic_url_hd,
        rawUserData.pronouns,
        rawUserData.edge_owner_to_timeline_media.edges.map((edge) => edge.node).map((node) => {
          const hasChildren = node.hasOwnProperty('edge_sidecar_to_children');
          return new Media(
            new MediaType(node['__typename']),
            node.id,
            node.shortcode,
            node.edge_media_to_caption.edges[0].node.text,
            new Dimensions(node.dimensions.height, node.dimensions.width),
            node.display_url,
            node.edge_media_to_tagged_user.edges.map((edge) => edge.node).map((node) => new TaggedUser(
              node.x,
              node.y,
              node.user.full_name,
              node.user.id,
              node.user.is_verified,
              node.user.profile_pic_url,
              node.user.username
            )),
            node.is_video,
            node.accessibility_caption,
            node.comments_disabled,
            node.edge_media_to_comment.count,
            node.edge_liked_by.count,
            node.taken_at_timestamp,
            node.location ? new Location(node.location.id, node.location.has_public_page, node.location.name, node.location.slug) : null,
            hasChildren
              ? node.edge_sidecar_to_children.edges.map((edge) => edge.node).map((node) => {
                return new ChildMedia(
                  new MediaType(node['__typename']),
                  node.id,
                  node.shortcode,
                  new Dimensions(node.dimensions.height, node.dimensions.width),
                  node.display_url,
                  node.edge_media_to_tagged_user.edges.map((edge) => edge.node).map((node) => new TaggedUser(
                    node.x,
                    node.y,
                    node.user.full_name,
                    node.user.id,
                    node.user.is_verified,
                    node.user.profile_pic_url,
                    node.user.username
                  )),
                  node.accessibility_caption
                )
              })
              : [],
            node.has_audio,
            node.video_view_count,
            node.video_url
          );
        })
      );
    }).catch((error) => {
      if (error.hasOwnProperty('response') && error.response.status === 404) {
        throw new UserNotFoundError.fromUsername(username);
      }
    })
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  static async authenticate(username, password) {
    const request = await axios.get(InstagramHelper.BASE_URL,  {
      headers: {
        'user-agent': InstagramHelper.DEFAULT_USER_AGENT
      }
    });

    const matches = request.data.match(/<script type="text\/javascript">window\._sharedData\s?=(.+);<\/script>/);
    if (matches.length === 1) {
      throw new InstagramAuthenticationError('Unable to extract JSON data.');
    }
    const jsonData = JSON.parse(matches[1]);
    if (!jsonData.hasOwnProperty('config')) {
      throw new InstagramAuthenticationError('Unable to retrieve config data.');
    }
    if (!jsonData['config'].hasOwnProperty('csrf_token') || !jsonData['config']['csrf_token']) {
      throw new InstagramAuthenticationError('Unable to retrieve CSRF token.');
    }
    const csrfToken = jsonData['config']['csrf_token'],
      encryptedPassword = InstagramHelper.getEncryptedPasswordFromPassword(password);

    const formParams = {
      'username': username,
      'enc_password': encryptedPassword
    }, requestHeaders = {
      'cookie': `ig_cb=1; csrftoken=${csrfToken}`,
      'referer': InstagramHelper.BASE_URL,
      'x-csrftoken': csrfToken,
      'user-agent': InstagramHelper.DEFAULT_USER_AGENT,
      'content-type': 'application/x-www-form-urlencoded'
    }

    const queryString = (new url.URLSearchParams(formParams)).toString();

    return new Promise((resolve, reject) => {
      axios.post(InstagramHelper.AUTH_URL, queryString, {
        headers: requestHeaders
      }).then((response) => {
        if (typeof response.data === 'object' && response.data.hasOwnProperty('authenticated') && response.data['authenticated']) {
          if (response.headers.hasOwnProperty('set-cookie')) {
            const sessionId = response.headers['set-cookie'].filter((cookie) => cookie.includes('sessionid'))[0];
            if (!sessionId) {
              throw new InstagramAuthenticationError('Unable to find a sessionId in the cookies. Please try again.');
            }
            const session = new Session(sessionId);
            // TODO: Session et lire les data depuis le cookie, lib ou custom ?
            CacheStorage.get().set('sessionId', sessionId);
          } else {
            throw new InstagramAuthenticationError('Unable to read the cookies. Try again.');
          }
          return resolve();
        } else if (typeof response.data === 'object' && response.data.hasOwnProperty('error_type') && response.data['error_type'] === 'generic_request_error') {
          return reject(new RateLimitError());
        } else {
          reject(new Error('Unknown error, please submit an issue on GitHub.'));
        }
      }).catch((error) => {
        console.error(error);
      })
    });
  }
}

export default InstagramRepository;
