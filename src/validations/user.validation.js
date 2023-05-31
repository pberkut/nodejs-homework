const Joi = require('joi');

const emailRegexp = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
const passwordRegexp = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
const subscriptionList = ['starter', 'pro', 'business'];

const register = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ 'any:required': 'Missing required email field' }),
  password: Joi.string().pattern(passwordRegexp).required().messages({
    'any.required': 'Missing required password field',
    'string.pattern.base':
      'Password should contain at least 6 characters one letter and one number',
  }),
  subscription: Joi.string().valid(...subscriptionList),
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
  login,
  updateSubscription,
};
