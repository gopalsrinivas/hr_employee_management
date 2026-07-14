const express = require("express");
const controller = require("../controllers/roleController");
const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeRoles");
const validate = require("../middlewares/validateRequest");
const ROLES = require("../constants/roles");
const { idParam, paginationQuery } = require("../validations/commonValidation");
const { createRole, updateRole } = require("../validations/roleValidation");

const router = express.Router();

router.use(auth, authorize(ROLES.ADMIN));
router.get("/", paginationQuery, validate, controller.list);
router.post("/", createRole, validate, controller.create);
router.get("/:id", idParam(), validate, controller.getById);
router.put("/:id", idParam(), updateRole, validate, controller.update);
router.delete("/:id", idParam(), validate, controller.remove);

module.exports = router;
