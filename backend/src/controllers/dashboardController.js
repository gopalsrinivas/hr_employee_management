const dashboardService = require("../services/dashboardService");
const { successResponse } = require("../helpers/apiResponse");

const summary = async (req, res, next) => {
  try {
    return successResponse(res, "Dashboard summary fetched successfully", await dashboardService.summary());
  } catch (error) {
    return next(error);
  }
};

const departmentSummary = async (req, res, next) => {
  try {
    return successResponse(
      res,
      "Department summary fetched successfully",
      await dashboardService.departmentSummary()
    );
  } catch (error) {
    return next(error);
  }
};

const attendanceSummary = async (req, res, next) => {
  try {
    return successResponse(
      res,
      "Attendance summary fetched successfully",
      await dashboardService.attendanceSummary(req.query.date)
    );
  } catch (error) {
    return next(error);
  }
};

const leaveSummary = async (req, res, next) => {
  try {
    return successResponse(res, "Leave summary fetched successfully", await dashboardService.leaveSummary());
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  summary,
  departmentSummary,
  attendanceSummary,
  leaveSummary
};
