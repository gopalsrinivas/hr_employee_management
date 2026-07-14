const { AuthorizationError } = require("../utils/appError");

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const roleName = req.user && req.user.Role ? req.user.Role.name : null;

    if (!roleName || !allowedRoles.includes(roleName)) {
      return next(new AuthorizationError("You do not have permission to access this resource"));
    }

    return next();
  };
};

module.exports = authorizeRoles;
