# User-Instagram
![npm](https://img.shields.io/npm/dt/user-instagram) ![David](https://img.shields.io/david/EdouardCourty/user-instagram)
<br>
[![NPM](https://nodei.co/npm/user-instagram.png)](https://nodei.co/npm/user-instagram)  

## Introduction
The aim of this module is to provide an easy way to retrieve a user's Instagram data.  
This module is available on NPM.
```
npm install user-instagram
```

## Usage

I tried to make this module user-friendly as much as I could. Just provide a username or a profile link.
  
```js
const userInstagram = require("user-instagram");

userInstagram("edouard_courty")
  .then(console.log)
  .catch(console.error);
```

## Data Structure

The output will look like the following:
```json
{
  "id": "<userId>",
  "profileLink": "https://www.instagram.com/edouard_courty",
  "biography": "<Biography>",
  "subscriberCount": 444,
  "subscribtions": 362,
  "postsCount": 27,
  "fullName": "Edouard Courty",
  "username": "edouard_courty",
  "isPrivate": false,
  "isVerified": false,
  "profilePic": "<ProfilePicThumbnailLink>",
  "profilePicHD": "<HDProfilePicLink>",
  "posts": []
}
```
This module uses ES6 Promises.

© 2020 - Edouard Courty