const { User, Role } = require("../models");
const { comparePassword } = require("../utils/password");
const generateToken = require("../utils/generateToken");
const logger = require("../config/logger");

const sanitizeUser = (user) => ({
  id: user.id,
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
    include: [{ model: Role, attributes: ["id", "name"] }]
  });

  if (!user) {
    logger.warn("Authentication failure", { email });
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const passwordMatches = await comparePassword(password, user.password);

  if (!passwordMatches) {
    logger.warn("Authentication failure", { email });
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  logger.info("User login", { userId: user.id, email: user.email });

  return {
    user: sanitizeUser(user),
    token: generateToken(user)
  };
};

const logout = async (user) => {
  logger.info("User logout", { userId: user.id, email: user.email });
  return true;
};

module.exports = {
  login,
  logout
};
