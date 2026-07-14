const reportService = require("../services/reportService");
const { successResponse } = require("../helpers/apiResponse");

const paginated = (message, serviceMethod) => async (req, res, next) => {
  try {
    const result = await serviceMethod(req.query, req.user);
    return successResponse(res, message, result.records, 200, { pagination: result.pagination });
  } catch (error) {
    return next(error);
  }
};

const summary = async (req, res, next) => {
  try {
    return successResponse(res, "Summary report fetched successfully", await reportService.summaryReport());
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  summary,
  employees: paginated("Employee report fetched successfully", reportService.employeeReport),
  attendance: paginated("Attendance report fetched successfully", reportService.attendanceReport),
  leaves: paginated("Leave report fetched successfully", reportService.leaveReport),
  payroll: paginated("Payroll report fetched successfully", reportService.payrollReport)
};
