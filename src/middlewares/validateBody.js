const { HttpError } = require('../utils');

const validateBody = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new HttpError(400, error.message));
      return;
    }
    next();
  };
};

module.exports = validateBody;
