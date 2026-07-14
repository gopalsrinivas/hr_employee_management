const createCrudController = require("./crudControllerFactory");
const employeeService = require("../services/employeeService");

module.exports = createCrudController(employeeService, {
  list: "Employees fetched successfully",
  get: "Employee fetched successfully",
  create: "Employee created successfully",
  update: "Employee updated successfully",
  remove: "Employee deleted successfully"
});
