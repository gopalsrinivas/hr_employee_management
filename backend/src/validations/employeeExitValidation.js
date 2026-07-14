const { body } = require("express-validator");

const createEmployeeExit = [
  body("employee_id").optional().isInt({ min: 1 }).withMessage("employee_id must be valid."),
  body("resignation_date").isISO8601().withMessage("resignation_date is required."),
  body("last_working_day").isISO8601().withMessage("last_working_day is required.")
];

const updateApproval = [
  body("manager_approval").optional().isBoolean(),
  body("hr_approval").optional().isBoolean()
];

const completeExit = [
  body("asset_returned").optional().isBoolean(),
  body("fnf_completed").optional().isBoolean()
];

module.exports = { createEmployeeExit, updateApproval, completeExit };
