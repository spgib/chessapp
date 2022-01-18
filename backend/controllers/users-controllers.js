const UserRepo = require('../repos/user-repo');

module.exports.postSignup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await UserRepo.insert(name, email, password);

  res.send(user);
};

module.exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await UserRepo.findByEmail(email);
  } catch (err) {
    return next(new Error('Login failed!'));
  }

  if (!user) {
    return next(new Error('Invalid credentials, failed to log in!'));
  }
  
  const isValidPassword = password === user.password;

  if (!isValidPassword) {
    return next(new Error('Invalid credentials, failed to log in!'));
  }

  res.status(200).json({
    userId: user.id,
    email: user.email
  });
};