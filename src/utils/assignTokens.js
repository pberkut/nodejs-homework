const jwt = require('jsonwebtoken');

const {
  JWT_ACCESS_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_SECRET_KEY,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

const assignTokens = user => {
  const payload = { userId: user._id };

  const accessToken = jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN,
  });

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = assignTokens;
