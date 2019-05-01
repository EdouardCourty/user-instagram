# Node-Instagram
[![NPM](https://nodei.co/npm/user-instagram.png)](https://nodei.co/npm/user-instagram)  
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

This module only uses ES6 Promises.
By the future, i'll update this module to add methods.

[Creator's website](https://edouard-courty.fr)