const express = require("express");
const controller = require("../controllers/reportController");
const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeRoles");
const ROLES = require("../constants/roles");

const router = express.Router();

router.use(auth, authorize(ROLES.ADMIN, ROLES.HR));
router.get("/summary", controller.summary);
router.get("/employees", controller.employees);
router.get("/attendance", controller.attendance);
router.get("/leaves", controller.leaves);
router.get("/payroll", controller.payroll);

module.exports = router;
