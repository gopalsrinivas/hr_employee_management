const logger = require("../config/logger");
const { errorResponse } = require("../helpers/apiResponse");

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = error.statusCode || 500;
  let errors = error.errors || [];

  if (error.name === "SequelizeUniqueConstraintError") {
    statusCode = 409;
    errors = error.errors;
  }

  if (error.name === "SequelizeForeignKeyConstraintError") {
    statusCode = 400;
  }

  if (error.name === "MulterError") {
    statusCode = 422;
  }

  const message = statusCode === 500 ? "Internal server error" : error.message;

  logger.error("API error", {
    requestId: req.requestId,
    message: error.message,
    stack: error.stack,
    path: req.originalUrl,
    method: req.method,
    userId: req.user ? req.user.id : null
  });

  return errorResponse(res, message, statusCode, errors);
};

module.exports = errorHandler;
