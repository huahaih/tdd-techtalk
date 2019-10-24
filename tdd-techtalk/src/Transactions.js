import GeneralBank from '../src/GeneralBank';
import LocationService from './mock-services/mock-location-service';
import AtmService from './mock-services/mock-atm-service';
import UserService from './mock-services/mock-user-service';

const createNewTransaction = (user, transaction) => {
  console.log('createNewTransaction entered...');
  let userService = new UserService();
  let atmService = new AtmService();
  let locationService = new LocationService(userService, atmService);

  let generalBank = new GeneralBank(user, locationService);

  try {
    console.log('initiate debit transaction');
    generalBank.debit(transaction);
  } catch (err) {
    throw new Error('there was a catastrophic error');
  }
};

export { createNewTransaction };
