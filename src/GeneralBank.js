import SystemService from './mock-services/mock-system-service';
import BankBalances from './BankBalances';

export default class GeneralBank {

  constructor(user, proximityService) {
    this.user = user;
    this.proximityService = proximityService;

    // sets the default tolerance distance this bank will accept
    this.distanceTolerance = 200;

    // gets an instance of the system service
    this.systemService = new SystemService();
    this.bankBalances = new BankBalances();
  }


  debit(transaction) {
    console.log('GeneralBank: debit entered...');

    // the transaction is an actual debit transaction
    if (!transaction.accountType || transaction.accountType !== 'debit') {
      throw new Error('transaction type is not debit')
    }

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

    // ensure the transaction contains a valid debit account
    if (!this.user.debitAccounts.find(a => a.accountNumber === transaction.accountNumber)) {
      throw new Error('the user has no matching debit account number');
    }


    let currentDate = this.systemService.getCurrentTime();
    if (transaction.timestamp > currentDate) {
      throw new Error('the transaction is in the future');
    }

    // checks to make sure the user isn't too far
    const userAtmProximity = this.getProximity(this.user.id, transaction.atmId);
    if (userAtmProximity > this.distanceTolerance) {
      throw new Error('the transaction is too far from last location of user');
    }


    // Everything checks out at this point, let's start processing the transaction
    if (transaction.amount < 5000.00) {
      // automatically process transaction

      // check for sufficient funds
      let currentBalance = this.bankBalances.getUserCurrentBalance(this.user.id, transaction.accountType, transaction.accountNumber);

      if (currentBalance > transaction.amount) {
        return this.debitFromAccount(this.user.id, transaction.accountNumber, transaction.amount);
      } else {
        this.overDebitFromAccount(this.user.id, transaction.accountNumber, transaction.amount);
      }
    } else {
      // transaction is over 5000 this is a special handling
      this.bankBalances.getUserBalance(this.user.userId, transaction.accountType, transaction.accountNumber);
      // check user limit??

    }

    return 'successful';
  }


  getProximity(userId, atmId) {
    return this.proximityService.getProximity(userId, atmId);
  }


  debitFromAccount(userId, accountNumber, amount) {
    return this.bankBalances.subtractFromBalance(userId, accountNumber, amount);
  }

  overDebitFromAccount(userId, accountNumber, amount) {

  }


  creditFromAccount(userId, accountNumber, amount) {

  }

}

