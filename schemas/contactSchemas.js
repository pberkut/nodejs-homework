const Joi = require('joi');

const createContactSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'any.required': 'Missing required name field' }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({ 'any.required': 'Missing required email field' }),

  phone: Joi.string()
    .required()
    .messages({ 'any.required': 'Missing required phone field' }),
})
  .required()
  .min(1)
  .messages({ 'object.min': 'Missing fields' });

const updateContactSchema = Joi.object()
  .required()
  .min(1)
  .messages({ 'object.min': 'Missing fields' });

const updateFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ 'any.required': 'missing field favorite' }),
});

const schemas = {
  createContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
};

module.exports = schemas;
