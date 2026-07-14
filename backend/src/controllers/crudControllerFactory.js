const { successResponse } = require("../helpers/apiResponse");

const createCrudController = (service, messages) => ({
  list: async (req, res, next) => {
    try {
      const result = await service.list(req.query, req.user);
      return successResponse(res, messages.list, result.records, 200, {
        pagination: result.pagination
      });
    } catch (error) {
      return next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const record = await service.getById(req.params.id, req.user);
      return successResponse(res, messages.get, record);
    } catch (error) {
      return next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const record = await service.create(req.body, req.user);
      return successResponse(res, messages.create, record, 201);
    } catch (error) {
      return next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const record = await service.update(req.params.id, req.body, req.user);
      return successResponse(res, messages.update, record);
    } catch (error) {
      return next(error);
    }
  },

  remove: async (req, res, next) => {
    try {
      await service.remove(req.params.id, req.user);
      return successResponse(res, messages.remove);
    } catch (error) {
      return next(error);
    }
  }
});

module.exports = createCrudController;
