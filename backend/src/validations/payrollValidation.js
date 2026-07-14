const { body } = require("express-validator");

const amount = (field) => body(field).optional().isFloat({ min: 0 }).withMessage(`${field} cannot be negative.`);

const createPayroll = [
  body("employee_id").isInt({ min: 1 }).withMessage("employee_id is required."),
  body("payroll_month").trim().notEmpty().withMessage("payroll_month is required."),
  body("payroll_year").isInt({ min: 1900 }).withMessage("payroll_year is required."),
  body("basic_salary").isFloat({ min: 0 }).withMessage("basic_salary cannot be negative."),
  ...["hra", "da", "bonus", "incentives", "pf", "esi", "tax", "deductions"].map(amount)
];

const updatePayroll = [
  body("payroll_year").optional().isInt({ min: 1900 }).withMessage("payroll_year must be valid."),
  ...["basic_salary", "hra", "da", "bonus", "incentives", "pf", "esi", "tax", "deductions"].map(amount)
];

module.exports = { createPayroll, updatePayroll };
