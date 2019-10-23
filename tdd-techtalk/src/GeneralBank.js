
export default class GeneralBank {



  constructor(user) {
    this.user = user;
  }


  /*

    user
    user.id
    user.active
    user.creditAccounts[]
    user.debitAccounts[]

    payload.accountNumber
    payload.atmID (need to find an ATM locator)
    payload.timestamp
    payload.amount




  */

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

    verifyAtmId(this.user.id, payload.atmId);



  }


  verifyAtmId(userid, atmid) {

  }



  doActualDebit5000OrLess(payload, user) {

  }

  doActualDebitOver5000(payload, user) {

  }

}

