const createCrudController = require("./crudControllerFactory");
const employeeDocumentService = require("../services/employeeDocumentService");
const { successResponse } = require("../helpers/apiResponse");

const controller = createCrudController(employeeDocumentService, {
  list: "Employee documents fetched successfully",
  get: "Employee document fetched successfully",
  create: "Employee document created successfully",
  update: "Employee document updated successfully",
  remove: "Employee document deleted successfully"
});

const upload = async (req, res, next) => {
  try {
    const result = await employeeDocumentService.upload(req.body, req.file, req.user);
    return successResponse(res, "Employee document uploaded successfully", result, 201);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  ...controller,
  upload
};
