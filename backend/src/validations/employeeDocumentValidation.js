const { body } = require("express-validator");

const uploadDocument = [
  body("employee_id").optional().isInt({ min: 1 }).withMessage("employee_id must be valid."),
  body("document_type").trim().notEmpty().withMessage("document_type is required."),
  body("document_number").optional().trim()
];

module.exports = { uploadDocument };
