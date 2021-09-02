import UserInstagram from '../index';

describe('General testing', () => {
  it('Should get user data', async () => {
    const username = 'issouflehchehhzhzhzz';
    const userData = await UserInstagram.getUserData(username);
    expect(userData.getUsername()).toEqual(username);
  });
});
