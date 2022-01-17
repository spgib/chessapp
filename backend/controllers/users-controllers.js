const UserRepo = require('../repos/user-repo');

module.exports.postSignup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await UserRepo.insert(name, email, password);

  res.send(user);
};

module.exports.postLogin = (req, res, next) => {};