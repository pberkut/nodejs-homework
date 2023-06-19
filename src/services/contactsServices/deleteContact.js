const { Contact } = require('../../models');
const { HttpError } = require('../../utils');

const deleteContact = async (userId, contactId) => {
  const contact = await Contact.findOneAndRemove({ _id: contactId, owner: userId });
  if (!contact) {
    throw new HttpError(404, `Contact with id: ${contactId} not found`);
  }
  return contactId;
};

module.exports = deleteContact;
