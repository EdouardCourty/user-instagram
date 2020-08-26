const axios = require("axios");
const {normalizeUrl, normalizePostUrl} = require("../src/util");

/**
 * Gets the data from the GraphQL Instagram interface.
 * @param {string} username
 * @return {Promise<Object>}
 */
module.exports.getUserData = (username) => {
  return new Promise(async (resolve,reject) => {
    const REQUEST_PARAMETERS = {
        method: "GET",
        url: normalizeUrl(username),
        headers: {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
            "authority": "www.instagram.com",
            "cache-control": "max-age=0"
        }
    };
    const GQL = await axios(REQUEST_PARAMETERS)
        .catch(reject);
    if (GQL) {
        let user = GQL.data.graphql.user;
        resolve({
            link: REQUEST_PARAMETERS.url.replace("/?__a=1", ""),
            id: user.id,
            biography: user.biography,
            subscribersCount: user.edge_followed_by.count,
            subscribtions: user.edge_follow.count,
            fullName: user.full_name,
            highlightCount: user.highlight_reel_count,
            isBusinessAccount: user.is_business_account,
            isRecentUser: user.is_joined_recently,
            accountCategory: user.business_category_name,
            linkedFacebookPage: user.connected_fb_page,
            isPrivate: user.is_private,
            isVerified: user.is_verified,
            profilePic: user.profile_pic_url,
            profilePicHD: user.profile_pic_url_hd,
            username: user.username,
            postsCount: user.edge_owner_to_timeline_media.count,
            // savedMedia: {
            //     count: user.edge_saved_media.count,
            //     savedMedias: user.edge_saved_media.edges.map(edge => {
            //         return {
            //             id: edge.node.id,
            //             shortcode: edge.node.shortcode,
            //             url: `https://www.instagram.com/p/${edge.node.shortcode}/`,
            //             owner: edge.node.owner,
            //             commentCount: edge.node.edge_media_to_comment.count,
            //             likesCount: edge.node.edge_liked_by.count
            //         }
            //     })
            // },
            posts: user.edge_owner_to_timeline_media.edges.map(edge => {
                let hasCaption = edge.node.edge_media_to_caption.edges[0];
                return {
                    id: edge.node.id,
                    shortCode: edge.node.shortcode,
                    url: `https://www.instagram.com/p/${edge.node.shortcode}/`,
                    dimensions: edge.node.dimensions,
                    imageUrl: edge.node.display_url,
                    isVideo: edge.node.is_video,
                    caption: hasCaption ? hasCaption.node.text : "",
                    commentsCount: edge.node.edge_media_to_comment.count,
                    commentsDisabled: edge.node.comments_disabled,
                    timestamp: edge.node.taken_at_timestamp,
                    likesCount: edge.node.edge_liked_by.count,
                    location: edge.node.location,
                    children: edge.node.edge_sidecar_to_children ? edge.node.edge_sidecar_to_children.edges.map(edge => {
                        return {
                            id: edge.node.id,
                            shortCode: edge.node.shortcode,
                            dimensions: edge.node.dimensions,
                            imageUrl: edge.node.display_url,
                            isVideo: edge.node.is_video,
                        }
                    }) : []
                }
            }) || []
        });
    }
  });
};

/**
 * Using this a picture posted by a private won't work.
 * @param {string} shortcode
 * @returns {Promise<Object>}
 */
module.exports.getPostData = (shortcode) => {
    return new Promise(async (resolve, reject) => {
        const REQUEST_PARAMETERS = {
            method: "GET",
            url: normalizePostUrl(shortcode),
            headers: {
                "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
                "authority": "www.instagram.com",
                "cache-control": "max-age=0"
            }
        };
        const GQL = await axios(REQUEST_PARAMETERS)
          .catch(reject);
        if (GQL) {
            let media_data = GQL.data.graphql.shortcode_media;
            let has_caption = media_data.edge_media_to_caption.edges.length > 0;
            resolve({
                link: REQUEST_PARAMETERS.url.replace("/?__a=1", ""),
                shortcode: media_data.shortcode,
                dimensions: media_data.dimensions,
                displayUrl: media_data.display_url,
                isVideo: media_data.is_video,
                wasCaptionEdited: media_data.caption_is_edited,
                caption: has_caption? media_data.edge_media_to_caption.edges[0].node.text : null,
                commentsCount: media_data.edge_media_to_parent_comment.count,
                areCommentsDisabled: media_data.comments_disabled,
                takenAt: media_data.taken_at_timestamp,
                likesCount: media_data.edge_media_preview_like.count,
                location: media_data.location ? {
                    id: media_data.location.id,
                    hasPublicPage: media_data.location.has_public_page,
                    name: media_data.location.name,
                    slug: media_data.location.slug,
                    jsonName: media_data.location.address_json,
                } : null,
                owner: {
                    id: media_data.owner.id,
                    username: media_data.owner.username,
                    profilePicture: media_data.owner.profile_pic_url,
                    full_name: media_data.owner.full_name,
                    postsCount: media_data.owner.edge_owner_to_timeline_media,
                    followersCount: media_data.owner.edge_followed_by,
                    isPrivate: media_data.owner.is_private,
                    isVerified: media_data.owner.is_verified,
                },
                isAnAd: media_data.is_ad,
                childrenPictures: media_data.edge_sidecar_to_children ? media_data.edge_sidecar_to_children.map(edge => {
                    return {
                        id: edge.node.id,
                        shortcode: edge.node.shortcode,
                        dimensions: edge.node.dimensions,
                        displayUrl: edge.node.display_url,
                        isVideo: edge.node.is_video
                    }
                }) : [],
                comments: media_data.edge_media_to_parent_comment.edges.map(edge => {
                    return {
                        id: edge.node.id,
                        text: edge.node.text,
                        createdAt: edge.node.created_at,
                        author: {
                            id: edge.node.owner.id,
                            isVerified: edge.node.owner.is_verified,
                            username: edge.node.owner.username,
                            profilePicture: edge.node.owner.profile_pic_url
                        },
                        likesCount: edge.node.edge_liked_by.count
                    }
                }),
                taggedUsers: (media_data.edge_media_to_tagged_user.edges) ? media_data.edge_media_to_tagged_user.edges.map(tag => {
                    return {
                        fullName: tag.node.user.full_name,
                        id: tag.node.user.id,
                        isVerified: tag.node.user.is_verified,
                        username: tag.node.user.username,
                        tagLocation: {
                            x: tag.node.x,
                            y: tag.node.y
                        }
                    }
                }) : null
            });
        }
    });
};
