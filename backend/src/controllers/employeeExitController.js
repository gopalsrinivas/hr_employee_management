const createCrudController = require("./crudControllerFactory");
const employeeExitService = require("../services/employeeExitService");
const { successResponse } = require("../helpers/apiResponse");

const controller = createCrudController(employeeExitService, {
  list: "Employee exits fetched successfully",
  get: "Employee exit fetched successfully",
  create: "Employee exit created successfully",
  update: "Employee exit updated successfully",
  remove: "Employee exit deleted successfully"
});

const managerApproval = async (req, res, next) => {
  try {
    const result = await employeeExitService.managerApproval(req.params.id, req.user, req.body);
    return successResponse(res, "Manager approval updated successfully", result);
  } catch (error) {
    return next(error);
  }
};

const hrApproval = async (req, res, next) => {
  try {
    const result = await employeeExitService.hrApproval(req.params.id, req.user, req.body);
    return successResponse(res, "HR approval updated successfully", result);
  } catch (error) {
    return next(error);
  }
};

const complete = async (req, res, next) => {
  try {
    const result = await employeeExitService.complete(req.params.id, req.user, req.body);
    return successResponse(res, "Employee exit completed successfully", result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  ...controller,
  managerApproval,
  hrApproval,
  complete
};
