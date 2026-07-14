const fs = require("fs");
const path = require("path");
const multer = require("multer");
const env = require("../config/env");
const { ValidationError } = require("../utils/appError");

const allowedMimeTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const uploadDirectory = path.resolve(process.cwd(), env.uploadPath, "documents");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safePrefix = req.body.employee_code || req.body.employee_id || "employee";
    cb(null, `${safePrefix}_${Date.now()}${extension}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new ValidationError("Only PDF, JPG, JPEG, and PNG files are allowed"));
  }

  return cb(null, true);
};

const uploadDocument = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.maxFileSize
  }
}).single("file");

module.exports = {
  uploadDocument,
  uploadDirectory
};
