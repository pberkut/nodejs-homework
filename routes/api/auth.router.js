const express = require('express');

const { authControllers } = require('../../controllers');

const { authenticate, validateBody } = require('../../middlewares');
const {
  registerUserValidationSchema,
  loginUserValidationSchema,
  updateSubscriptionUserValidationSchema,
} = require('../../schemas/user.schemas');

const router = express.Router();

router.post(
  '/register',
  validateBody(registerUserValidationSchema),
  authControllers.registerUser,
);

router.post(
  '/login',
  validateBody(loginUserValidationSchema),
  authControllers.loginUser,
);

router.get('/current', authenticate, authControllers.getCurrentUser);

router.post('/logout', authenticate, authControllers.logoutUser);

router.patch(
  '/subscription',
  authenticate,
  validateBody(updateSubscriptionUserValidationSchema),
  authControllers.updateUser,
);

module.exports = { usersRouter: router };
