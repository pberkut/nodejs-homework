const { Contact } = require('../../models');

const createContact = async body => {
  return Contact.create(body);
};

module.exports = createContact;
