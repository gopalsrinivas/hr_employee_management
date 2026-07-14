const express = require("express");
const controller = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeRoles");
const validate = require("../middlewares/validateRequest");
const ROLES = require("../constants/roles");
const { idParam, paginationQuery } = require("../validations/commonValidation");
const { createUser, updateUser } = require("../validations/userValidation");

const router = express.Router();

router.use(auth, authorize(ROLES.ADMIN));
router.get("/", paginationQuery, validate, controller.list);
router.post("/", createUser, validate, controller.create);
router.get("/:id", idParam(), validate, controller.getById);
router.put("/:id", idParam(), updateUser, validate, controller.update);
router.delete("/:id", idParam(), validate, controller.remove);

module.exports = router;
