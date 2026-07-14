const { errorResponse } = require("../helpers/apiResponse");

const notFoundHandler = (req, res) => {
  return errorResponse(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
};

module.exports = notFoundHandler;
