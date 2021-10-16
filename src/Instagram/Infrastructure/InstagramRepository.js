const url = require('url');
const axios = require('axios');
const applicationData = require('../../../app/data.json');

const CacheStorage = require('../../../app/services/CacheStorage');
const CookieReader = require('../../../app/services/CookieReader');
const InstagramHelper = require('../../../app/services/InstagramHelper');
const BasicRequestHandler = require('../../../app/services/BasicRequestHandler');

const Post = require('../Domain/Post');
const User = require('../Domain/User');

const Media = require('../Domain/Media');
const Session = require('../Domain/Session');
const Location = require('../Domain/Location');
const MediaType = require('../Domain/MediaType');
const Dimensions = require('../Domain/Dimensions');
const TaggedUser = require('../Domain/TaggedUser');
const ChildMedia = require('../Domain/ChildMedia');
const Comment = require('../Domain/Comment');

const RateLimitError = require('../Domain/errors/RateLimitError');
const NoSessionError = require('../Domain/errors/NoSessionError');
const UserNotFoundError = require('../Domain/errors/UserNotFoundError');
const TooManyLoginsError = require('../Domain/errors/TooManyLoginsError');
const InstagramGenericError = require('../Domain/errors/InstagramGenericError');
const InstagramAuthenticationError = require('../Domain/errors/InstagramAuthenticationError');
const PostNotFoundError = require('../Domain/errors/PostNotFoundError');
const MediaVariant = require('../Domain/MediaVariant');
const CommentOwner = require('../Domain/CommentOwner');
const Owner = require('../Domain/Owner');

class InstagramRepository {
  /**
   * @param {string} shortcode
   */
  static async getPost(shortcode) {
    const queryUrl = applicationData.postUrlTemplate.replace('%SHORTCODE%', shortcode);

    return new Promise((resolve, reject) => {
      BasicRequestHandler.handle(queryUrl).then((request) => {
        if (typeof request.data === 'string' && request.data.includes('<!DOCTYPE html>')) {
          throw new RateLimitError();
        }

        if (!request.data.hasOwnProperty('graphql')) {
          throw PostNotFoundError.fromShortcode(shortcode);
        }

        const rawPostData = request.data['graphql']['shortcode_media'];

        const hasComments = rawPostData['edge_media_to_parent_comment']['count'] !== 0;
        const hasCaption = rawPostData['edge_media_to_caption']['edges'].length > 0;
        const hasTaggedUsers = rawPostData['edge_media_to_tagged_user']['edges'].length > 0;
        const hasChildren = rawPostData.hasOwnProperty('edge_sidecar_to_children');
        const isVideo = rawPostData['is_video'];

        resolve(new Post(
          rawPostData['id'],
          new MediaType(rawPostData['__typename']),
          rawPostData['shortcode'],
          new Dimensions(rawPostData['height'], rawPostData['width']),
          rawPostData['display_url'],
          rawPostData['display_resources'].map((resource) => new MediaVariant(
            resource['src'],
            new Dimensions(resource['config_height'], resource['config_width'])
          )),
          rawPostData['accessibility_caption'],
          isVideo,
          hasTaggedUsers
            ? rawPostData['edge_media_to_tagged_user']['edges'].map((edge) => {
              const node = edge.node;
              return new TaggedUser(
                node['x'],
                node['y'],
                node['user']['full_name'],
                node['user']['id'],
                node['user']['is_verified'],
                node['user']['profile_pic_url'],
                node['user']['username']
              );
            }) : [],
          hasCaption ? rawPostData['edge_media_to_caption']['edges'][0]['node']['text'] : null,
          rawPostData['like_and_view_counts_disabled'],
          rawPostData['edge_media_to_parent_comment']['count'],
          hasComments ? rawPostData['edge_media_to_parent_comment']['edges'].map((objectEdge) => {
            const edge = objectEdge.node;
            const ownerData = edge['owner'];
            return new Comment(
              edge['id'],
              edge['text'],
              new Date(edge['created_at'] * 1000),
              new CommentOwner(
                ownerData['id'],
                ownerData['is_verified'],
                ownerData['profile_pic_url'],
                ownerData['username']
              ),
              edge['edge_liked_by']['count'],
              edge['edge_threaded_comments']['count'] !== 0,
              edge['edge_threaded_comments']['edges'].map((objectEdge) => {
                const edge = objectEdge.node;
                return new Comment(
                  edge['id'],
                  edge['text'],
                  new Date(edge['created_at'] * 1000),
                  new CommentOwner(
                    ownerData['id'],
                    ownerData['is_verified'],
                    ownerData['profile_pic_url'],
                    ownerData['username']
                  ),
                  edge['edge_liked_by']['count'],
                  false,
                  []
                );
              })
            );
          }) : [],
          rawPostData['comments_disabled'],
          new Date(rawPostData['taken_at_timestamp'] * 1000),
          rawPostData['edge_media_preview_like']['count'],
          rawPostData['is_paid_partnership'],
          rawPostData['location']
            ? new Location(
              rawPostData['location']['id'],
              rawPostData['location']['has_public_page'],
              rawPostData['location']['name'],
              rawPostData['location']['slug']
            ) : null,
          new Owner(
            rawPostData['owner']['id'],
            rawPostData['owner']['is_verified'],
            rawPostData['owner']['profile_pic_url'],
            rawPostData['owner']['username'],
            rawPostData['owner']['full_name'],
            rawPostData['owner']['is_private'],
            rawPostData['owner']['edge_owner_to_timeline_media']['count'],
            rawPostData['owner']['edge_followed_by']['count'],
          ),
          rawPostData['is_ad'],
          hasChildren ? rawPostData['edge_sidecar_to_children']['edges'].map((edge) => {
            const node = edge.node;
            const hasTaggedUsers = node['edge_media_to_tagged_user']['edges'].length > 0;
            return new ChildMedia(
              new MediaType(node['__typename']),
              node['id'],
              node['shortcode'],
              new Dimensions(node['dimensions']['height'], node['dimensions']['width']),
              node['display_url'],
              hasTaggedUsers ? node['edge_media_to_tagged_user']['edges'].map((edge) => {
                  const node = edge.node;
                  return new TaggedUser(
                    node['x'],
                    node['y'],
                    node['user']['full_name'],
                    node['user']['id'],
                    node['user']['is_verified'],
                    node['user']['profile_pic_url'],
                    node['user']['username']
                  );
                }) : [],
              node['accessibility_caption']
            );
          }) : [],
          rawPostData['is_video'] ? rawPostData['has_audio'] : false,
          rawPostData['is_video'] ? rawPostData['video_view_count'] : null,
          rawPostData['is_video'] ? rawPostData['video_play_count'] : null
        ));
      }).catch((error) => {
        if (error instanceof NoSessionError) {
          return reject(error);
        }
        if (error.hasOwnProperty('response') && error.response.status === 404) {
          return reject(PostNotFoundError.fromShortcode(shortcode));
        }
        return reject(new InstagramGenericError(error.message));
      });
    });
  }

  /**
   * @param {string} username
   * @returns Promise<User>
   */
  static async getUser(username) {
    const queryUrl = applicationData.usernameUrlTemplate.replace('%USERNAME%', username);

    return new Promise((resolve, reject) => {
      BasicRequestHandler.handle(queryUrl).then((request) => {
        if (typeof request.data === 'string' && request.data.includes('<!DOCTYPE html>')) {
          throw new RateLimitError();
        }

        if (!request.data.hasOwnProperty('graphql')) {
          throw UserNotFoundError.fromUsername(username);
        }

        const rawUserData = request.data['graphql']['user'];

        const hasPosts = rawUserData['edge_owner_to_timeline_media']['edges'].length > 0;

        resolve(new User(
          rawUserData.username,
          rawUserData['biography'],
          rawUserData['edge_owner_to_timeline_media']['count'],
          rawUserData['edge_followed_by']['count'],
          rawUserData['edge_follow']['count'],
          rawUserData['external_url'],
          rawUserData['full_name'],
          rawUserData['has_ar_effects'],
          rawUserData['has_clips'],
          rawUserData['has_guides'],
          rawUserData['has_channel'],
          rawUserData['highlight_reel_count'],
          rawUserData['hide_like_and_view_counts'],
          rawUserData['id'],
          rawUserData['is_business_account'],
          rawUserData['is_professional_account'],
          rawUserData['is_joined_recently'],
          rawUserData['business_address_json'],
          rawUserData['business_contact_method'],
          rawUserData['business_email'],
          rawUserData['business_phone_number'],
          rawUserData['business_category_name'],
          rawUserData['overall_category_name'],
          rawUserData['category_enum'],
          rawUserData['category_name'],
          rawUserData['is_private'],
          rawUserData['is_verified'],
          rawUserData['profile_pic_url'],
          rawUserData['profile_pic_url_hd'],
          rawUserData['pronouns'],
          hasPosts ? rawUserData['edge_owner_to_timeline_media']['edges'].map((edge) => {
            const node = edge.node;
            const hasChildren = node.hasOwnProperty('edge_sidecar_to_children');
            const hasTaggedUsers = node['edge_media_to_tagged_user']['edges'].length > 0;
            const hasCaption = node['edge_media_to_caption']['edges'].length > 0;
            return new Media(
              new MediaType(node['__typename']),
              node['id'],
              node['shortcode'],
              hasCaption ? node['edge_media_to_caption']['edges'][0]['node']['text'] : null,
              new Dimensions(node['dimensions']['height'], node['dimensions']['width']),
              node['display_url'],
              hasTaggedUsers
                ? node['edge_media_to_tagged_user']['edges'].map((edge) => {
                  const node = edge.node;
                  return new TaggedUser(
                    node['x'],
                    node['y'],
                    node['user']['full_name'],
                    node['user']['id'],
                    node['user']['is_verified'],
                    node['user']['profile_pic_url'],
                    node['user']['username']
                  );
                }) : [],
              node['is_video'],
              node['accessibility_caption'],
              node['comments_disabled'],
              node['edge_media_to_comment']['count'],
              node['edge_liked_by']['count'],
              node['taken_at_timestamp'],
              node['location'] ? new Location(node['location']['id'], node['location']['has_public_page'], node['location']['name'], node['location']['slug']) : null,
              hasChildren
                ? node['edge_sidecar_to_children']['edges'].map((edge) => {
                  const node = edge.node;
                  const hasTaggedUsers = node['edge_media_to_tagged_user']['edges'].length > 0;
                  return new ChildMedia(
                    new MediaType(node['__typename']),
                    node['id'],
                    node['shortcode'],
                    new Dimensions(node['dimensions']['height'], node['dimensions']['width']),
                    node['display_url'],
                    hasTaggedUsers
                      ? node['edge_media_to_tagged_user']['edges'].map((edge) => {
                        const node = edge.node;
                        return new TaggedUser(
                          node['x'],
                          node['y'],
                          node['user']['full_name'],
                          node['user']['id'],
                          node['user']['is_verified'],
                          node['user']['profile_pic_url'],
                          node['user']['username']
                        );
                      }) : [],
                    node['accessibility_caption']
                  );
                }) : [],
              node['has_audio'],
              node['video_view_count'],
              node['video_url']
            );
          }) : []
        ));
      }).catch((error) => {
        if (error instanceof NoSessionError) {
          return reject(error);
        }
        if (error.hasOwnProperty('response') && error.response.status === 404) {
          return reject(UserNotFoundError.fromUsername(username));
        }
        return reject(new InstagramGenericError(error.message));
      });
    });
  }

  static async authenticate() {
    const request = await axios.get(InstagramHelper.BASE_URL, {
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
    if (!jsonData['config'].hasOwnProperty('csrf_token')
      || !jsonData['config']['csrf_token']
    ) {
      throw new InstagramAuthenticationError('Unable to retrieve CSRF token.');
    }

    const [username, password] = [CacheStorage.get().get('username'), CacheStorage.get().get('password')];

    const csrfToken = jsonData['config']['csrf_token'];
    const encryptedPassword = InstagramHelper.getEncryptedPasswordFromPassword(password);

    const formParams = {
      'username': username,
      'enc_password': encryptedPassword
    };
    const requestHeaders = {
      'cookie': `ig_cb=1; csrftoken=${csrfToken}`,
      'referer': InstagramHelper.BASE_URL,
      'x-csrftoken': csrfToken,
      'user-agent': InstagramHelper.DEFAULT_USER_AGENT,
      'content-type': 'application/x-www-form-urlencoded'
    };

    const queryString = (new url.URLSearchParams(formParams)).toString();

    return new Promise((resolve, reject) => {
      axios.post(InstagramHelper.AUTH_URL, queryString, {
        headers: requestHeaders
      }).then(async (response) => {
        if (typeof response.data === 'object'
          && response.data.hasOwnProperty('authenticated')
          && response.data['authenticated']
        ) {
          if (response.headers.hasOwnProperty('set-cookie')) {
            const sessionIdCookieLine = response.headers['set-cookie'].filter((cookie) => cookie.includes('sessionid'))[0];
            if (!sessionIdCookieLine) {
              return reject(new InstagramAuthenticationError('Unable to find a sessionId in the cookies. Please try again.'));
            }
            const sessionId = await CookieReader.read(sessionIdCookieLine, 'sessionid');
            const expiryDate = await CookieReader.read(sessionIdCookieLine, 'expires');
            const session = new Session(sessionId, new Date(expiryDate));
            CacheStorage.get().set('session', session);
            return resolve();
          }
          return reject(new InstagramAuthenticationError('Unable to read the cookies. Try again.'));
        }
        if (typeof response.data === 'object' && response.data.hasOwnProperty('error_type') && response.data['error_type'] === 'generic_request_error') {
          return reject(new RateLimitError());
        }
        return reject(new Error('Unknown error, please submit an issue on GitHub.'));
      }).catch((error) => {
        if (typeof error === 'object' && error.hasOwnProperty('response')
          && error.response.data.message === 'Please wait a few minutes before you try again.'
        ) {
          return reject(new TooManyLoginsError());
        }
        return new InstagramGenericError(`Unkown error, please submit an issue on GitHub with the following error message: ${error.message}`);
      });
    });
  }
}

module.exports = InstagramRepository;
