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

const Contact = model('contact', contactSchema);

module.exports = { Contact };
