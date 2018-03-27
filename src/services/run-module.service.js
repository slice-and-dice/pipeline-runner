const store = require('../store');
const fetch = require('node-fetch');
const winston = require('winston');

const run = async (module, postBody) => {
  winston.info(`run-module.service: run() called with module URL ${module.url}`);
  try {
    const result = await fetch(module.url, {
      method: module.method,
      body: module.method === 'POST' ? JSON.stringify(postBody) : null,
      headers: { 'Content-Type': 'application/json' }
    });
    let json = await result.json();
    if (json) {
      winston.info('run-module.service: run() successful');
      return json;
    }
    else {
      winston.error('run-module.service: run() failed', result);
    }
  } catch (error) {
    winston.error('run-module.service: run() failed', error);
  }
};

const recover = async (id) => {
  winston.info('run-module.service: recover() called');

  let currentStored = await store.retrieveReg(id);

  winston.info('run-module.service: recover() successful');
  return currentStored;
}

module.exports = {
  run,
  recover
};