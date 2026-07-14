const attendanceService = require("../services/attendanceService");
const { successResponse } = require("../helpers/apiResponse");

const list = async (req, res, next) => {
  try {
    const result = await attendanceService.list(req.query, req.user);
    return successResponse(res, "Attendance records fetched successfully", result.records, 200, {
      pagination: result.pagination
    });
  } catch (error) {
    return next(error);
  }
};

const getByEmployeeId = async (req, res, next) => {
  try {
    const result = await attendanceService.getByEmployeeId(req.params.employeeId, req.query, req.user);
    return successResponse(res, "Employee attendance fetched successfully", result.records, 200, {
      pagination: result.pagination
    });
  } catch (error) {
    return next(error);
  }
};

const checkIn = async (req, res, next) => {
  try {
    const result = await attendanceService.checkIn(req.body, req.user);
    return successResponse(res, "Check-in successful", result, 201);
  } catch (error) {
    return next(error);
  }
};

const checkOut = async (req, res, next) => {
  try {
    const result = await attendanceService.checkOut(req.body, req.user);
    return successResponse(res, "Check-out successful", result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  list,
  getByEmployeeId,
  checkIn,
  checkOut
};
