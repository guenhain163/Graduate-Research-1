const {check} = require('express-validator');

const loginValidation = [
  check('username')
    .exists()
    .withMessage('Username is required')
    .isLength({min: 8, max: 8})
    .withMessage('Username must be exactly 8 characters')
    .matches(/^\d{8}$/)
    .withMessage('Username must consist of 8 digits'),

  check('password')
    .exists()
    .withMessage('Password is required')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters'),
];

module.exports = {
  loginValidation,
};
