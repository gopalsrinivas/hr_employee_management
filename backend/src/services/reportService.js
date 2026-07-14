const dashboardService = require("./dashboardService");
const employeeService = require("./employeeService");
const attendanceService = require("./attendanceService");
const leaveRequestService = require("./leaveRequestService");
const payrollService = require("./payrollService");

const employeeReport = (query, user) => employeeService.list(query, user);
const attendanceReport = (query, user) => attendanceService.list(query, user);
const leaveReport = (query, user) => leaveRequestService.list(query, user);
const payrollReport = (query, user) => payrollService.list(query, user);
const summaryReport = () => dashboardService.summary();

module.exports = {
  employeeReport,
  attendanceReport,
  leaveReport,
  payrollReport,
  summaryReport
};
