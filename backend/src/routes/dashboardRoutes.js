const express = require("express");
const controller = require("../controllers/dashboardController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(auth);
router.get("/summary", controller.summary);
router.get("/department-summary", controller.departmentSummary);
router.get("/attendance-summary", controller.attendanceSummary);
router.get("/leave-summary", controller.leaveSummary);

module.exports = router;
