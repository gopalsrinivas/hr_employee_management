const express = require("express");
const controller = require("../controllers/employeeExitController");
const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeRoles");
const validate = require("../middlewares/validateRequest");
const ROLES = require("../constants/roles");
const { idParam, paginationQuery } = require("../validations/commonValidation");
const { createEmployeeExit, updateApproval, completeExit } = require("../validations/employeeExitValidation");

const router = express.Router();

router.use(auth);
router.post("/", createEmployeeExit, validate, controller.create);
router.get("/", paginationQuery, validate, controller.list);
router.get("/:id", idParam(), validate, controller.getById);
router.patch(
  "/:id/manager-approval",
  authorize(ROLES.ADMIN, ROLES.HR),
  idParam(),
  updateApproval,
  validate,
  controller.managerApproval
);
router.patch(
  "/:id/hr-approval",
  authorize(ROLES.ADMIN, ROLES.HR),
  idParam(),
  updateApproval,
  validate,
  controller.hrApproval
);
router.patch("/:id/complete", authorize(ROLES.ADMIN, ROLES.HR), idParam(), completeExit, validate, controller.complete);

module.exports = router;
