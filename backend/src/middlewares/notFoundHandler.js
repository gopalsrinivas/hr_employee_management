const { NotFoundError } = require("../utils/appError");

const notFoundHandler = (req, res, next) => {
  return next(new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`));
};

module.exports = notFoundHandler;
