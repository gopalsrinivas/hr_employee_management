const { body } = require("express-validator");

const checkIn = [
  body("check_in").notEmpty().withMessage("check_in is required."),
  body("attendance_date").optional().isISO8601().withMessage("attendance_date must be valid."),
  body("employee_id").optional().isInt({ min: 1 }).withMessage("employee_id must be valid.")
];

const checkOut = [
  body("check_out").notEmpty().withMessage("check_out is required."),
  body("attendance_date").optional().isISO8601().withMessage("attendance_date must be valid."),
  body("employee_id").optional().isInt({ min: 1 }).withMessage("employee_id must be valid.")
];

module.exports = { checkIn, checkOut };
