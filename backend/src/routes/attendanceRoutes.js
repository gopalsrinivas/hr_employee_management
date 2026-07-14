const express = require("express");
const controller = require("../controllers/attendanceController");
const auth = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateRequest");
const { paginationQuery, idParam } = require("../validations/commonValidation");
const { checkIn, checkOut } = require("../validations/attendanceValidation");

const router = express.Router();

router.use(auth);
router.post("/check-in", checkIn, validate, controller.checkIn);
router.post("/check-out", checkOut, validate, controller.checkOut);
router.get("/", paginationQuery, validate, controller.list);
router.get("/:employeeId", idParam("employeeId"), validate, controller.getByEmployeeId);

module.exports = router;
