const globalErrorHandler = (err, req, res, next) => {
  const {
    status = 500,
    message = 'Server error. Something went wrong please try again later',
  } = err;
  res.status(status).json({
    message,
  });
};

module.exports = globalErrorHandler;
