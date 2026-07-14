const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.Role ? user.Role.name : undefined
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
};

module.exports = generateToken;
