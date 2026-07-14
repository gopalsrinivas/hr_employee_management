const { Op } = require("sequelize");

const getPagination = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

const getOrder = (query, allowedSortFields, defaultSort = "created_at") => {
  const sortBy = allowedSortFields.includes(query.sortBy) ? query.sortBy : defaultSort;
  const orderDirection = String(query.order || "DESC").toUpperCase() === "ASC" ? "ASC" : "DESC";

  return [[sortBy, orderDirection]];
};

const buildSearch = (search, fields) => {
  if (!search || !fields.length) {
    return {};
  }

  return {
    [Op.or]: fields.map((field) => ({
      [field]: { [Op.iLike]: `%${search}%` }
    }))
  };
};

const buildExactFilters = (query, allowedFilters) => {
  return allowedFilters.reduce((where, field) => {
    if (query[field] !== undefined && query[field] !== "") {
      where[field] = query[field];
    }
    return where;
  }, {});
};

const buildPaginationMeta = (page, limit, totalRecords) => ({
  page,
  limit,
  totalRecords,
  totalPages: Math.ceil(totalRecords / limit)
});

module.exports = {
  Op,
  getPagination,
  getOrder,
  buildSearch,
  buildExactFilters,
  buildPaginationMeta
};
