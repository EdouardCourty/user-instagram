# User Instagram

[![Downloads](https://img.shields.io/npm/dt/user-instagram)](https://img.shields.io/david/EdouardCourty/user-instagram)
[![Node.js CI](https://github.com/EdouardCourty/user-instagram/actions/workflows/node.js.yml/badge.svg)](https://github.com/EdouardCourty/user-instagram/actions/workflows/node.js.yml)

## Usage

Use this module in your projet by installing it with `npm install user-instagram`.

Here is a quick example or usage:
```javascript
const instagram = require('user-instagram');

await instagram.authenticate('my_instagram_username', 'my_instagram_password');

// Fetching a user
instagram.getUserData('edouard_courty').then(userData => {
  // Do whatever you need to to with this data
  console.log(`My username is ${userData.getUsername()}.`);
})

// Fetching a post
instagram.getPostData('CUc7tBPFXvP').then(postData => {
  // Do whatever you need to to with this data
  console.log(`The caption of this post is ${postData.getCaption()}.`);
})
```

## Documentation

In the previous versions of `user-instagram`, only a small amount of requests could be sent every day without getting rate-mimited.  
Couple of issues were submitted about this problem and it's the main reason why I decided to refactor this module, and add an authentication method to it. 

### Authentication

The `authenticate` method takes two mandatory parameters: `username` and `password`.  
A good way to keep these strings safe is storing them in an uncommited file in your repo like some `instagram_config.json` file structured like the following:
```json
{
  "username": "your username here",
  "password": "your password here"
}
```
Then use it like this:
```javascript
const instagram = require('user-instagram');
const {username, password} = require('instagram_config.json')

await instagram.authenticate(username, password);
```

### Getting a user's data

When logged in, you can request the data of any public user you want, plus the private users that your account follows.  
The `getUserData` method takes only one parameter: the username of the user to be fetched.  

This method will return a promise holding a `User` class, containing getters for all the interesting properties of this class.

#### Available user properties

All the boolean values are accessed with the following methods: (the function names should be self explanatory of their return value)
- `isVerified()`
- `isPrivate()`
- `isBusinessAccount()`
- `isProfessionalAccount()`
- `hasClips()`
- `hasArEffect()`
- `hasChannel()`
- `hasGuides()`
- `isHidingLikesAndViewsCount()`
- `hasJoinedRecently()`

All the non-boolean values are accessed with the following methods:
- `getUsername()`
- `getBiography()`
- `getPublicationsCount()`
- `getFollowersCount()`
- `getExternalUrl()`
- `getFollowingCount()`
- `getFullName()`
- `getHighlightsReelsCount()`
- `getId()`
- `getBusinessAddressJson()`
- `getBusinessContactMethod()`
- `getBusinessEmail()`
- `getBusinessPhoneNumber()`
- `getBusinessCategoryName()`
- `getOverallCategoryName()`
- `getCategoryEnum()`
- `getProfilePicture()`
- `getHdProfilePicture()`
- `getPronouns()`
- `getMedias()`

### Getting a post's data

When logged in, you can request the data of any public post you want, plus the posts of the private accounts that your account follows.  
The `getPostData` method takes only one parameter: the shortcode of the post to be fetched.

This method will return a promise holding a `Post` class, containing getters for all the interesting properties of this class.

#### Available post properties

All the boolean values are accessed with the following methods: (the function names should be self explanatory of their return value)
- `isVideo()`
- `areCommentsDisabled()`
- `areLikesAndViewsCountDisabled()`
- `isPaidPartnership()`
- `isAd()`
- `hasAudio()`

All the non-boolean values are accessed with the following methods:
- `getId()`
- `getType()`
- `getShortcode()`
- `getDimensions()`
- `getDisplayUrl()`
- `getVariants()`
- `getAccessibilityCaption()`
- `getTaggedUsers()`
- `getCaption()`
- `getCommentsCount()`
- `getComments()`
- `getDate()`
- `getLikesCount()`
- `getLocation()`
- `getOwner()`
- `getChildren()`
- `getVideoViewsCount()`
- `getVideoPlaysCount()`

#### Generic properties shared across the module

Each Media from the `getMedias()` in the `User` class method is a `Media` class that has these getters:
- `getType()`
- `getId()`
- `getShortcode()`
- `getCaption()`
- `getDimensions()`
- `getDisplayUrl()`
- `getTaggedUsers()`
- `isVideo()`
- `getAccessibilityCaption()`
- `areCommentsDisabled()`
- `getCommentsCount()`
- `getLikesCount()`
- `getTimestamp()`
- `getLocation()`
- `getChildren()`
- `hasAudio()`
- `getViewsCount()`
- `getVideoUrl()`

Every `TaggerUser` from `getTaggedUsers()` in a `Post` or a `User.getMedias()` hold the following getters:
- `getTagXPosition()`
- `getTagYPosition()`
- `getFullName()`
- `getId()`
- `isVerified()`
- `getProfilePictureUrl()`
- `getUsername()`

Every dimension value from `getDimensions()` from a `Media` or a `Post` is a `Dimension` class with a bult-in aspect-ratio calculator:
- `getHeight()`
- `getWidth()`
- `getAspectRatio()`

&copy; Edouard Courty - 2021