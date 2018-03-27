const { Router } = require('express');
const runRouter = require('./run');

module.exports = () => {
  const router = Router();

  router.use('/run', runRouter());

  return router;
};
