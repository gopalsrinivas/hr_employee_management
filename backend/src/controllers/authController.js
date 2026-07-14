const authService = require("../services/authService");
const { successResponse } = require("../helpers/apiResponse");

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    return successResponse(res, "Login successful", result);
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user);
    return successResponse(res, "Logout successful");
  } catch (error) {
    return next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const result = await authService.getProfile(req.user.id);
    return successResponse(res, "Profile fetched successfully", result);
  } catch (error) {
    return next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    await authService.changePassword(req.user, req.body);
    return successResponse(res, "Password changed successfully");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
  logout,
  profile,
  changePassword
};
