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

const {
  createContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
} = require('../../schemas').contactSchemas;

const { isValidId, authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, getContacts);

router.get('/:contactId', authenticate, isValidId, getContact);

router.post(
  '/',
  authenticate,
  validateBody(createContactSchema),
  createContact,
);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  updateContact,
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(updateFavoriteContactSchema),
  updateFavoriteContact,
);

router.delete('/:contactId', authenticate, isValidId, deleteContact);

module.exports = { contactsRouter: router };
