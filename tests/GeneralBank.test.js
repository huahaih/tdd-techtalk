import sinon from 'sinon';

import ProximityService from '../src/Services/ProximityService';
import AtmService from '../src/Services/ATMService';
import UserService from '../src/Services/UserService';
import GeneralBank from '../src/GeneralBank';


describe('TESTING GENERAL BANK', function () {
  let userService;
  let atmService;
  let proximityService;
  let generalBank;

  beforeAll(function () {
    userService = new UserService();
    atmService = new AtmService();
    proximityService = new ProximityService(userService, atmService);
    generalBank = new GeneralBank(proximityService);
  });


  let user = {};
  let transaction = {};
  beforeEach(function () {
    // Pre set-up
    user = {
      id: 1,
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

    transaction = {
      accountType: 'debit',
      accountNumber: 654321,
      atmId: 1,
      timestamp: new Date(),
      amount: 10.0
    };

  });


  describe('TESTING FAILED TRANSACTIONS', function () {

    it('should test that transaction throws an error when user does not exist', function () {
      user = undefined;
      expect(function () { generalBank.debit(user, transaction); }).toThrowError('the user does not exist');
    });

    it('should test that transaction throws an error when user information is invalid', function () {
      user = {};
      expect(function () { generalBank.debit(user, transaction); }).toThrowError('the user has invalid information');
    });

    it('should test a transaction with a user being inactive', function () {
      user.active = false;
      expect(function () { generalBank.debit(user, transaction); }).toThrowError('the user is inactive');
    });

    it('should test a transaction with a user not having any debit accounts', function () {
      user.debitAccounts = [];
      expect(function () { generalBank.debit(user, transaction); }).toThrowError('the user has no debit accounts');
    });

    it('should test that transaction throws an error when transaction type is not debit', function () {
      transaction.accountType = 'credit';
      expect(function () { generalBank.debit(user, transaction); }).toThrowError('transaction type is not debit');
    });

    it('should test a transaction with no matching debit account number', function () {
      transaction.accountNumber = 345678;
      expect(function () { generalBank.debit(user, transaction); }).toThrowError('the user has no matching debit account number');
    });

    // TODO (1): check transaction is not in the future


    // TODO (2): check proximity issues


  });


  // Read more on spies: https://sinonjs.org/releases/latest/spies/
  describe('SPY VERIFICATION', function () {
    // TODO (2a):





    // TODO (3): what else can you do here?




  });


  // Test lifecycle with stubs:
  //   Setup - Prepare object that is being tested and its stubs collaborators.
  //   Exercise - Test the functionality.
  //   Verify state - Use asserts to check object's state.
  //   Teardown - Clean up resources.
  // Read more on stubs: https://sinonjs.org/releases/latest/stubs/
  describe('STUB VERIFICATION', function () {


    // TODO (2b): proximity & rejection




  });


  // Test lifecycle with mocks:
  //   Setup data - Prepare object that is being tested.
  //   Setup expectations - Prepare expectations in mock that is being used by primary object.
  //   Exercise - Test the functionality.
  //   Verify expectations - Verify that correct methods has been invoked in mock.
  //   Verify state - Use asserts to check object's state.
  //   Teardown - Clean up resources.
  // Read more on mocks: https://sinonjs.org/releases/latest/mocks/

  describe('MOCK VERIFICATION', function () {

    // TODO: (4) - ensure only functions called on behalf of debit






  });


});
