const express = require("express");
const controller = require("../controllers/designationController");
const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeRoles");
const validate = require("../middlewares/validateRequest");
const ROLES = require("../constants/roles");
const { idParam, paginationQuery } = require("../validations/commonValidation");
const { createDesignation, updateDesignation } = require("../validations/designationValidation");

const router = express.Router();

router.use(auth);
router.get("/", authorize(ROLES.ADMIN, ROLES.HR), paginationQuery, validate, controller.list);
router.post("/", authorize(ROLES.ADMIN), createDesignation, validate, controller.create);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.HR), idParam(), validate, controller.getById);
router.put("/:id", authorize(ROLES.ADMIN), idParam(), updateDesignation, validate, controller.update);
router.delete("/:id", authorize(ROLES.ADMIN), idParam(), validate, controller.remove);

module.exports = router;
