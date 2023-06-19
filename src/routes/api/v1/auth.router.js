const express = require('express');

const { authController } = require('../../../controllers');

const { authenticate, validateBody, Upload, processImage } = require('../../../middlewares');

const authValidation = require('../../../validations/auth.validation');

const router = express.Router();

router.post('/register', validateBody(authValidation.register), authController.registerUser);
router.get('/verify/:verificationToken', authController.verifyEmail);
router.post('/verify', validateBody(authValidation.email), authController.resendVerifyEmail);
router.post('/login', validateBody(authValidation.login), authController.loginUser);
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
  validateBody(authValidation.updateSubscription),
  authController.updateSubscriptionUser,
);
router.post('/logout', authenticate, authController.logoutUser);

module.exports = { authRouter: router };
