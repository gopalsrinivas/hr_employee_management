const logger = require("../config/logger");
const { errorResponse } = require("../helpers/apiResponse");

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error" : error.message;

  logger.error("API error", {
    message: error.message,
    stack: error.stack,
    path: req.originalUrl,
    method: req.method
  });

  return errorResponse(res, message, statusCode);
};

module.exports = errorHandler;
