const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const { loginValidation } = require("../validations/authValidation");

const router = express.Router();

router.post("/login", loginValidation, validateRequest, authController.login);
router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
