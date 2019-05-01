# Node-Instagram
This module allow you to get user data from instagram link.  
<b>Example:</b>
```js
const instagram = require("user-instagram")

instagram("https://www.instagram.com/edouard_courty")
.then(data => {
  console.log(`Full name is: ${data.fullName}`)
})
.catch(e => {
  // Error will trigger if the account link provided is false.
  console.error(data)
})
```

If you have questions or if you want to make a request, please use github.

[Creator's website](https://edouard-courty.fr)