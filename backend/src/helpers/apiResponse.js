const successResponse = (res, message, data = null, statusCode = 200, extra = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    statusCode,
    requestId: res.req ? res.req.requestId : undefined,
    ...extra
  });
};

const errorResponse = (res, message, statusCode = 500, errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
    statusCode,
    requestId: res.req ? res.req.requestId : undefined
  });
};

module.exports = {
  successResponse,
  errorResponse
};
