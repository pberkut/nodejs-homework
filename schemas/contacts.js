const { Schema, model } = require('mongoose');

const contact = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 170,
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

const Contacts = model('contact', contact);

module.exports = Contacts;
