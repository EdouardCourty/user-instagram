const scrape = require("../index")

scrape("https://www.instagram.com/edouard_courty").then(result => {
  console.log(result)
}).catch(e => {
  console.error(e)
})

// This will log an object containing user data, and an array containing the 12 first posts of the account.
// I'll update this module and git repository when i'll have found how to get all the posts