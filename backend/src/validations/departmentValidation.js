const { body } = require("express-validator");

const createDepartment = [
  body("department_name").trim().notEmpty().withMessage("Department name is required.")
];

const updateDepartment = [
  body("department_name").optional().trim().notEmpty().withMessage("Department name cannot be empty."),
  body("status").optional().isBoolean().withMessage("status must be boolean.")
];

module.exports = { createDepartment, updateDepartment };
