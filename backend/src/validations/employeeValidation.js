const { body } = require("express-validator");

const createEmployee = [
  body("employee_code").trim().notEmpty().withMessage("Employee code is required."),
  body("first_name").trim().notEmpty().withMessage("First name is required."),
  body("last_name").trim().notEmpty().withMessage("Last name is required."),
  body("gender").trim().notEmpty().withMessage("Gender is required."),
  body("email").trim().isEmail().withMessage("Valid email is required.").normalizeEmail(),
  body("joining_date").isISO8601().withMessage("Valid joining_date is required."),
  body("department_id").isInt({ min: 1 }).withMessage("department_id is required."),
  body("designation_id").isInt({ min: 1 }).withMessage("designation_id is required."),
  body("salary").optional().isFloat({ min: 0 }).withMessage("salary cannot be negative.")
];

const updateEmployee = [
  body("email").optional().trim().isEmail().withMessage("Valid email is required.").normalizeEmail(),
  body("joining_date").optional().isISO8601().withMessage("joining_date must be valid."),
  body("department_id").optional().isInt({ min: 1 }).withMessage("department_id must be valid."),
  body("designation_id").optional().isInt({ min: 1 }).withMessage("designation_id must be valid."),
  body("salary").optional().isFloat({ min: 0 }).withMessage("salary cannot be negative.")
];

module.exports = { createEmployee, updateEmployee };
