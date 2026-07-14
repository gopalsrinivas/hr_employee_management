const { param, query } = require("express-validator");

const idParam = (name = "id") => [
  param(name).isInt({ min: 1 }).withMessage(`${name} must be a positive integer.`)
];

const paginationQuery = [
  query("page").optional().isInt({ min: 1 }).withMessage("page must be a positive integer."),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("limit must be between 1 and 100."),
  query("order").optional().isIn(["ASC", "DESC", "asc", "desc"]).withMessage("order must be ASC or DESC.")
];

module.exports = {
  idParam,
  paginationQuery
};
