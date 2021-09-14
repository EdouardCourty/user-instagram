import UserInstagram from '../index';
import InstagramRepository from '../src/Instagram/Infrastructure/InstagramRepository';

describe('General testing', () => {
  it('Should authenticate', () => {
    InstagramRepository.authenticate('edouard_courty', 'Iceberg45');
  })
  it('Should get user data', async () => {
    const username = 'iueojzapokeaezea';
    const userData = await UserInstagram.getUserData(username);
    expect(userData.getUsername()).toEqual(username);
  });
});
