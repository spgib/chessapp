const express = require('express');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.post('/signup', usersControllers.postSignup);

router.post('/login', usersControllers.postLogin);

module.exports = router;