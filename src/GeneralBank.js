import SystemService from './Services/SystemService';
import BankBalances from './BankBalances';

export default class GeneralBank {

  constructor(proximityService) {
    this.proximityService = proximityService;

    // gets an instance of the system service
    this.systemService = new SystemService();
    this.bankBalances = new BankBalances();
  }


  credit(user, transaction) {
    console.log('GeneralBank: credit entered...');

    // the transaction is an actual debit transaction
    if (!transaction.accountType || transaction.accountType !== 'credit') {
      throw new Error('transaction type is not credit')
    }

    // ensure the user exists
    if (!user) {
      throw new Error('the user does not exist');
    }

    // ensure the user is active
    if (!user.id) {
      throw new Error('the user has invalid information');
    }

    // ensure the user is active
    if (!user.active) {
      throw new Error('the user is inactive');
    }

    // ensure the user has at least 1 credit account
    if (!user.creditAccounts || user.creditAccounts.length === 0) {
      throw new Error('the user has no credit accounts');
    }

    // ensure the transaction contains a valid debit account
    if (!user.creditAccounts.find(a => a.accountNumber === transaction.accountNumber)) {
      throw new Error('the user has no matching credit account number');
    }


    console.log('All error checking passed!!!');

    // Everything checks out at this point, let's start processing the transaction
    if (transaction.amount < 5000.00) {
      // automatically process transaction

      // check for sufficient funds
      let currentBalance = this.bankBalances.getUserCurrentBalance(user.id, transaction.accountType, transaction.accountNumber);

      if (currentBalance > transaction.amount) {
        if (transaction.amount < 0.005) {
          this.creditFromAccount(user.id, transaction.accountNumber, transaction.amount);
        }
        return this.creditFromAccount(user.id, transaction.accountNumber, transaction.amount);
      } else {
        this.overCreditFromAccount(user.id, transaction.accountNumber, transaction.amount);
      }
    } else {
      // transaction is over 5000 this is a special handling
      let currentBalance = this.bankBalances.getUserBalance(user.userId, transaction.accountType, transaction.accountNumber);

      // check user limit??






    }

    return 'successful';
  }




  debit(user, transaction) {
    // the transaction is an actual debit transaction
    if (!transaction.accountType || transaction.accountType !== 'debit') {
      throw new Error('transaction type is not debit')
    }

    // ensure the user exists
    if (!user) {
      throw new Error('the user does not exist');
    }

    // ensure the user is active
    if (!user.id) {
      throw new Error('the user has invalid information');
    }

    // ensure the user is active
    if (!user.active) {
      throw new Error('the user is inactive');
    }

    // ensure the user has at least 1 debit account
    if (!user.debitAccounts || user.debitAccounts.length === 0) {
      throw new Error('the user has no debit accounts');
    }

    // ensure the transaction contains a valid debit account
    if (!user.debitAccounts.find(a => a.accountNumber === transaction.accountNumber)) {
      throw new Error('the user has no matching debit account number');
    }

    // TODO: handle future transaction


    // TODO: handle proximity errors



    console.log('All error checking passed!');

    // Everything checks out at this point, let's start processing the transaction
    if (transaction.amount < 5000.00) {
      // automatically process transaction

      // check for sufficient funds
      let currentBalance = this.bankBalances.getUserCurrentBalance(user.id, transaction.accountType, transaction.accountNumber);

      if (currentBalance > transaction.amount) {
        if (transaction.amount < 0.005) {
          this.debit(user.id, transaction.accountNumber, transaction.amount);
        }
        this.creditFromAccount(user.id, transaction.accountNumber, transaction.amount);
        return this.debitFromAccount(user.id, transaction.accountNumber, transaction.amount);
      } else {
        this.overDebitFromAccount(user.id, transaction.accountNumber, transaction.amount);
      }
    } else {
      // transaction is over 5000 this is a special handling
      let currentBalance = this.bankBalances.getUserBalance(user.userId, transaction.accountType, transaction.accountNumber);

      // check user limit??









    }

    return 'successful';
  }


  // TODO: call proximity service here


  debitFromAccount(userId, accountNumber, amount) {
    return this.bankBalances.subtractFromBalance(userId, accountNumber, amount);
  }

  overDebitFromAccount(userId, accountNumber, amount) {
    // how much is the user allowed to go over their balance amount
    return this.bankBalances.overSubtractFromBalance(userId, accountNumber, amount);
  }


  creditFromAccount(userId, accountNumber, amount) {
    return this.bankBalances.subtractFromLimit(userId, accountNumber, amount);
  }

  overCreditFromAccount(userId, accountNumber, amount) {
    // the user should not breach their credit limit
    return this.bankBalances.overSubtractFromLimit(userId, accountNumber, amount);
  }

}

