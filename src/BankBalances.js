


export default class BankBalances {

  constructor() {
    // a user cannot go over their bank balance + $200
    // if the user has $400 in their bank acocunt, but decides to withdrawal $600, they're able to
    // however,
    this.balanceTolerance = 200;
    this.userDB = [{
      userId: 1,
      accountType: 'debit',
      accountNumber: 654321,
      currentBalance: 5000,
    }, {
      userId: 2,
      accountType: 'debit',
      accountNumber: 123457,
      currentBalance: 5001,
    }, {
      userId: 3,
      accountType: 'debit',
      accountNumber: 654321,
      currentBalance: 5,
    }];
  }


  getUserCurrentBalance(userId, accountType, accountNumber) {
    let user = this.userDB.filter(u => u.userId === userId && u.accountNumber === accountNumber && u.accountType === accountType);
    return user[0].currentBalance;
  }

  subtractFromBalance(userId, accountNumber, amount) {
    console.log('BankBalances:subtractFromBalance');
    return 'This transaction is approved!';
  }

  overSubtractFromBalance(userId, accountNumber, amount) {
    console.log('BankBalances:overSubtractFromBalance');
    return 'This over transaction is approved';
  }

  subtractFromLimit(userId, accountNumber, amount) {
    console.log('BankBalances:subtractFromLimit');
    return 'This transaction limit is approved!';
  }

  overSubtractFromLimit(userId, accountNumber, amount) {
    console.log('BankBalances:overSubtractFromLimit');
    return 'This over transaction limit is approved';
  }

}
