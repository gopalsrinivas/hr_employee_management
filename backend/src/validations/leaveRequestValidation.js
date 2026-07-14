const { body } = require("express-validator");

const createLeaveRequest = [
  body("leave_type").trim().notEmpty().withMessage("leave_type is required."),
  body("from_date").isISO8601().withMessage("from_date is required."),
  body("to_date").isISO8601().withMessage("to_date is required."),
  body("reason").optional().trim()
];

const remarks = [body("remarks").optional().trim()];

module.exports = { createLeaveRequest, remarks };
