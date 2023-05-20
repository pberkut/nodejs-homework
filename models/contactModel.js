const Joi = require('joi');

const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../decorators');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 170,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post('save', handleMongooseError);

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

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model('contact', contactSchema);

const schemas = {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
};

module.exports = { Contact, schemas };
