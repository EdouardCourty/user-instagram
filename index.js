const {getUserData, getPostData} = require("./src/scrape");

/**
 * @param username { String }
 * @return { Promise<Object> }
 */
module.exports = getUserData;
module.exports.getUserData = getUserData;
module.exports.getPostData = getPostData;
