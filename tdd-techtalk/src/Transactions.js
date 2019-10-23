const createNewTransaction = (info, callback) => {
  console.log('--> createNewTransaction enter <--');

  let user = {
    name: info.name,
    accountType: 'chequing',
  };

  try {
    GeneralBank.debit(user, callback);
  } catch (err) {
    callback(err);
  }
};
