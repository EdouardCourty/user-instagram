const axios = require("axios");
const {normalizeUrl} = require("../src/util");

/**
 * Gets the data from the GraphQL Instagram interface.
 * @param {string} username
 * @return {Promise<Object>}
 */
module.exports = (username) => {
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
            isPrivate: user.is_private,
            isVerified: user.is_verified,
            profilePic: user.profile_pic_url,
            profilePicHD: user.profile_pic_url_hd,
            username: user.username,
            postsCount: user.edge_owner_to_timeline_media.count,
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
