const express = require("express");
const { successResponse } = require("../helpers/apiResponse");

const router = express.Router();

router.get("/", (req, res) => {
  return successResponse(res, "API is healthy", {
    uptime: process.uptime()
  });
});

module.exports = router;
