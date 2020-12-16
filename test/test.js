const {assert, expect} = require('chai');
const Instagram = require("../index");

describe('Instagram', () => {
  describe('#User', () => {
    it('Should return an error if a wrong username is fetched.', async () => {
      let error = null;
      let data = null;
      try {
        data = await Instagram.getUserData('ThisUsernameSurelyDoesntExists');
      } catch (err) {
        error = err;
      }
      expect(error).not.to.be.null;
      expect(data).to.be.null;
    })

    it('Should return user data', async () => {
      let error = null;
      let data = null;
      try {
        data = await Instagram.getUserData('instagram');
      } catch (err) {
        error = err;
      }
      expect(error).to.be.null;
      expect(data).not.to.be.null;
      assert.instanceOf(data, Object);
    })
  })

  describe("#Post", () => {
    it('Should return an error if a wrong shortcode is fetched.', async () => {
      let error = null;
      let data = null;
      try {
        data = await Instagram.getPostData('ThisShortcodeSurelyDoesntExists');
      } catch (err) {
        error = err;
      }
      expect(error).not.to.be.null;
      expect(data).to.be.null;
    })

    it('Should return post data', async () => {
      let error = null;
      let data = null;
      try {
        data = await Instagram.getPostData('CHN1U3TF3VH');
      } catch (err) {
        error = err;
      }
      expect(error).to.be.null;
      expect(data).not.to.be.null;
      assert.instanceOf(data, Object);
    })
  })
})

require("../index").getUserData("edouardcourty").then(console.log).catch(console.error);
