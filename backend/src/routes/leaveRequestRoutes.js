const express = require("express");
const controller = require("../controllers/leaveRequestController");
const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeRoles");
const validate = require("../middlewares/validateRequest");
const ROLES = require("../constants/roles");
const { idParam, paginationQuery } = require("../validations/commonValidation");
const { createLeaveRequest, remarks } = require("../validations/leaveRequestValidation");

const router = express.Router();

router.use(auth);
router.post("/", createLeaveRequest, validate, controller.create);
router.get("/", paginationQuery, validate, controller.list);
router.get("/:id", idParam(), validate, controller.getById);
router.patch("/:id/approve", authorize(ROLES.ADMIN, ROLES.HR), idParam(), remarks, validate, controller.approve);
router.patch("/:id/reject", authorize(ROLES.ADMIN, ROLES.HR), idParam(), remarks, validate, controller.reject);

module.exports = router;
