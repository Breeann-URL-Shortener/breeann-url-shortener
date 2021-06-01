const UserService = require('../services/UserService');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.session;
    console.log(token, 'token');
    req.user = UserService.verifyAuthToken(token);
    next();
  } catch(err) {
    err.status = 401;
    next(err);
  }
};
