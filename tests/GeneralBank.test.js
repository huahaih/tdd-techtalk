import sinon from 'sinon';

import ProximityService from '../src/mock-services/mock-proximity-service';
import AtmService from '../src/mock-services/mock-atm-service';
import UserService from '../src/mock-services/mock-user-service';
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

    it('should test a transaction in the future', function () {
      let t = transaction.timestamp;
      t = t.setTime(t.getTime() + 7);
      expect(function () { generalBank.debit(user, transaction); }).toThrowError('the transaction is in the future');
    });

    it('should test a transaction where the atm is too far away from last location of user', function () {
      user.id = 3;
      expect(function () { generalBank.debit(user, transaction); }).toThrowError('the transaction is too far from last location of user');
    });

  });


  describe('SPY VERIFICATION', function () {
    it('should test that debitFromAccount was called once', function () {
      let debitFromAccount = sinon.spy(generalBank, 'debitFromAccount');
      generalBank.debit(user, transaction);
      sinon.assert.calledOnce(debitFromAccount);
      debitFromAccount.restore();
    });

    it('should test that debitFromAccount was called once for even $0.01', function () {
      transaction.amount = 0.03;

      let debitFromAccount = sinon.spy(generalBank, 'debitFromAccount');
      generalBank.debit(user, transaction);
      sinon.assert.calledOnce(debitFromAccount);
      debitFromAccount.restore();
    });
  });


  // Test lifecycle with stubs:
  //   Setup - Prepare object that is being tested and its stubs collaborators.
  //   Exercise - Test the functionality.
  //   Verify state - Use asserts to check object's state.
  //   Teardown - Clean up resources.

  describe('STUB VERIFICATION', function () {
    it('should test that the proximity call is stubbed out', function () {
      let getProximity = sinon.stub(generalBank, 'getProximity');
      getProximity.returns(199);

      user.id = 3;

      //expect(() => { generalBank.debit(user, transaction); }).toThrowError('the transaction is too far from last location of user');
      generalBank.debit(user, transaction);

      sinon.assert.calledWith(getProximity, user.id, transaction.atmId);
      getProximity.restore();
    });


  });


  // Test lifecycle with mocks:
  //   Setup data - Prepare object that is being tested.
  //   Setup expectations - Prepare expectations in mock that is being used by primary object.
  //   Exercise - Test the functionality.
  //   Verify expectations - Verify that correct methods has been invoked in mock.
  //   Verify state - Use asserts to check object's state.
  //   Teardown - Clean up resources.

  describe('MOCK VERIFICATION', function () {
    it('should test functions in GeneralBank are mocked', () => {
      let gBank = sinon.mock(generalBank);

      gBank.expects('getProximity').once().withArgs(user.id, transaction.atmId);
      gBank.expects('debitFromAccount').once().withArgs(user.id, transaction.accountNumber, transaction.amount);
      gBank.expects('creditFromAccount').never().withArgs(user.id, transaction.accountNumber, transaction.amount);
      generalBank.debit(user, transaction);

      gBank.verify();
      gBank.restore();
    });

  });


});
