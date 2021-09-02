import InstagramRepository from '../Infrastructure/InstagramRepository';
import GetUserDataQuery from './Query/GetUserDataQuery';

class GetUserDataHandler {
  /**
   * @param {GetUserDataQuery} getUserDataQuery
   */
  static handle(getUserDataQuery) {
    return InstagramRepository.getUser(getUserDataQuery.getUserName());
  }
}

export default GetUserDataHandler;
