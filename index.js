const request = require("request-promise")
const { getData } = require("./src/scrape")
 
function scrape(url) {
  return new Promise((resolve, reject) => {
    request(url).then(data => {
      resolve(getData(data))
    }).catch(e => {
      reject(e)
    })
  })
}

module.exports = scrape