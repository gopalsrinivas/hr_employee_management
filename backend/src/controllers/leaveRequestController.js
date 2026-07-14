const createCrudController = require("./crudControllerFactory");
const leaveRequestService = require("../services/leaveRequestService");
const { successResponse } = require("../helpers/apiResponse");

const controller = createCrudController(leaveRequestService, {
  list: "Leave requests fetched successfully",
  get: "Leave request fetched successfully",
  create: "Leave request created successfully",
  update: "Leave request updated successfully",
  remove: "Leave request deleted successfully"
});

const approve = async (req, res, next) => {
  try {
    const result = await leaveRequestService.approve(req.params.id, req.user, req.body.remarks);
    return successResponse(res, "Leave request approved successfully", result);
  } catch (error) {
    return next(error);
  }
};

const reject = async (req, res, next) => {
  try {
    const result = await leaveRequestService.reject(req.params.id, req.user, req.body.remarks);
    return successResponse(res, "Leave request rejected successfully", result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  ...controller,
  approve,
  reject
};
