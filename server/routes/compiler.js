const express = require('express');
const controllers = require('../controllers');
const router = express.Router();

router.post('/', controllers.compiler.execute);

module.exports = router;
