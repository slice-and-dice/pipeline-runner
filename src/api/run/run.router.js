const { Router } = require('express');
const runController = require('./run.controller.js');

module.exports = () => {
  const router = Router();

  router.post('', async (req, res) => {
    res.send(await runController(req.body));
  });

  return router;
};
