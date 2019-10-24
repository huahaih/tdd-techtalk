import GeneralBank from '../src/GeneralBank';
import LocationService from './mock-services/mock-location-service';

const createNewTransaction = (user, transaction) => {
  console.log('createNewTransaction entered...');
  let generalBank = new GeneralBank(user, new LocationService());

  try {
    console.log('initiate debit transaction');
    generalBank.debit(user);
  } catch (err) {
    throw new Error('there was a catastrophic error');
  }
};

export { createNewTransaction };
