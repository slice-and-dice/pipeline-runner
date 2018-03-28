const store = {
  "tempRegistrations": {},
};

const randomlyFail = () => Math.random() > 1;

const storeReg = (regObject) => {
  return new Promise((resolve, reject) => {
    if (randomlyFail()) {
      reject(new Error(`Could not add registration ${id} to temporary store`));
    } else {
      store.tempRegistrations[regObject.registrationId] = regObject;
      resolve(`Added registration ${regObject.registrationId} to temporary store`);
    }
  });
}

const retrieveReg = (registrationId) => {
  return new Promise((resolve, reject) => {
    if (randomlyFail() || !store.tempRegistrations[registrationId]) {
      reject(new Error(`Could not retrieve registration ${registrationId} from temporary store`));
    } else {
      resolve(store.tempRegistrations[registrationId]);
    }
  });
}

const deleteReg = (registrationId) => {
  return new Promise((resolve, reject) => {
    if (randomlyFail() || !store.tempRegistrations[registrationId]) {
      reject(new Error(`Could not delete registration ${registrationId} from temporary store`));
    } else {
      delete store.tempRegistrations[registrationId];
      resolve(`Added registration ${registrationId} to temporary store`);
    }
  });
}

module.exports = {
  storeReg,
  retrieveReg,
  deleteReg
};