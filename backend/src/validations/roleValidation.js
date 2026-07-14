const { body } = require("express-validator");

const createRole = [
  body("name").trim().notEmpty().withMessage("Role name is required.").isLength({ max: 50 })
];

const updateRole = [
  body("name").optional().trim().notEmpty().withMessage("Role name cannot be empty.").isLength({ max: 50 })
];

module.exports = { createRole, updateRole };
