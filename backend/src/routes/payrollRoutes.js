const express = require("express");
const controller = require("../controllers/payrollController");
const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeRoles");
const validate = require("../middlewares/validateRequest");
const ROLES = require("../constants/roles");
const { idParam, paginationQuery } = require("../validations/commonValidation");
const { createPayroll, updatePayroll } = require("../validations/payrollValidation");

const router = express.Router();

router.use(auth);
router.post("/", authorize(ROLES.ADMIN, ROLES.HR), createPayroll, validate, controller.create);
router.get("/", paginationQuery, validate, controller.list);
router.get("/employee/:employeeId", idParam("employeeId"), validate, controller.getByEmployeeId);
router.get("/:id", idParam(), validate, controller.getById);
router.put("/:id", authorize(ROLES.ADMIN, ROLES.HR), idParam(), updatePayroll, validate, controller.update);

module.exports = router;
