const express = require('express');

const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} = require('../../controllers/authControllers');

const router = express.Router();

// signup
router.post('/register', registerUser);

// signin
router.post('/login', loginUser);

router.get('/current', getCurrentUser);

router.post('/logout', logoutUser);

module.exports = { usersRouter: router };
