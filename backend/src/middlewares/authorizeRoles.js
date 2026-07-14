const { errorResponse } = require("../helpers/apiResponse");

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const roleName = req.user && req.user.Role ? req.user.Role.name : null;

    if (!roleName || !allowedRoles.includes(roleName)) {
      return errorResponse(res, "You do not have permission to access this resource", 403);
    }

    return next();
  };
};

module.exports = authorizeRoles;
