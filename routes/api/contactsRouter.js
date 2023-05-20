const express = require('express');

const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  updateFavoriteContact,
} = require('../../controllers/contactsControllers');

const { validateBody } = require('../../decorators');

const { createContactSchema, updateContactSchema, updateFavoriteSchema } =
  require('../../models/contactModel').schemas;

const { isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId', isValidId, getContact);

router.post('/', validateBody(createContactSchema), createContact);

router.put(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  updateContact,
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(updateFavoriteSchema),
  updateFavoriteContact,
);

router.delete('/:contactId', isValidId, deleteContact);

module.exports = { contactsRouter: router };
