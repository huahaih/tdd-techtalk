import ProximityService from './mock-services/mock-proximity-service';


export default class GeneralBank {

  constructor(user, proximityService) {
    this.user = user;
    this.proximityService = proximityService;

    // sets the default tolerance distance this bank will accept
    this.distanceTolerance = 200;
  }


  debit(payload) {
    console.log('GeneralBank: debit entered...');

    // first verify the user's data to ensure it's all good

    // ensure the user exists
    if (!this.user) {
      throw new Error('the user does not exist');
    }

    // ensure the user is active
    if (!this.user.id) {
      throw new Error('the user has invalid information');
    }

    // ensure the user is active
    if (!this.user.active) {
      throw new Error('the user is inactive');
    }

    // ensure the user has at least 1 debit account
    if (!this.user.debitAccounts || this.user.debitAccounts.length === 0) {
      throw new Error('the user has no debit accounts');
    }



    let currentDate = new Date();
    if (payload.timestamp > currentDate) {
      throw new Error('transaction cannot be in the future');
    }



    // checks to make sure the user isn't too far
    const verifiedResult = this.verifyProximity(this.user.id, payload.atmId);



  }


  verifyProximity(userId, atmId) {
    console.log('verifying atm to ensure its current location current makes sense to where the user was last time');
    // need to call location service
    const proximity = this.proximityService.getProximity(userId, atmId);

    console.log('proximity found: ' + proximity);

  }



  doActualDebit5000OrLess(payload, user) {

  }

  doActualDebitOver5000(payload, user) {

  }

}

