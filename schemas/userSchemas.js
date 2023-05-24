const Joi = require('joi');

const emailRegexp = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
const passwordRegexp = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
const subscriptionList = ['starter', 'pro', 'business'];

const registerUserSchema = Joi.object({
  email: Joi.string()
    .required()
    .pattern(emailRegexp)
    .messages({ 'any:required': 'Missing required email field' }),
  password: Joi.string().required().pattern(passwordRegexp).messages({
    'any.required': 'Missing required password field',
    'string.pattern.base': 'Need 6 characters and 1 number',
  }),
  subscription: Joi.string()
    .required()
    .valid(...subscriptionList),
});

const loginUserSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().min(6).required(),
});

const getCurrentUserSchema = Joi.object({
  email: Joi.string()
    .required()
    .pattern(emailRegexp)
    .messages({ 'any:required': 'Missing required email field' }),
});

const userSchemas = {
  registerUserSchema,
  loginUserSchema,
  getCurrentUserSchema,
};

module.exports = userSchemas;
