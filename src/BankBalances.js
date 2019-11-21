


export default class BankBalances {

  constructor(user, proximityService) {
    this.user = user;
    this.proximityService = proximityService;

    // sets the default tolerance distance this bank will accept
    this.distanceTolerance = 200;
  }
}
