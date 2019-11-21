// If you haven't already done so, download TDD Snippets from extensions Marketplace

import { createNewTransactionDebit } from '../src/Transactions';
/*


  Test a basic bank transaction against the GeneralBank functions
  You need to ensure you have 100% code coverage

*/


//des->

describe('Testing the transactions against a GeneralBank', function () {

  let mock_user = {};
  let mock_transaction = {};

  beforeEach(function () {
    // Pre set-up
    mock_user = {
      id: '1',
      active: true,
      creditAccounts: [
        {
          id: 1,
          accountNumber: 123456
        }
      ],
      debitAccounts: [
        {
          id: 1,
          accountNumber: 654321
        }
      ]
    };

    mock_transaction = {
      accountType: 'debit',
      accountNumber: 654321,
      atmId: 9,
      timestamp: new Date(),
      amount: 10.0
    };

  });

  // Part 1 - test all bad transactions:
  // user information doesn't exist
  // user has no data
  // user is not active
  // user has no debit accounts

  // transaction is not debit
  // transaction account number don't match
  // transaction date is in the future
  // atm and last user location "too far away"

  describe('TESTING FAILED TRANSACTIONS', function () {

    it('should test that transaction throws an error when user does not exist', function () {
      const user = undefined;
      const transaction = mock_transaction;
      expect(function () { createNewTransactionDebit(user, transaction); }).toThrowError('the user does not exist');
    });

    it('should test that transaction throws an error when user information is invalid', function () {
      const user = {};
      const transaction = mock_transaction;
      expect(function () { createNewTransactionDebit(user, transaction); }).toThrowError('the user has invalid information');
    });

    it('should test a transaction with a user being inactive', function () {
      const user = mock_user;
      user.active = false;
      const transaction = mock_transaction;
      expect(function () { createNewTransactionDebit(user, transaction); }).toThrowError('the user is inactive');
    });

    it('should test a transaction with a user not having any debit accounts', function () {
      const user = mock_user;
      user.debitAccounts = [];
      const transaction = mock_transaction;
      expect(function () { createNewTransactionDebit(user, transaction); }).toThrowError('the user has no debit accounts');
    });

    it('should test that transaction throws an error when transaction type is not debit', function () {
      const user = mock_user;
      const transaction = mock_transaction;
      transaction.accountType = 'credit';
      expect(function () { createNewTransactionDebit(user, transaction); }).toThrowError('transaction type is not debit');
    });

    it('should test a transaction with no matching debit account number', function () {
      const user = mock_user;
      const transaction = mock_transaction;
      transaction.accountNumber = 345678;
      expect(function () { createNewTransactionDebit(user, transaction); }).toThrowError('the user has no matching debit account number');
    });

    it('should test a transaction in the future', function () {
      const user = mock_user;
      const transaction = mock_transaction;
      transaction.timestamp = transaction.timestamp.setTime(transaction.timestamp.getTime() + 7);
      expect(function () { createNewTransactionDebit(user, transaction); }).toThrowError('the transaction is in the future');
    });

    it('should test a transaction where the atm is too far away from last location of user', function () {
      const user = mock_user;
      user.id = 3;
      const transaction = mock_transaction;
      expect(function () { createNewTransactionDebit(user, transaction); }).toThrowError('the transaction is too far from last location of user');
    });
  });


  describe('TESTING SUCCESSFUL TRANSACTIONS', function () {

    it('should a successful transaction with proper information', function () {
      const user = mock_user;
      const transaction = mock_transaction;
      const result = createNewTransactionDebit(user, transaction);
      expect(result).toEqual('This transaction is approved!');
    });

    // do another test for over debiting

  });


});


//ieq ->







