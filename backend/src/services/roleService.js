const { Role, User } = require("../models");
const createCrudService = require("../utils/crudServiceFactory");
const { ConflictError } = require("../utils/appError");

module.exports = createCrudService({
  model: Role,
  modelName: "Role",
  searchFields: ["name", "description"],
  filterFields: ["name"],
  sortFields: ["id", "name", "created_at", "updated_at"],
  include: [{ model: User, as: "creator", attributes: ["id", "name", "email"], required: false }],
  beforeCreate: async (payload) => {
    const existing = await Role.findOne({ where: { name: payload.name } });
    if (existing) {
      throw new ConflictError("Role name already exists");
    }
    return payload;
  },
  beforeUpdate: async (record, payload) => {
    if (payload.name && payload.name !== record.name) {
      const existing = await Role.findOne({ where: { name: payload.name } });
      if (existing) {
        throw new ConflictError("Role name already exists");
      }
    }
    return payload;
  }
});
