const Joi = require('joi');

const { SUBSCRIPTION_LIST } = require('../constants/constants');
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../constants/regexp');

const register = Joi.object({
  email: Joi.string()
    .pattern(EMAIL_REGEXP)
    .required()
    .messages({ 'any.required': 'Missing required email field' }),
  password: Joi.string().pattern(PASSWORD_REGEXP).required().messages({
    'any.required': 'Missing required password field',
    'string.pattern.base':
      'Password should contain at least 6 characters one letter and one number',
  }),
  subscription: Joi.string().valid(...SUBSCRIPTION_LIST),
});

const email = Joi.object().keys({
  email: register.extract('email'),
});

const login = Joi.object({
  password: Joi.string().required(),
}).keys({
  email: register.extract('email'),
});

const updateSubscription = Joi.object().keys({
  subscription: register.extract('subscription').required(),
});

module.exports = {
  register,
  email,
  login,
  updateSubscription,
};
