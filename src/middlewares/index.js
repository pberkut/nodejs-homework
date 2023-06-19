const isValidId = require('./isValidId');
const validateBody = require('./validateBody');
const authenticate = require('./authenticate');
const Upload = require('./Upload');
const processImage = require('./processImage');
const notFound = require('./notFound');
const globalErrorHandler = require('./globalErrorHandler');

module.exports = {
  isValidId,
  authenticate,
  validateBody,
  Upload,
  processImage,
  globalErrorHandler,
  notFound,
};
