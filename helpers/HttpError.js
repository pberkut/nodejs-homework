const errorMessageList = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};

// const HttpError = (status, message = errorMessageList[status]) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };

class HttpError extends Error {
  constructor(statusCode, message = errorMessageList[statusCode]) {
    super();
    this.status = statusCode;
    this.message = message;
  }
}

module.exports = HttpError;
