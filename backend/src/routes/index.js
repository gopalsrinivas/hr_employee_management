const express = require("express");
const authRoutes = require("./authRoutes");
const healthRoutes = require("./healthRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const roleRoutes = require("./roleRoutes");
const userRoutes = require("./userRoutes");
const departmentRoutes = require("./departmentRoutes");
const designationRoutes = require("./designationRoutes");
const employeeRoutes = require("./employeeRoutes");
const attendanceRoutes = require("./attendanceRoutes");
const leaveRequestRoutes = require("./leaveRequestRoutes");
const payrollRoutes = require("./payrollRoutes");
const employeeDocumentRoutes = require("./employeeDocumentRoutes");
const onboardingRoutes = require("./onboardingRoutes");
const employeeExitRoutes = require("./employeeExitRoutes");
const reportRoutes = require("./reportRoutes");

const router = express.Router();

router.use("/v1/auth", authRoutes);
router.use("/v1/health", healthRoutes);
router.use("/v1/dashboard", dashboardRoutes);
router.use("/v1/roles", roleRoutes);
router.use("/v1/users", userRoutes);
router.use("/v1/departments", departmentRoutes);
router.use("/v1/designations", designationRoutes);
router.use("/v1/employees", employeeRoutes);
router.use("/v1/attendance", attendanceRoutes);
router.use("/v1/leave-requests", leaveRequestRoutes);
router.use("/v1/payroll", payrollRoutes);
router.use("/v1/employee-documents", employeeDocumentRoutes);
router.use("/v1/onboarding", onboardingRoutes);
router.use("/v1/employee-exits", employeeExitRoutes);
router.use("/v1/reports", reportRoutes);

module.exports = router;
