var express = require('express');
var router = express.Router();
var loginsignupController = require('../Controllers/login-signup-controller');


/* GET home page. */
  router.post('/api/login', loginsignupController.login);
  router.post('/api/signup', loginsignupController.signup);

module.exports = router;
