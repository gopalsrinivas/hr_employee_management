const createCrudController = require("./crudControllerFactory");
const userService = require("../services/userService");

module.exports = createCrudController(userService, {
  list: "Users fetched successfully",
  get: "User fetched successfully",
  create: "User created successfully",
  update: "User updated successfully",
  remove: "User deleted successfully"
});
