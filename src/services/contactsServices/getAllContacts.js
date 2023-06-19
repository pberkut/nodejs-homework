const { Contact } = require('../../models');
const { HttpError } = require('../../utils');

const getAllContacts = async (owner, query) => {
  const { page = 1, limit = 10, favorite } = query;
  const skip = (page - 1) * limit;
  const filter = {
    owner,
  };
  if (favorite === 'true') {
    filter.favorite = true;
  } else if (favorite === 'false') {
    filter.favorite = false;
  }
  const contacts = await Contact.find(filter, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'email subscription');

  if (!contacts) {
    throw new HttpError(404, 'Contacts not found');
  }
  return contacts;
};

module.exports = getAllContacts;
