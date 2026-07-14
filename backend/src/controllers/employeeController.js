const createCrudController = require("./crudControllerFactory");
const employeeService = require("../services/employeeService");
const { successResponse } = require("../helpers/apiResponse");

const controller = createCrudController(employeeService, {
  list: "Employees fetched successfully",
  get: "Employee fetched successfully",
  create: "Employee created successfully",
  update: "Employee updated successfully",
  remove: "Employee deleted successfully"
});

const nextCode = async (req, res, next) => {
  try {
    const employeeCode = await employeeService.getNextEmployeeCode();
    return successResponse(res, "Next employee code generated successfully", {
      employee_code: employeeCode
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  ...controller,
  nextCode
};
