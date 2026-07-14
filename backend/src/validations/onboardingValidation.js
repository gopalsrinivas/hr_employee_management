const { body } = require("express-validator");

const createOnboarding = [
  body("employee_id").isInt({ min: 1 }).withMessage("employee_id is required."),
  body("joining_date").isISO8601().withMessage("joining_date is required.")
];

const updateOnboarding = [
  body("documents_verified").optional().isBoolean(),
  body("induction_completed").optional().isBoolean(),
  body("laptop_allocated").optional().isBoolean(),
  body("email_created").optional().isBoolean(),
  body("id_card_generated").optional().isBoolean(),
  body("welcome_kit_issued").optional().isBoolean()
];

module.exports = { createOnboarding, updateOnboarding };
