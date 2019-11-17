
// gets the location of the ATM given the atmId

export default class AtmService {

  constructor() { }


  getLocation(atmId) {
    let location = 0;

    switch (atmId) {
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
