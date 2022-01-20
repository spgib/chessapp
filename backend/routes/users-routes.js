const express = require('express');
const { body } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.post(
  '/signup',
  [
    body('name').not().isEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  usersControllers.postSignup
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  usersControllers.postLogin
);

module.exports = router;
