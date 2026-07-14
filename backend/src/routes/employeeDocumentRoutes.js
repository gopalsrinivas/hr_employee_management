const express = require("express");
const controller = require("../controllers/employeeDocumentController");
const auth = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateRequest");
const { uploadDocument } = require("../middlewares/uploadMiddleware");
const { idParam, paginationQuery } = require("../validations/commonValidation");
const { uploadDocument: uploadValidation } = require("../validations/employeeDocumentValidation");

const router = express.Router();

router.use(auth);
router.post("/", uploadDocument, uploadValidation, validate, controller.upload);
router.get("/", paginationQuery, validate, controller.list);
router.get("/:id", idParam(), validate, controller.getById);
router.delete("/:id", idParam(), validate, controller.remove);

module.exports = router;
