const globalErrorHandler = require('./globalErrorHandler');
const isValidId = require('./isValidId');
const validateBody = require('./validateBody');
const authenticate = require('./authenticate');
const upload = require('./upload');
const processImage = require('./processImage');

module.exports = {
  globalErrorHandler,
  isValidId,
  authenticate,
  validateBody,
  upload,
  processImage,
};
