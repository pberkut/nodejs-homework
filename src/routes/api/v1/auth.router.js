const express = require('express');

const { authController } = require('../../../controllers');

const {
  authenticate,
  validateBody,
  Upload,
  processImage,
} = require('../../../middlewares');

const userValidation = require('../../../validations/user.validation');

const router = express.Router();

router.post(
  '/register',
  validateBody(userValidation.register),
  authController.registerUser,
);

router.post(
  '/login',
  validateBody(userValidation.login),
  authController.loginUser,
);

router.get('/current', authenticate, authController.getCurrentUser);

router.patch(
  '/avatars',
  authenticate,
  Upload.single('avatar'),
  processImage,
  authController.uploadAvatarUser,
);

router.patch(
  '/subscription',
  authenticate,
  validateBody(userValidation.updateSubscription),
  authController.updateSubscriptionUser,
);

router.post('/logout', authenticate, authController.logoutUser);

module.exports = { usersRouter: router };
