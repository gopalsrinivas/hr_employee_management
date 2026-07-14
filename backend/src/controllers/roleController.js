const createCrudController = require("./crudControllerFactory");
const roleService = require("../services/roleService");

module.exports = createCrudController(roleService, {
  list: "Roles fetched successfully",
  get: "Role fetched successfully",
  create: "Role created successfully",
  update: "Role updated successfully",
  remove: "Role deleted successfully"
});
