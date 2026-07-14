const createCrudController = require("./crudControllerFactory");
const departmentService = require("../services/departmentService");

module.exports = createCrudController(departmentService, {
  list: "Departments fetched successfully",
  get: "Department fetched successfully",
  create: "Department created successfully",
  update: "Department updated successfully",
  remove: "Department deleted successfully"
});
