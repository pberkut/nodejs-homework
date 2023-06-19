const { Contact } = require('../../models');

const createContact = async (userId, data) => {
  return Contact.create({ owner: userId, ...data });
};

module.exports = createContact;
