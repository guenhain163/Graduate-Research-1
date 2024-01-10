const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const compilerRouter = require('./compiler');
/* GET home page. */
router.get('/', (req, res) => {
    res.json({status: 'healthy'});
});

router.use('/user', usersRouter);
router.use('/compiler', compilerRouter);

module.exports = router;
