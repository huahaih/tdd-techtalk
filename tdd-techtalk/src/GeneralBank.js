import LocationService from './mock-services/mock-location-service';


export default class GeneralBank {


  constructor(user, locationService) {
    this.user = user;
    this.locationService = locationService;
  }


  debit(payload) {
    console.log('GeneralBank: debit entered...');

    // first verify the user's data to ensure it's all good

    // ensure the user exists
    if (!this.user) {
      throw new Error('the user does not exist');
    }

    // ensure the user is active
    if (!this.user.active) {
      throw new Error('the user is inactive');
    }

    if (!this.user.debitAccounts || this.user.debitAccounts.length === 0) {
      throw new Error('the user has no debit accounts');
    }


    // second verify any payload data that may be 'suspicious'

    let currentDate = new Date();
    if (payload.timestamp > currentDate) {
      throw new Error('transaction cannot be in the future');
    }

    const verifiedResult = this.verifyVicinity(this.user.id, payload.atmId);



  }


  verifyVicinity(userId, atmId) {
    console.log('verifying atm to ensure its current location current makes sense to where the user was last time');
    // need to call location service
    this.locationService.verifyVicinity(userId, atmId);

  }



  doActualDebit5000OrLess(payload, user) {

  }

  doActualDebitOver5000(payload, user) {

  }

}

