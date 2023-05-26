const jwt = require('jsonwebtoken');
const { HttpError } = require('../utils');
const { getUserByIdService } = require('../services/users.services');
const { JWT_SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(new HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET_KEY);
    const user = await getUserByIdService(id);
    if (!user || !user.token || user.token !== token) {
      next(new HttpError(401, 'Not authorized'));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new HttpError(401, error.message));
  }
};

module.exports = authenticate;
