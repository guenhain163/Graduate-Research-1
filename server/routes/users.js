const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');
const utils = require('../utils');
const router = express.Router();

router.post('/login', middlewares.validator(utils.validator.loginValidation), controllers.users.login);

module.exports = router;
