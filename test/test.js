const {assert, should, expect} = require('chai');
const Instagram = require("../index");

describe('Instagram', () => {
  describe('#User', () => {
    it('Should return an error if a wrong username is fetched.', async () => {
      expect(await Instagram.getUserData('ThisIsObviouslyAFakeUsernameItCantExist')).to.throw
    })

    it('Should return user data', async () => {
      expect(await Instagram.getUserData('edouardcourty')).not.to.throw
    })
  })

  describe("#Post", () => {
    it('Should return an error if a wrong shortcode is fetched.', async () => {
      expect(await Instagram.getPostData('ThisShortCodeDoesNotExist')).to.throw
    })

    it('Should return post data', async () => {
      expect(await Instagram.getPostData('CHN1U3TF3VH')).not.to.throw
    })
  })
})
