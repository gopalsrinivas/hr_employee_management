const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { User, Role } = require("../models");
const { errorResponse } = require("../helpers/apiResponse");

const authMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return errorResponse(res, "Authentication token is required", 401);
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findOne({
      where: { id: decoded.id, is_active: true },
      include: [{ model: Role, attributes: ["id", "name"] }]
    });

    if (!user) {
      return errorResponse(res, "Authenticated user was not found", 401);
    }

    req.user = user;
    return next();
  } catch (error) {
    return errorResponse(res, "Invalid or expired authentication token", 401, [
      { message: error.message }
    ]);
  }
};

module.exports = authMiddleware;
