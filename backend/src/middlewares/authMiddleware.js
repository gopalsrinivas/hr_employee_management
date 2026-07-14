const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { User, Role, Employee } = require("../models");
const { AuthenticationError } = require("../utils/appError");

const authMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return next(new AuthenticationError("Authentication token is required"));
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findOne({
      where: { id: decoded.userId || decoded.id, is_active: true },
      include: [
        { model: Role, attributes: ["id", "name"] },
        { model: Employee, as: "employeeProfile", attributes: ["id", "employee_code"] }
      ]
    });

    if (!user) {
      return next(new AuthenticationError("Authenticated user was not found"));
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(new AuthenticationError("Invalid or expired authentication token", [
      { message: error.message }
    ]));
  }
};

module.exports = authMiddleware;
