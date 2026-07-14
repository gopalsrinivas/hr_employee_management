const { body } = require("express-validator");

const createDesignation = [
  body("department_id").isInt({ min: 1 }).withMessage("department_id is required."),
  body("designation_name").trim().notEmpty().withMessage("Designation name is required.")
];

const updateDesignation = [
  body("department_id").optional().isInt({ min: 1 }).withMessage("department_id must be valid."),
  body("designation_name").optional().trim().notEmpty().withMessage("Designation name cannot be empty.")
];

module.exports = { createDesignation, updateDesignation };
