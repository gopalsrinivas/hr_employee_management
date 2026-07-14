const createCrudController = require("./crudControllerFactory");
const payrollService = require("../services/payrollService");
const { successResponse } = require("../helpers/apiResponse");

const controller = createCrudController(payrollService, {
  list: "Payroll records fetched successfully",
  get: "Payroll record fetched successfully",
  create: "Payroll record created successfully",
  update: "Payroll record updated successfully",
  remove: "Payroll record deleted successfully"
});

const getByEmployeeId = async (req, res, next) => {
  try {
    const result = await payrollService.list({ ...req.query, employee_id: req.params.employeeId }, req.user);
    return successResponse(res, "Employee payroll fetched successfully", result.records, 200, {
      pagination: result.pagination
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  ...controller,
  getByEmployeeId
};
