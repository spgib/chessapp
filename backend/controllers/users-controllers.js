const bcrypt = require('bcrypt');

const UserRepo = require('../repos/user-repo');
const HttpError = require('../models/http-error');

module.exports.postSignup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await UserRepo.findByEmail(email);
  } catch (err) {
    const error = new HttpError('Something went wrong, please try again.', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError('An account already exists for this email address.', 422);
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError('Something went wrong, please try again.', 500);
    return next(error);
  }

  let user;
  try {
    user = await UserRepo.insert(name, email, hashedPassword);
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  // add token stuff

  res.status(201).json({ message: 'User created!' });
};

module.exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await UserRepo.findByEmail(email);
  } catch (err) {
    return next(new HttpError('Something went wrong, please try again.', 500));
  }

  if (!user) {
    return next(new HttpError('Invalid credentials, failed to log in!', 401));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    const error = new HttpError('Something went wrong, please try again.', 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid credentials, failed to log in!', 401);
    return next(error);
  }

  // add token stuff

  res.status(200).json({
    userId: user.id,
    name: user.name,
  });
};
