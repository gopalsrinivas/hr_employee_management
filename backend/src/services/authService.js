const { User, Role, Employee } = require("../models");
const { comparePassword, hashPassword } = require("../utils/password");
const generateToken = require("../utils/generateToken");
const logger = require("../config/logger");
const { AuthenticationError, NotFoundError, ValidationError } = require("../utils/appError");

const sanitizeUser = (user) => ({
  id: user.id,
  employeeId: user.employeeProfile ? user.employeeProfile.id : null,
  name: user.name,
  email: user.email,
  role: user.Role
    ? {
        id: user.Role.id,
        name: user.Role.name
      }
    : null
});

const login = async ({ email, password }) => {
  const user = await User.scope("withPassword").findOne({
    where: { email, is_active: true },
    include: [
      { model: Role, attributes: ["id", "name"] },
      { model: Employee, as: "employeeProfile", attributes: ["id", "employee_code"] }
    ]
  });

  if (!user) {
    logger.warn("Authentication failure", { email });
    throw new AuthenticationError("Invalid email or password");
  }

  const passwordMatches = await comparePassword(password, user.password);

  if (!passwordMatches) {
    logger.warn("Authentication failure", { email });
    throw new AuthenticationError("Invalid email or password");
  }

  logger.info("User login", { userId: user.id, email: user.email });

  const token = generateToken(user);

  return {
    user: sanitizeUser(user),
    token,
    accessToken: token
  };
};

const logout = async (user) => {
  logger.info("User logout", { userId: user.id, email: user.email });
  return true;
};

const getProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
      { model: Role, attributes: ["id", "name"] },
      { model: Employee, as: "employeeProfile" }
    ]
  });

  if (!user) {
    throw new NotFoundError("User profile not found");
  }

  return sanitizeUser(user);
};

const changePassword = async (user, { oldPassword, newPassword }) => {
  const dbUser = await User.scope("withPassword").findByPk(user.id);

  if (!dbUser) {
    throw new NotFoundError("User not found");
  }

  const passwordMatches = await comparePassword(oldPassword, dbUser.password);

  if (!passwordMatches) {
    throw new ValidationError("Old password is incorrect");
  }

  await dbUser.update({
    password: await hashPassword(newPassword),
    updated_by: user.id
  });

  logger.info("User password changed", { userId: user.id });
  return true;
};

module.exports = {
  login,
  logout,
  getProfile,
  changePassword
};
