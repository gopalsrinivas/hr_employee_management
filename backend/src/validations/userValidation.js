const { body } = require("express-validator");

const createUser = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("email").trim().isEmail().withMessage("Valid email is required.").normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters."),
  body("role_id").isInt({ min: 1 }).withMessage("role_id is required.")
];

const updateUser = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty."),
  body("email").optional().trim().isEmail().withMessage("Valid email is required.").normalizeEmail(),
  body("password").optional().isLength({ min: 8 }).withMessage("Password must be at least 8 characters."),
  body("role_id").optional().isInt({ min: 1 }).withMessage("role_id must be valid.")
];

module.exports = { createUser, updateUser };
