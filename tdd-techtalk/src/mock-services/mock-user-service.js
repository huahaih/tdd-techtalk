
// Gets general information about a user

export default class UserService {

  constructor() { }

  getLastUserTransactionLocation(userId) {
    let location = 0;

    switch (userId) {
      case 1:
        location = 100;
        break;
      case 2:
        location = 200;
        break;
      case 3:
        location = 300;
        break;
      default:
        location = 1000;
    }

    return location;
  }

}


