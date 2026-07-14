const express = require("express");
const controller = require("../controllers/onboardingController");
const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeRoles");
const validate = require("../middlewares/validateRequest");
const ROLES = require("../constants/roles");
const { idParam, paginationQuery } = require("../validations/commonValidation");
const { createOnboarding, updateOnboarding } = require("../validations/onboardingValidation");

const router = express.Router();

router.use(auth, authorize(ROLES.ADMIN, ROLES.HR));
router.post("/", createOnboarding, validate, controller.create);
router.get("/", paginationQuery, validate, controller.list);
router.get("/:id", idParam(), validate, controller.getById);
router.patch("/:id", idParam(), updateOnboarding, validate, controller.update);
router.patch("/:id/complete", idParam(), validate, controller.complete);

module.exports = router;
