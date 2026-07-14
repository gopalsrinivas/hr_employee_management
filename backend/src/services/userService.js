const { User, Role, Employee } = require("../models");
const createCrudService = require("../utils/crudServiceFactory");
const { hashPassword } = require("../utils/password");
const { ConflictError } = require("../utils/appError");

module.exports = createCrudService({
  model: User,
  modelName: "User",
  searchFields: ["name", "email"],
  filterFields: ["role_id", "is_active"],
  sortFields: ["id", "name", "email", "created_at", "updated_at"],
  include: [
    { model: Role, attributes: ["id", "name"] },
    { model: Employee, as: "employeeProfile", required: false }
  ],
  beforeCreate: async (payload) => {
    const existing = await User.findOne({ where: { email: payload.email } });
    if (existing) {
      throw new ConflictError("User email already exists");
    }

    return {
      ...payload,
      password: await hashPassword(payload.password)
    };
  },
  beforeUpdate: async (record, payload) => {
    if (payload.email && payload.email !== record.email) {
      const existing = await User.findOne({ where: { email: payload.email } });
      if (existing) {
        throw new ConflictError("User email already exists");
      }
    }

    if (payload.password) {
      return {
        ...payload,
        password: await hashPassword(payload.password)
      };
    }

    return payload;
  }
});
