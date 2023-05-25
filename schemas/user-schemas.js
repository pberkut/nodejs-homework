const Joi = require('joi');

const emailRegexp = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;
const passwordRegexp = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
const subscriptionList = ['starter', 'pro', 'business'];

const registerUserValidationSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ 'any:required': 'Missing required email field' }),
  password: Joi.string().pattern(passwordRegexp).required().messages({
    'any.required': 'Missing required password field',
    'string.pattern.base': 'Need minimal 6 characters and included 1 number',
  }),
  subscription: Joi.string().valid(...subscriptionList),
});

const loginUserValidationSchema = Joi.object({
  password: Joi.string().required(),
}).keys({
  email: registerUserValidationSchema.extract('email'),
});

const userSchemas = {
  registerUserValidationSchema,
  loginUserValidationSchema,
};

module.exports = userSchemas;
