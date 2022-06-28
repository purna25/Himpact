const express = require('express');
const {body} = require('express-validator');

const {login} = require('../controllers/login');

const loginRouter = express.Router();

loginRouter.route('').post(
  body('username').not().isEmpty().withMessage('username is required'),
  body('password').not().isEmpty().withMessage('password is required'),
  login
);

module.exports = loginRouter;