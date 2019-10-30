import GeneralBank from '../src/GeneralBank';
import ProximityService from './mock-services/mock-proximity-service';
import AtmService from './mock-services/mock-atm-service';
import UserService from './mock-services/mock-user-service';


const createNewTransactionDebit = (user, transaction) => {
  console.log('createNewTransactionDebit entered...');
  let userService = new UserService();
  let atmService = new AtmService();
  let proximityService = new ProximityService(userService, atmService);

  let generalBank = new GeneralBank(user, proximityService);

  try {
    console.log('initiate debit transaction');
    return generalBank.debit(transaction);
  } catch (err) {
    // rethrow the error for caller to handle
    throw new Error(err);
  }
};

export { createNewTransactionDebit };