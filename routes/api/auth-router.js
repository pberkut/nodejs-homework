const express = require('express');

const { authControllers } = require('../../controllers');

const { authenticate, validateBody } = require('../../middlewares');
const {
  registerUserSchema,
  loginUserSchema,
} = require('../../schemas/user-schemas');

const router = express.Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  authControllers.registerUser,
);
router.post('/login', validateBody(loginUserSchema), authControllers.loginUser);
router.get('/current', authenticate, authControllers.getCurrentUser);
router.post('/logout', authenticate, authControllers.logoutUser);

module.exports = { usersRouter: router };
