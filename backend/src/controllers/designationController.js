const createCrudController = require("./crudControllerFactory");
const designationService = require("../services/designationService");

module.exports = createCrudController(designationService, {
  list: "Designations fetched successfully",
  get: "Designation fetched successfully",
  create: "Designation created successfully",
  update: "Designation updated successfully",
  remove: "Designation deleted successfully"
});
