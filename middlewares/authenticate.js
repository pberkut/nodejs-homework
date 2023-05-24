const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { getUserByIdService } = require('../services/usersServices');
const { JWT_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await getUserByIdService(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, 'Not authorized'));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

module.exports = authenticate;
