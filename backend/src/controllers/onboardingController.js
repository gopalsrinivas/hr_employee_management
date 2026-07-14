const createCrudController = require("./crudControllerFactory");
const onboardingService = require("../services/onboardingService");
const { successResponse } = require("../helpers/apiResponse");

const controller = createCrudController(onboardingService, {
  list: "Onboarding records fetched successfully",
  get: "Onboarding record fetched successfully",
  create: "Onboarding record created successfully",
  update: "Onboarding record updated successfully",
  remove: "Onboarding record deleted successfully"
});

const complete = async (req, res, next) => {
  try {
    const result = await onboardingService.complete(req.params.id, req.user);
    return successResponse(res, "Onboarding completed successfully", result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  ...controller,
  complete
};
