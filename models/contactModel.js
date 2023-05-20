const { Schema, model } = require('mongoose');

const Contact = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 170,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const Contacts = model('contact', Contact);

module.exports = Contacts;
