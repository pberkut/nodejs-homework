const Joi = require('joi');

const emailRegexp = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;

const createContactValidationSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'any.required': 'Missing required name field' }),

  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ 'any.required': 'Missing required email field' }),

  phone: Joi.string()
    .required()
    .messages({ 'any.required': 'Missing required phone field' }),
  favorite: Joi.boolean(),
})
  .required()
  .min(1)
  .messages({ 'object.min': 'Missing fields' });

const updateContactValidationSchema = Joi.object()
  .keys({
    name: createContactValidationSchema.extract('name').optional(),
    email: createContactValidationSchema.extract('email').optional(),
    phone: createContactValidationSchema.extract('phone').optional(),
    favorite: createContactValidationSchema.extract('favorite').optional(),
  })
  .or('name', 'email', 'phone', 'favorite');

const updateFavoriteContactValidationSchema = Joi.object().keys({
  favorite: createContactValidationSchema
    .extract('favorite')
    .required()
    .messages({ 'any.required': 'Missing field favorite' }),
});

const contactSchemas = {
  createContactValidationSchema,
  updateContactValidationSchema,
  updateFavoriteContactValidationSchema,
};

module.exports = contactSchemas;
