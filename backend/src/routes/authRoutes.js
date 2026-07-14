const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const { loginValidation, changePasswordValidation } = require("../validations/authValidation");

const router = express.Router();

router.post("/login", loginValidation, validateRequest, authController.login);
router.post("/logout", authMiddleware, authController.logout);
router.get("/profile", authMiddleware, authController.profile);
router.post(
  "/change-password",
  authMiddleware,
  changePasswordValidation,
  validateRequest,
  authController.changePassword
);

module.exports = router;
