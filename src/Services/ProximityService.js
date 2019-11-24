
export default class ProximityService {

  constructor(userService, atmService) {
    this.userService = userService;
    this.atmService = atmService;
  }


  getProximity(userId, atmId) {
    console.log('verifying the vicinity of 2 ids');
    // need to grab both of their locations first by using both the
    // user service and the atm service

    const userLocation = this.userService.getLastUserTransactionLocation(userId);
    const atmLocation = this.atmService.getLocation(atmId);

    return Math.abs(atmLocation - userLocation);
  }

}


