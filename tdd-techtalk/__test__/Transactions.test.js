// If you haven't already done so, download TDD Snippets from extensions Marketplace

import { createNewTransaction } from '../src/Transactions';

/*

  Test a basic bank transaction against the GeneralBank functions
  You need to ensure you have 100% code coverage

*/


//des->

describe('Testing the transactions against a GeneralBank', function () {


  // Pre set-up
  let mock_user = {
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

  let mock_transaction = {
    accountType: 'debit',
    accountNumber: 654321,
    atmId: 9,
    timestamp: new Date(),
    amount: 10.0
  };


  it('should test that transaction throws an error', function () {
    const user = {};
    const transaction = mock_transaction;
    expect(function () { createNewTransaction(user, transaction); }).toThrow();
  });


  it('should a successful transaction', function () {
    const user = mock_user;
    const transaction = mock_transaction;
    const result = createNewTransaction(user, transaction);
    expect(result).toEqual('successful');
  });


});


//ieq ->







