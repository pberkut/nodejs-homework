const express = require('express');

const { contactControllers } = require('../../controllers');

const {
  createContactValidationSchema,
  updateContactValidationSchema,
  updateFavoriteContactValidationSchema,
} = require('../../schemas/contact.schemas');

const { isValidId, authenticate, validateBody } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, contactControllers.getAllContacts);

router.get(
  '/:contactId',
  authenticate,
  isValidId,
  contactControllers.getContactById,
);

router.post(
  '/',
  authenticate,
  validateBody(createContactValidationSchema),
  contactControllers.createContact,
);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(updateContactValidationSchema),
  contactControllers.updateContact,
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(updateFavoriteContactValidationSchema),
  contactControllers.updateContact,
);

router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  contactControllers.deleteContact,
);

module.exports = { contactsRouter: router };
