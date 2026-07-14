const successResponse = (res, message, data = null, statusCode = 200, extra = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    statusCode,
    ...extra
  });
};

const errorResponse = (res, message, statusCode = 500, errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    statusCode
  });
};

module.exports = {
  successResponse,
  errorResponse
};
