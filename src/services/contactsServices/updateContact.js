const { Contact } = require('../../models');
const { HttpError } = require('../../utils');

const updateContact = async (contactId, body) => {
  const updateContact = await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  if (!updateContact) {
    throw new HttpError(404, `Contact with id: ${contactId} not found`);
  }
  return updateContact;
};

module.exports = updateContact;
