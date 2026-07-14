const { validationResult } = require("express-validator");
const { errorResponse } = require("../helpers/apiResponse");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return errorResponse(res, "Validation failed", 400, errors.array());
};

module.exports = validateRequest;
