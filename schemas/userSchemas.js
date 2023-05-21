const Joi = require('joi');

const subscriptionList = ['starter', 'pro', 'business'];
const passwordRegexp = '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$';

const createUserSchema = Joi.object({
  password: Joi.string().required().pattern(passwordRegexp).messages({
    'any.required': 'Missing required password field',
    'string.pattern.base': 'Need 8 symbols with 1 number',
  }),

  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
    })
    .messages({ 'any:required': 'Missing required email field' }),

  subscription: Joi.string()
    .required()
    .valid(...subscriptionList),
});

const userSchemas = { createUserSchema };

module.exports = userSchemas;
