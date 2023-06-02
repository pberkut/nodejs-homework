const Joi = require('joi');

const { EMAIL_REGEXP } = require('../constants/regexp');

const createContact = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'any.required': 'Missing required name field' }),

  email: Joi.string()
    .pattern(EMAIL_REGEXP)
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

const updateContact = Joi.object()
  .keys({
    name: createContact.extract('name').optional(),
    email: createContact.extract('email').optional(),
    phone: createContact.extract('phone').optional(),
    favorite: createContact.extract('favorite').optional(),
  })
  .or('name', 'email', 'phone', 'favorite');

const updateFavoriteContact = Joi.object().keys({
  favorite: createContact
    .extract('favorite')
    .required()
    .messages({ 'any.required': 'Missing field favorite' }),
});

module.exports = {
  createContact,
  updateContact,
  updateFavoriteContact,
};
