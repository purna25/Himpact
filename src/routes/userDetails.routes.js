const express = require('express');
const {body} = require('express-validator');

const {
    getAllUserDetails,
    createUserDetails,
    deleteUserDetails
  } = require('../controllers/user_details');
  
const router = express.Router();

router
  .route('')
    .get(
      getAllUserDetails
    )
    .post(
      body('username').not().isEmpty().withMessage('username is required'),
      body('contactNumber')
        .not().isEmpty().withMessage('contactNumber is required')
        .isInt().isLength({min: 10, max: 10}).withMessage('contactNumber must be 10 digits'),
        body('password')
        .not().isEmpty().withMessage('password is required')
        .isLength({min: 6, max: 16}).withMessage('password must contain 6 - 16 characters'),
      createUserDetails
    )
    .delete(
      body('userIds').not().isEmpty().withMessage('userIds is required')
      .isArray().withMessage('userIds must be an array'),
      deleteUserDetails,
    );

module.exports = router;