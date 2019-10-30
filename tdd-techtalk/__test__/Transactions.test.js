// If you haven't already done so, download TDD Snippets from extensions Marketplace

import { createNewTransaction } from '../src/Transactions';

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
        },
        {
          id: 2,
          accountNumber: 234567
        }
      ],
      debitAccounts: [
        {
          id: 1,
          accountNumber: 654321
        },
        {
          id: 2,
          accountNumber: 765432
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
  // user information missing
  // account #s don't match
  // user is not active
  // user has not debit accounts
  // future dated transaction
  // atm and last user location "too far away"

  describe('test all failed transactions with bad data', function () {

    it('should test that transaction throws an error when user does not exist', function () {
      const user = undefined;
      const transaction = mock_transaction;
      expect(function () { createNewTransaction(user, transaction); }).toThrow();
      expect(function () { createNewTransaction(user, transaction); }).toThrowError('the user does not exist');
    });

    it('should test that transaction throws an error when user information is invalid', function () {
      const user = {};
      const transaction = mock_transaction;
      expect(function () { createNewTransaction(user, transaction); }).toThrow();
      expect(function () { createNewTransaction(user, transaction); }).toThrowError('the user has invalid information');
    });

    it('should test a transaction with a user being inactive', function () {
      const user = mock_user;
      user.active = false;
      const transaction = mock_transaction;
      expect(function () { createNewTransaction(user, transaction); }).toThrow();
      expect(function () { createNewTransaction(user, transaction); }).toThrowError('the user is inactive');
    });

    it('should test a transaction with a user not having any debit accounts', function () {
      const user = mock_user;
      user.debitAccounts = [];
      const transaction = mock_transaction;
      expect(function () { createNewTransaction(user, transaction); }).toThrow();
      expect(function () { createNewTransaction(user, transaction); }).toThrowError('the user has no debit accounts');
    });

    it('should test a transaction with no matching debit account number', function () {
      const user = mock_user;
      const transaction = mock_transaction;
      transaction.accountNumber = 345678;
      expect(function () { createNewTransaction(user, transaction); }).toThrow();
      expect(function () { createNewTransaction(user, transaction); }).toThrowError('the user has no matching account numbers');
    });

  });


  describe('should test valid transactions', function () {

    it('should a successful transaction with proper information', function () {
      const user = mock_user;
      const transaction = mock_transaction;
      const result = createNewTransaction(user, transaction);
      expect(result).toEqual('successful');
    });

  });





});


//ieq ->







